using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlatterFusion.API.Data;
using PlatterFusion.API.Dtos;
using PlatterFusion.API.Model;
using PlatterFusion.API.Persistence;
using PlatterFusion.API.Services;

namespace PlatterFusion.API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private IUnitOfWork _unitOfWork;


        public AccountController(IUnitOfWork unitOfWork, ITokenService tokenService)
        {
            _unitOfWork = unitOfWork;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await UserExists(registerDto.Username)) { return BadRequest("Username is taken"); }

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                Username = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _unitOfWork.AppUsers.Add(user);
            _unitOfWork.Complete();

            return new UserDto 
            {
                Username = user.Username,
                Token = await _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await Task.Run(() => _unitOfWork.AppUsers.SingleOrDefault(x => x.Username.Equals(loginDto.Username)));
            //var user = await _context.AppUsers
            //    .SingleOrDefaultAsync(x => x.Username.Equals(loginDto.Username));

            if (user == null) return Unauthorized("Invalid Username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password"); 
            }

            return new UserDto
            {
                Username = user.Username,
                Token = await _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string username)
        {
            //return await _context.AppUsers.AnyAsync(x => x.Username.Equals(username.ToLower()));
            return await Task.Run(() => _unitOfWork.AppUsers.Find(x => x.Username.Equals(username)).Any());
        }
    }
}
