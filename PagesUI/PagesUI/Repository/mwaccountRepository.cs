using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Dapper;

using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using PagesUI.Models;
namespace PagesUI.Repository
{
    public class MwaccountRepository : IRepository<Mwaccount>
    {
        private string connectionString;
        public MwaccountRepository(IConfiguration configuration)
        {
            connectionString = configuration.GetValue<string>("DBInfo:ConnectionString");
        }
        
        internal IDbConnection Connection
        {
            get
            {
                return new MySqlConnection(connectionString);
            }
        }

        public void Add(Mwaccount item)
        {
            using IDbConnection dbConnection = Connection;
            dbConnection.Open();
            dbConnection.Execute("INSERT INTO mwaccount(name,email,pwd) VALUES(@Name,@Email,@Pwd)", item);

        }

        public IEnumerable<Mwaccount> FindAll()
        {
            using IDbConnection dbConnection = Connection;
            dbConnection.Open();
            return dbConnection.Query<Mwaccount>("SELECT * FROM mwaccount");
        }
        
        public Mwaccount FindByUser(Mwaccount item)
        {
            using IDbConnection dbConnection = Connection;
            dbConnection.Open();
            return dbConnection.Query<Mwaccount>("SELECT * FROM mwaccount WHERE email=@Email and pwd=@Pwd;", new { email = item.Email, pwd=item.Pwd }).FirstOrDefault();
        }

        public Mwaccount FindById(int id)
        {
            using IDbConnection dbConnection = Connection;
            dbConnection.Open();
            return dbConnection.Query<Mwaccount>("SELECT * FROM mwaccount WHERE id = @Id", new { Id = id }).FirstOrDefault();
        }

        public void Remove(int id)
        {
            using IDbConnection dbConnection = Connection;
            dbConnection.Open();
            dbConnection.Execute("DELETE FROM mwaccount WHERE Id=@Id", new { Id = id });
        }

        public void Update(Mwaccount item)
        {
            using IDbConnection dbConnection = Connection;
            dbConnection.Open();
            dbConnection.Query("UPDATE Users SET name = @Name,   email= @Email, pwd= @Pwd  WHERE id = @Id", item);
        }
    }
}
