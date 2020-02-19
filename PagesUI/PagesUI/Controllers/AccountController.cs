
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace PagesUI.Controllers
{

    public class AccountController : Controller
    {

        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Weather()
        {
            return View();
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(string username, string password)
        {
            if (username != null && password != null)
            {

                return View("/Weather");
            }
            else
            {
                ViewBag.error = "Invalid Account";
                return View("Index");
            }
        }
    }
}