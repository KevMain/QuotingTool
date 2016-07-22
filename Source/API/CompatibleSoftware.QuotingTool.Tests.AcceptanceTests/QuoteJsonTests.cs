using System;
using Xunit;

namespace CompatibleSoftware.QuotingTool.API.Tests
{
    public class QuoteJsonTests : IDisposable
    {
        private readonly HttpApplication _httpApplication;

        public QuoteJsonTests()
        {
            _httpApplication = new HttpApplication(9875);
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
                var response = client.GetAsync("quotes").Result;

                Assert.True(
                    response.IsSuccessStatusCode,
                    "Actual Status Code: " + response.StatusCode);
            }
        }
    }
}
