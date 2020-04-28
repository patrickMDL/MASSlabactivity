using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Data;
using Npgsql;
using CrudExemple.Models;
using System.ComponentModel.DataAnnotations;
using System.Configuration;

namespace CrudExemple.Models
{
    public class Users : BaseEntity
    {
        [Key]
        public long Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
    }

    
}
