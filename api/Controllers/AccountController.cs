using System.Security.Cryptography;
using System.Text;
using api.Data;
using api.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

public class AccountController : BaseApiController
{

    private readonly DataContext _context;

    public AccountController(DataContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AppUser>> Register(RegisterDtos user)
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

        return userNew;
    }


    public async Task<ActionResult<AppUser>> Login(LoginDTos loginUserParam)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == loginUserParam.Username);

        if (user == null) return Unauthorized();

        using var hmac = new HMACSHA512(user.passwordSalt);

        var computed = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginUserParam.Username));

        return user;
    }

    private async Task<bool> UserExist(string username)
    {
        return await _context.Users.AnyAsync(u => u.UserName == username.ToLower());
    }

}
