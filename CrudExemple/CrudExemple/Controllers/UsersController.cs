using CrudExemple.Models;
using CrudExemple.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace CrudExemple.Controllers
{
    public class UsersController : Controller
    {
        private readonly UserRepository UsersRepository;

        public UsersController(IConfiguration configuration)
        {
            UsersRepository = new UserRepository(configuration);
        }


        public IActionResult Index()
        {
            return View(UsersRepository.FindAll());
        }

        public IActionResult Create()
        {
            return View();
        }

        // POST: Users/Create
        [HttpPost]
        public IActionResult Create(Users cust)
        {
            if (ModelState.IsValid)
            {
                UsersRepository.Add(cust);
                return RedirectToAction("Index");
            }
            return View(cust);

        }

        // GET: /Users/Edit/1
        public IActionResult Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            Users obj = UsersRepository.FindByID(id.Value);
            if (obj == null)
            {
                return NotFound();
            }
            return View(obj);

        }

        // POST: /Users/Edit   
        [HttpPost]
        public IActionResult Edit(Users obj)
        {

            UsersRepository.Update(obj);
            return RedirectToAction("Index");
            return View(obj);
        }

        // GET:/Users/Delete/1
        public IActionResult Delete(int? id)
        {

            if (id == null)
            {
                return NotFound();
            }
            UsersRepository.Remove(id.Value);
            return RedirectToAction("Index");
        }
    }
}
