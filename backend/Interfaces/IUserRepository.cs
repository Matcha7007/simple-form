using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Authenticate(string userName, string password);
        void Signup(string userName, string password, int userRole);
        Task<bool> UserAlreadyExists(string userName);
    }
}