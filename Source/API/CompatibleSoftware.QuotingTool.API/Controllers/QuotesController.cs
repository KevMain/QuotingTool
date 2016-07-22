using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CompatibleSoftware.QuotingTool.API.Controllers
{
    public class QuotesController : ApiController
    {
        //private static readonly List<CustomerEntryModel> Entries = new List<CustomerEntryModel>();
        
        public HttpResponseMessage Get()
        {
        //    Entries.Add(new CustomerEntryModel() {CreatedBy = "aa", Name ="dsads", CreatedDate = DateTimeOffset.Now});
            return Request.CreateResponse(HttpStatusCode.OK); //, new CustomerModel {Entries = Entries.ToArray()});
        }

        //public HttpResponseMessage Post(CustomerEntryModel customerEntryModel)
        //{
        //    Entries.Add(customerEntryModel);
        //    return Request.CreateResponse();
        //}
    }

    //public class CustomerEntryModel
    //{
    //    public string Name { get; set; }

    //    public string CreatedBy { get; set; }

    //    public DateTimeOffset CreatedDate { get; set; }
    //}

    //public class CustomerModel
    //{
    //    public CustomerEntryModel[] Entries { get; set; }
    //}
}
