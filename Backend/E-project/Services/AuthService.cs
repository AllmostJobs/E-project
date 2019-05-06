using E_project.Models;
using E_project.Models.UIModels;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace E_project.Services
{
    public class AuthService
    {
        IConfiguration configuration;
        E_projectContext db;

        public AuthService(IConfiguration configuration, E_projectContext db)
        {
            this.configuration = configuration;
            this.db = db;
        }

        public string CreateToken(string userId)
        {
            Claim[] claims = new[] {
                new Claim(JwtRegisteredClaimNames.NameId, userId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Key"]));
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken token = new JwtSecurityToken(
                configuration["JWT:Issuer"],
                configuration["JWT:Issuer"],
                claims,
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
