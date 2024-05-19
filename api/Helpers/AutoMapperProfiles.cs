
using api.DTOs;
using api.Entities;
using AutoMapper;

namespace api.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberDtos>()
            .ForMember(
                dest => dest.PhotoUrl,
                opts => opts.MapFrom(src => "Testing")
                );
        CreateMap<Photo, PhotoDtos>();

    }

}
