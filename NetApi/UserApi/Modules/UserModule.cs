﻿using Carter;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserApi.Domain;
using UserApi.Dtos;
using UserApi.Persistence;

namespace UserApi.Modules
{
    public class UserModule : CarterModule
    {
        public override void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/users", async (ApplicationDbContext _dbContext) =>
            {
                var users = await _dbContext.Users.ToListAsync();

                var usersDto = users.Select(u => new UserResponse
                {
                    Email = u.Email,
                    LastName = u.LastName,
                    Name = u.Name,
                    Id = u.Id
                });

                return Results.Ok(usersDto);
            });

            app.MapGet("/users/{id}", async (long id, ApplicationDbContext _dbContext) =>
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);

                if (user is not null)
                {
                    var userDto = new UserResponse
                    {
                        LastName = user.LastName,
                        Name = user.Name,
                        Email = user.Email,
                        Id = user.Id
                    };

                    return Results.Ok(userDto);
                }
                
                return Results.NotFound();
            });

            app.MapPut("/users/{id}", async (long id, [FromBody] UserRequest userDto, ApplicationDbContext _dbContext) =>
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);

                if (user is not null)
                {
                    user.Email = userDto.Email;
                    user.Name = userDto.Name;
                    user.LastName = userDto.LastName;

                    await _dbContext.SaveChangesAsync();

                    return Results.Ok();
                }

                return Results.NotFound();
            });

            app.MapPost("/users", async ([FromBody] UserRequest userDto, ApplicationDbContext _dbContext) =>
            {
                var user = new User()
                {
                    Email = userDto.Email,
                    Name = userDto.Name,
                    LastName = userDto.LastName,
                };
                
                _dbContext.Set<User>().Add(user);
                await _dbContext.SaveChangesAsync();

                return Results.Ok();
            });

            app.MapDelete("/users/{id}", async (long id, ApplicationDbContext _dbContext) =>
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);

                if (user is not null)
                {
                    _dbContext.Remove(user);
                    await _dbContext.SaveChangesAsync();
                    return Results.Ok();
                }

                return Results.NotFound();
            });
        }
    }
}
