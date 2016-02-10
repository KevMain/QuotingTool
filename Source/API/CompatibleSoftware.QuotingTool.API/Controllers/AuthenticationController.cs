using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CompatibleSoftware.QuotingTool.API.Controllers
{
    [RoutePrefix("api/authentication")]
    [EnableCors(origins: "http://localhost:8080", headers: "*", methods: "*")]
    public class AuthenticationController : ApiController
    {
        public HttpResponseMessage Get()
        {
            return Request.CreateResponse(HttpStatusCode.NotImplemented);
        }

        public HttpResponseMessage Post()
        {
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
