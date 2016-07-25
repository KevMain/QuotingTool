using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CompatibleSoftware.QuotingTool.API.Controllers
{
    public class CustomerController : ApiController
    {
        private static readonly List<CustomerEntryModel> Customers = new List<CustomerEntryModel>();
        
        public HttpResponseMessage Get()
        {
            return Request.CreateResponse(HttpStatusCode.OK, Customers.ToArray());
        }

        public HttpResponseMessage Post(CustomerEntryModel customerEntryModel)
        {
            Customers.Add(customerEntryModel);
            return Request.CreateResponse();
        }
    }

    public class CustomerEntryModel
    {
        public string Name { get; set; }
    }
}
