using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Errors;
using backend.Extensions;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IConfiguration config;
        public UserController(IUnitOfWork uow, IConfiguration config)
        {
            this.config = config;
            this.uow = uow;
        }

        [HttpPost("signin")]
        public async Task<IActionResult> Signin(SigninReqDto signinReqDto)
        {
            var user = await uow.UserRepository.Authenticate(signinReqDto.UserName, signinReqDto.Password);
            ApiError apiError = new ApiError();

            if (user == null)
            {
                apiError.ErrorCode = Unauthorized().StatusCode;
                apiError.ErrorMessage = "Invalid username or password";
                apiError.ErrorDetails = "This error appear when provided user id or password doesn't exists";
                return Unauthorized(apiError);
            }

            var signinRes = new SigninResDto();
            signinRes.UserName = user.UserName;
            signinRes.Token = CreateJWT(user);
            signinRes.UserRole = user.UserRole;
            return Ok(signinRes);
        }

        private string CreateJWT(User user)
        {
            var secretKey = config.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var claims = new Claim[] 
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };
            var signinCredential = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = signinCredential
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup(SignupReqDto signupReqDto)
        {
            ApiError apiError = new ApiError();

            if (signupReqDto.UserName.IsEmpty() || signupReqDto.Password.IsEmpty())
            {
                apiError.ErrorCode = BadRequest().StatusCode;
                apiError.ErrorMessage = "Username or password can't be blank";
                return BadRequest(apiError);
            }

            if (await uow.UserRepository.UserAlreadyExists(signupReqDto.UserName))
            {
                apiError.ErrorCode = BadRequest().StatusCode;
                apiError.ErrorMessage = "Username already exist, please try the different username";
                return BadRequest(apiError);
            }

            uow.UserRepository.Signup(signupReqDto.UserName, signupReqDto.Password, signupReqDto.UserRole);
            await uow.SaveAsync();
            return StatusCode(201);
        }
    }
}