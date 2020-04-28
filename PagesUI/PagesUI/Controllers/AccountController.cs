using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PagesUI.Models;
using PagesUI.Repository;
using Newtonsoft.Json;
using System.Data;
using System.Linq;
using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Text.RegularExpressions;

namespace PagesUI.Controllers
{

    public class AccountController : Controller
    {

        private readonly MwlocationsRepository mwlocationsRepository;
        private readonly MwaccountRepository mwaccountRepository;
        private string connectionString;
        public AccountController(IConfiguration configuration)
        {
            connectionString = configuration.GetValue<string>("DBInfo:ConnectionString");
            mwlocationsRepository = new MwlocationsRepository(configuration);
        }

        internal IDbConnection Connection
        {
            get
            {
                return new MySqlConnection(connectionString);
            }
        }

        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Weather()
        {
            return View();
        }
        public IActionResult Heatmap()
        {
            return View();
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Tracking()
        {
            
            return base.View(mwlocationsRepository.FindAll());
        }
        

        [HttpPost]
        public JsonResult Login(string cust)
        {
            Mwaccount userInfo  = JsonConvert.DeserializeObject<Mwaccount>(cust);
            using IDbConnection dbConnection = Connection;
            dbConnection.Open();
            {
                var obj = dbConnection.Query<Mwaccount>("SELECT * FROM mwaccount WHERE email=@Email and pwd=@Pwd;", new { email = userInfo.Email, pwd = userInfo.Pwd }).FirstOrDefault();
                if (obj != null)
                {
                    HttpContext.Session.SetString("Name", obj.Name.ToString());
                    HttpContext.Session.SetString("ID", obj.Id.ToString());
                    return Json("200");
                }
            }
            return Json("404");
        }
        [HttpPost]
        public JsonResult ValidateEmail(string cust)
        {
            Mwaccount userInfo = JsonConvert.DeserializeObject<Mwaccount>(cust);
            var validation = Regex.IsMatch(userInfo.Email.ToString(), @"([\w-\.+]+)@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)");
            if (validation == true)
                return Json("200");
            else
                return Json("404");
        }

        [HttpGet]
        public JsonResult GetID(string cust)
        {
            var sessionID = HttpContext.Session.GetString("ID");
            if (sessionID != null)
            {
                return Json(sessionID.ToString());
            }
            return Json(cust);

        }

        [HttpGet]
        public JsonResult GetUser(string cust)
        {
            var sessionName = HttpContext.Session.GetString("Name");
            if (sessionName != null)
            {
                return Json(sessionName.ToString());
            }
            return Json(cust);
            
        }

        [HttpPost]
        public JsonResult Create(string cust)
        {
            
            Mwlocations myjson = JsonConvert.DeserializeObject<Mwlocations>(cust);
            mwlocationsRepository.Add(myjson);
            return Json(cust);
        }

        public IActionResult Delete(int? id)
        {

            if (id == null)
            {
                return NotFound();
            }
            mwlocationsRepository.Remove(id.Value);
            return RedirectToAction("Tracking");
        }
    }
}