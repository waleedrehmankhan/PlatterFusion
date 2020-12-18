using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using PlatterFusion.API.Helpers;
using PlatterFusion.API.Services.media;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.PixelFormats;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static PlatterFusion.API.Services.media.Enums;

namespace PlatterFusion.API.Services
{


    public class PhotoService : BaseUploader, IPhotoService
    {
        private readonly Cloudinary _cloudinary;
        private readonly string _localPath;
        private readonly string _uploadDir;

        public PhotoService(IOptions<CloudinarySettings> config, IHttpContextAccessor httpContextAccessor, IWebHostEnvironment hostingEnvironment)
        {
            _localPath = $"C:/Users/Asfand Ali Khan/source/repos/PlatterFusion/PlatterFusion.API/PlatterFusion.API/wwwroot";
            //_localPath = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}";
            _uploadDir = Path.Combine(hostingEnvironment.WebRootPath, "uploads");
            var acc = new Account
            (
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        public async Task<UploadResponse> UploadAsync(IFormFile image, Quality size)
        {
            var bitmapImage = ResizeImage(ByteArrayToImage(GetFileBytes(image), image.ContentType), size);
            var result = await SaveToLocalStorage(bitmapImage, image.FileName);
            return result;
        }

        public Task<UploadResponse> SaveToLocalStorage(Image<Rgba32> bitmapImage, string fileName)
        {
            if (!Directory.Exists(_uploadDir)) // checking if upload directory exists or not
            {
                Directory.CreateDirectory(_uploadDir);
            }

            var filePath = $"{$"IMG-{GetUnixEpochMethod(DateTime.Now)}-{fileName}".ToUrlSlug()}.jpeg";
            var filePathUpdated = Path.Combine(_uploadDir, filePath);
            bitmapImage.Save(filePathUpdated, new JpegEncoder());

            var bytes = ImageToByteArray(bitmapImage);
            var result = new UploadResponse()
            {
                Identifier = filePath,
                Width = bitmapImage.Width,
                Height = bitmapImage.Height,
                Url = $"{_localPath}/Uploads/{filePath}",
                Type = "image/jpeg",
                FileSize = SizeSuffix(bytes.Length)
            };
            bitmapImage.Dispose();
            return Task.FromResult(result);
        }
    }
}
