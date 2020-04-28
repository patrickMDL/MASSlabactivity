using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using PagesUI.Models;
using Newtonsoft.Json;
namespace PagesUI.Repository
{
    public class MwlocationsRepository : IRepository<Mwlocations>
    {

        private string connectionString;
        public MwlocationsRepository(IConfiguration configuration)
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

        public void Add(Mwlocations item)
        {
            using IDbConnection dbConnection = Connection;
            dbConnection.Open();
            dbConnection.Execute("INSERT INTO `mwlocations`(`long`,`lat`,`dt`,`mwaccountid`) VALUES(@Long,@Lat,@Dt,@MwaccountID);", item);

        }

        public IEnumerable<Mwlocations> FindAll()
        {
            using IDbConnection dbConnection = Connection;
            dbConnection.Open();
            return dbConnection.Query<Mwlocations>("SELECT * FROM mwlocations");
        }

        public Mwlocations FindById(int id)
        {
            throw new NotImplementedException();
        }

        public void Remove(int id)
        {
            using IDbConnection dbConnection = Connection;
            dbConnection.Open();
            dbConnection.Execute("DELETE FROM mwlocations WHERE Id=@Id", new { Id = id });
        }

        public void Update(Mwlocations item)
        {
            throw new NotImplementedException();
        }
    }
}
