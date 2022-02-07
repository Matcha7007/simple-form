using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using backend.Dtos;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class EmployeeController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        public EmployeeController(IUnitOfWork uow, IMapper mapper)
        {
            this.mapper = mapper;
            this.uow = uow;
        }

        [HttpGet("employee")]
        [AllowAnonymous]
        public async Task<IActionResult> GetEmployee()
        {
            var employees = await uow.EmployeeRepository.GetEmployeesAsync();
            var employeesDto = mapper.Map<IEnumerable<EmployeeDto>>(employees);
            return Ok(employeesDto);
        }

        [HttpPost("post")]
        [AllowAnonymous]
        public async Task<IActionResult> AddEmpoyee(EmployeeDto employeeDto)
        {
            var employee = mapper.Map<Employee>(employeeDto);
            employee.LastUpdatedBy = 1;
            employee.LastUpdatedOn = DateTime.Now;
            uow.EmployeeRepository.AddEmployee(employee);

            await uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpPut("update/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> UpdateEmployee(int id, EmployeeDto employeeDto)
        {
            if (id != employeeDto.Id)
                return BadRequest("Update not allowed");

            var employeeFromDB = await uow.EmployeeRepository.FindEmployee(id);
            if (employeeFromDB == null)
                return BadRequest("Update not allowed");
            
            employeeFromDB.LastUpdatedBy = 1;
            employeeFromDB.LastUpdatedOn = DateTime.Now;
            mapper.Map(employeeDto, employeeFromDB);

            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpDelete("delete/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            uow.EmployeeRepository.DeleteEmployee(id);
            await uow.SaveAsync();
            return Ok(id);
        }
    }
}