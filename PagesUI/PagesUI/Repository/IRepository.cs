
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PagesUI.Models;
namespace PagesUI.Repository
{
    interface IRepository<T> where T : BaseEntity
    {
        void Add(T item);
        void Remove(int id);
        void Update(T item);
        T FindById(int id);
        IEnumerable<T> FindAll();
    }
}
