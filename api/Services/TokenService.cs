using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Entities;
using api.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace api.Services;

public class TokenServices : ITokenService
{
    private readonly SymmetricSecurityKey _key;

    public TokenServices(IConfiguration config)
    {
        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
    }

    public string CreateToken(AppUser user)
    {

        var claim = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.NameId, user.UserName)

        };

        var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256Signature);
        var tokenDescripter = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claim),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds
        };

        var tokenHandle = new JwtSecurityTokenHandler();

        var token = tokenHandle.CreateToken(tokenDescripter);

        return tokenHandle.WriteToken(token);
    }
}


