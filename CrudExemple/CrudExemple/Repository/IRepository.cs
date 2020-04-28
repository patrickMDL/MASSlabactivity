using CrudExemple.Models;
using System.Collections.Generic;
namespace CrudExemple.Repository
{
    interface IRepository<T> where T : BaseEntity
    {
        void Add(T item);
        void Remove(int id);
        void Update(T item);
        T FindByID(int id);
        IEnumerable<T> FindAll();
    }
}
