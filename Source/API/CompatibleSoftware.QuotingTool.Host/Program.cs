using System;
using CompatibleSoftware.QuotingTool.API;
using Microsoft.Owin.Hosting;

namespace CompatibleSoftware.QuotingTool.Host
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            using (WebApp.Start<Bootstrap>("http://localhost:9876"))
            {
                Console.WriteLine(@"Web Server is running.");
                Console.WriteLine(@"Press any key to quit.");
                Console.ReadLine();
            }
        }
    }
}
