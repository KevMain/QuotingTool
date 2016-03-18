using System;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;
using Xunit;
using Newtonsoft.Json;
using Xunit.Sdk;

namespace CompatibleSoftware.QuotingTool.API.Tests
{
    public class CustomerJsonTests : IDisposable
    {
        private readonly HttpApplication _httpApplication;

        public CustomerJsonTests()
        {
            _httpApplication = new HttpApplication();
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
                var response = client.GetAsync("").Result;

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

                var response = client.PostAsJsonAsync("", json).Result;

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
                client.PostAsJsonAsync("", json).Wait();

                var response = client.GetAsync("").Result;

                var actual = response.Content.ReadAsJsonAsync().Result;

                Assert.Contains(expected, actual.Entries);
            }
        }
    }

    public class UseDatabaseAttribute : BeforeAfterTestAttribute
    {
        public override void Before(MethodInfo methodUnderTest)
        {
            base.Before(methodUnderTest);
        }

        public override void After(MethodInfo methodUnderTest)
        {
            base.After(methodUnderTest);
        }
    }

    public static class Extensions
    {
        public static dynamic ToJObject(this object obj)
        {
            dynamic serialized = JsonConvert.SerializeObject(obj);
            return JsonConvert.DeserializeObject(serialized);
        }

        public static Task<dynamic> ReadAsJsonAsync(this HttpContent content)
        {
            if (content == null)
                throw new ArgumentNullException("content");

            return content.ReadAsStringAsync().ContinueWith(t =>
                JsonConvert.DeserializeObject(t.Result));
        }
    }
}
