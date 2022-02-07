using System.Collections;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable> GetEmployeesAsync();
        void AddEmployee(Employee employee);
        void DeleteEmployee(int EmployeeId);
        Task<Employee> FindEmployee(int id);
    }
}