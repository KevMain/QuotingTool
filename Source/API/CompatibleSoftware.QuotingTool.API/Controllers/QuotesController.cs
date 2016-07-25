using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CompatibleSoftware.QuotingTool.API.Controllers
{
    public class QuotesController : ApiController
    {
        private static readonly List<QuoteEntryModel> Quotes = new List<QuoteEntryModel>();
        
        public HttpResponseMessage Get()
        {
            return Request.CreateResponse(HttpStatusCode.OK, Quotes.ToArray());
        }

        public HttpResponseMessage Post(QuoteEntryModel quoteEntryModel)
        {
            Quotes.Add(quoteEntryModel);
            return Request.CreateResponse();
        }
    }

    public class QuoteEntryModel
    {
        public string Name { get; set; }
    }
}
