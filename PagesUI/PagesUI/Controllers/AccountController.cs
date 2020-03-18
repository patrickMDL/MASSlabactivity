
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
            return View();
        }
        [HttpPost]
        public IActionResult Login(string username, string password)
        {
                return RedirectToAction("/Weather");
            
        }
    }
}