using System.Threading.Tasks;
using backend.Data.Repo;
using backend.Interfaces;

namespace backend.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext dc;
        public UnitOfWork(DataContext dc)
        {
            this.dc = dc;
        }
        public IUserRepository UserRepository =>
            new UserRepository(dc);

        public IEmployeeRepository EmployeeRepository =>
            new EmployeeRepository(dc);

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}