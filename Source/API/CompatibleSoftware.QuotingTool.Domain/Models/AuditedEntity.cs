using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CompatibleSoftware.QuotingTool.Domain.Models
{
    public abstract class AuditedEntity : BaseEntity
    {
        public string CreatedBy { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
    }
}
