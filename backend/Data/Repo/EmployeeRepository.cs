using System.Collections;
using System.Threading.Tasks;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Repo
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext dc;
        public EmployeeRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public void AddEmployee(Employee employee)
        {
            dc.Employees.Add(employee);
        }

        public void DeleteEmployee(int EmployeeId)
        {
            var employee = dc.Employees.Find(EmployeeId);
            dc.Employees.Remove(employee);
        }

        public async Task<Employee> FindEmployee(int id)
        {
            return await dc.Employees.FindAsync(id);
        }

        public async Task<IEnumerable> GetEmployeesAsync()
        {
            return await dc.Employees.ToListAsync();
        }
    }
}