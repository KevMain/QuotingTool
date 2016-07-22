using System;
using System.Net.Http;
using CompatibleSoftware.QuotingTool.API.Tests.Attributes;
using CompatibleSoftware.QuotingTool.API.Tests.Extensions;
using Xunit;

namespace CompatibleSoftware.QuotingTool.API.Tests
{
    public class CustomerJsonTests : IDisposable
    {
        private readonly HttpApplication _httpApplication;

        public CustomerJsonTests()
        {
            _httpApplication = new HttpApplication(9876);
            _httpApplication.StartApp();
        }

        public void Dispose()
        {
            _httpApplication.Dispose();
        }

        [Fact]
        public void GetResponseReturnsCorrectStatusCode()
        {
            using (var client = _httpApplication.GetClient())
            {
                var response = client.GetAsync("customer").Result;

                Assert.True(
                    response.IsSuccessStatusCode,
                    "Actual Status Code: " + response.StatusCode);
            }
        }

        [Fact]
        public void PostResponseReturnsCorrectStatusCode()
        {
            using (var client = _httpApplication.GetClient())
            {
                var json = new
                {
                    name = "Customer 1",
                    createdBy = "Admin",
                    createdDate = DateTimeOffset.Now
                };

                var response = client.PostAsJsonAsync("customer", json).Result;

                Assert.True(
                    response.IsSuccessStatusCode,
                    "Actual Status Code: " + response.StatusCode);
            }
        }

        [Fact]
        [UseDatabase]
        public void GetAfterPostReturnsResponseWithPostedEntry()
        {
            using (var client = _httpApplication.GetClient())
            {
                var json = new
                {
                    name = "Customer 2",
                    createdBy = "Bob",
                    createdDate = DateTimeOffset.Now
                };

                var expected = json.ToJObject();
                client.PostAsJsonAsync("customer", json).Wait();

                var response = client.GetAsync("customer").Result;

                var actual = response.Content.ReadAsJsonAsync().Result;

                Assert.Contains(expected, actual.entries);
            }
        }
    }
}
