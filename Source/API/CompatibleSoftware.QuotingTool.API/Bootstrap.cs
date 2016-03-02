using System.Web.Http;
using Newtonsoft.Json.Serialization;
using Owin;

namespace CompatibleSoftware.QuotingTool.API
{
    public class Bootstrap
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            HttpConfiguration config = new HttpConfiguration();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "{controller}/{id}",
                defaults: new
                {
                    controller = "Customer",
                    id = RouteParameter.Optional
                });

            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            appBuilder.UseWebApi(config);
        }
    }
}