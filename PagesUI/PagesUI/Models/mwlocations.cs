using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PagesUI.Models
{
    public class Mwlocations : BaseEntity
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Long { get; set; }
        [Required]
        public string Lat { get; set; }
        [Required]
        public string Dt { get; set; }
        [Key]
        public int MwaccountID { get; set; }
        [Required]
        public DateTime Day_time {get; set;}
    }
}
