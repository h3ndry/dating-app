﻿using System.Security.Claims;
using api.Data;
using api.DTOs;
using api.Entities;
using api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[Authorize]
public class UsersController : BaseApiController
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UsersController(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDtos>>> GetUsers()
    {
        var users = await _userRepository.GetUserAsync();

        var finalUser = _mapper.Map<IEnumerable<MemberDtos>>(users);

        return Ok(finalUser);
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<MemberDtos>> GetUsers(string username)
    {
        var user = await _userRepository.GetUserByUsernameAsync(username);
        return _mapper.Map<MemberDtos>(user);
    }


    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDtos memberUpdateDtos)
    {
        var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var user = await _userRepository.GetUserByUsernameAsync(username);

        if (user == null) return NotFound();
        _mapper.Map(memberUpdateDtos, user);
        if (await _userRepository.SaveAllAsync()) return NoContent();
        return BadRequest("Failed to update user");
    }

}
