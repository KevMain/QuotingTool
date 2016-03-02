using System;
using System.Net.Http;
using Microsoft.Owin.Hosting;

namespace CompatibleSoftware.QuotingTool.API.Tests
{
    public class HttpApplication : IDisposable
    {
        private readonly IDisposable _webApp;
        private const string BaseAddress = "http://localhost:9876";

        public HttpApplication()
        {
            _webApp = WebApp.Start<Bootstrap>(BaseAddress);
        }

        public HttpClient GetClient()
        {
            return new HttpClient {BaseAddress = new Uri(BaseAddress)};
        }

        public void Dispose()
        {
            _webApp.Dispose();
        }
    }
}
