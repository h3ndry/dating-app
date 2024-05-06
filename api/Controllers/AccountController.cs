using System.Security.Cryptography;
using System.Text;
using api.Data;
using api.DTOs;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

public class AccountController : BaseApiController
{

    private readonly DataContext _context;
    private readonly ITokenService _tokenService;

    public AccountController(DataContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDTOs>> Register(RegisterDtos user)
    {

        if (await UserExist(user.Username)) return BadRequest("Username is taken");
        using var hmac = new HMACSHA512();

        var userNew = new AppUser
        {
            UserName = user.Username.ToLower(),
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.Username)),
            passwordSalt = hmac.Key
        };

        _context.Users.Add(userNew);

        await _context.SaveChangesAsync();

        return new UserDTOs
        {
            Username = user.Username,
            Token = _tokenService.CreateToken(userNew)
        };
    }


    [HttpPost("login")]
    public async Task<ActionResult<UserDTOs>> Login(LoginDTos loginUserParam)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == loginUserParam.Username);

        if (user == null) return Unauthorized("user does not exist");

        using var hmac = new HMACSHA512(user.passwordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginUserParam.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.passwordHash[i]) return Unauthorized("Wrong password");
        }

        return new UserDTOs
        {
            Username = user.UserName,
            Token = _tokenService.CreateToken(user)
        };

    }


    private async Task<bool> UserExist(string username)
    {
        return await _context.Users.AnyAsync(u => u.UserName == username.ToLower());
    }

}
