using System;
using System.Web.Http;
using Newtonsoft.Json.Serialization;
using Owin;
using System.Configuration;
using System.Data.SqlClient;
using System.Net.Http.Headers;
using CompatibleSoftware.QuotingTool.API.Properties;

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
                    controller = "Home",
                    id = RouteParameter.Optional
                });

            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));

            config.EnableCors();

            appBuilder.UseWebApi(config);
        }

        public void InstallDatabase()
        {
            var connStr = ConfigurationManager.ConnectionStrings["quotingTool"].ConnectionString;
            var builder = new SqlConnectionStringBuilder(connStr) {InitialCatalog = "Master"};

            using (var conn = new SqlConnection(builder.ConnectionString))
            {
                conn.Open();

                using (var cmd = new SqlCommand())
                {
                    cmd.Connection = conn;

                    var schemaSql = Resources.QuotingToolDbScheme;
                    foreach (var sql in schemaSql.Split(new[] {"GO"}, StringSplitOptions.RemoveEmptyEntries))
                    {
                        cmd.CommandText = sql;
                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }

        public void UninstallDatabase()
        {
            var connStr = ConfigurationManager.ConnectionStrings["quotingTool"].ConnectionString;
            var builder = new SqlConnectionStringBuilder(connStr) { InitialCatalog = "Master" };

            using (var conn = new SqlConnection(builder.ConnectionString))
            {
                conn.Open();

                var dropCmd = @"
                    IF EXISTS (SELECT name
                               FROM master.dbo.sysdatabases
                               WHERE name = N'QuotingTool')
                    DROP DATABASE [QuotingTool];";

                using (var cmd = new SqlCommand(dropCmd, conn))
                    cmd.ExecuteNonQuery();
            }
        }
    }
}