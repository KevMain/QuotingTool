using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CompatibleSoftware.QuotingTool.API.Controllers
{
    public class CustomerController : ApiController
    {
        private readonly static List<CustomerEntryModel> entries = new List<CustomerEntryModel>();
        
         
        public HttpResponseMessage Get()
        {
            entries.Add(new CustomerEntryModel() {CreatedBy = "aa", Name ="dsads", CreatedDate = DateTimeOffset.Now});
            return Request.CreateResponse(HttpStatusCode.OK, new CustomerModel {Entries = entries.ToArray()});
        }

        public HttpResponseMessage Post(CustomerEntryModel customerEntryModel)
        {
            entries.Add(customerEntryModel);
            return Request.CreateResponse();
        }
    }

    public class CustomerEntryModel
    {
        public string Name { get; set; }

        public string CreatedBy { get; set; }

        public DateTimeOffset CreatedDate { get; set; }
    }

    public class CustomerModel
    {
        public CustomerEntryModel[] Entries { get; set; }
    }
}
