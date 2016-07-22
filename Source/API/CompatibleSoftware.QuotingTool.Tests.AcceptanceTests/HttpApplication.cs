using System;
using System.Net.Http;
using Microsoft.Owin.Hosting;

namespace CompatibleSoftware.QuotingTool.API.Tests
{
    public class HttpApplication : IDisposable
    {
        private readonly int _port;
        private IDisposable _webApp;
        private const string BaseAddress = "http://localhost:";

        public HttpApplication(int port)
        {
            _port = port;
        }

        public void StartApp()
        {
            _webApp = WebApp.Start<Bootstrap>(BaseAddress + _port);
        }

        public HttpClient GetClient()
        {
            return new HttpClient {BaseAddress = new Uri(BaseAddress + _port) };
        }

        public void Dispose()
        {
            _webApp.Dispose();
        }
    }
}
