using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace CompatibleSoftware.QuotingTool.API.Tests.Extensions
{
    public static class JsonExtensions
    {
        public static dynamic ToJObject(this object obj)
        {
            dynamic serialized = JsonConvert.SerializeObject(obj);
            return JsonConvert.DeserializeObject(serialized);
        }
        
        public static Task<dynamic> ReadAsJsonAsync(this HttpContent content)
        {
            if (content == null)
                throw new ArgumentNullException("content");

            return content.ReadAsStringAsync().ContinueWith(t =>
                JsonConvert.DeserializeObject(t.Result));
        }
    }
}