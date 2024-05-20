
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
                opts => opts.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url)
                );
        CreateMap<Photo, PhotoDtos>();

    }

}
