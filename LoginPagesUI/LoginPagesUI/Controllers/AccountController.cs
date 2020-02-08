using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Xml;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestSharp;

namespace LoginPagesUI.Controllers
{
    [Route("account")]
    public class AccountController : Controller
    {
        private IHttpContextAccessor _accessor;
        private Method Method;

        public AccountController(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }

        public IEnumerable<string> Get()
        {
            var ip = _accessor.HttpContext?.Connection?.RemoteIpAddress?.ToString();
            return new string[] { ip, "value2" };
        }
        [Route("")]
        [Route("index")]
        [Route("~/")]
        public IActionResult Index()
        {
            return View();
        }

        [Route("login")]
        [HttpPost]
        public IActionResult Login(string username, string password)
        {
            if(username != null && password != null)
            {
                HttpContext.Session.SetString("username", username);
                return View("Success");
            }
            else if (username=="admin" && password == "admin")
            {
                HttpContext.Session.SetString("username", username);
                return View("Success");
            }
            else
            {
                ViewBag.error = "Invalid Account";
                return View("Index");
            }
        }

        public string FetchCurrentIpLocation()
        {
            string strIpLocation = string.Empty;
            var cliente = new RestClient("http://ipapi.co/json/");
            var request = new RestRequest();
            {
                Method = Method.GET;
            };
            var response = cliente.Execute(request);
            strIpLocation = response.Content;
            HttpContext.Session.SetString("ip", strIpLocation);
            return strIpLocation;
        }

        [Route("logout")]
        [HttpGet]
        public IActionResult Logout()
        {
            HttpContext.Session.Remove("username");
            return RedirectToAction("Index");
        }
    }
}