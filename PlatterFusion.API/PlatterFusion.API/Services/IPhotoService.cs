using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using PlatterFusion.API.Services.media;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static PlatterFusion.API.Services.media.Enums;

namespace PlatterFusion.API.Services
{
    public interface IPhotoService
    {
        Task<UploadResponse> UploadAsync(IFormFile image, Quality size);
        Task<UploadResponse> SaveToLocalStorage(Image<Rgba32> bitmapImage, string fileName);
    }
}
