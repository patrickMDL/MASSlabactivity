
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestSharp;

namespace PagesUI.Controllers
{
    [Route("account")]
    public class AccountController : Controller
    {

        private Method Method;

        [Route("")]
        [Route("index")]
        [Route("~/")]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Index()
        {
            return View();
        }

        [Route("login")]
        [HttpPost]
        public IActionResult Login(string username, string password)
        {
            if (username != null && password != null)
            {

                return View("Weather");
            }
            else
            {
                ViewBag.error = "Invalid Account";
                return View("Index");
            }
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