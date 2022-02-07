using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IUnitOfWork
    {
         IUserRepository UserRepository { get; }
         IEmployeeRepository EmployeeRepository { get; }
         Task<bool> SaveAsync();
    }
}