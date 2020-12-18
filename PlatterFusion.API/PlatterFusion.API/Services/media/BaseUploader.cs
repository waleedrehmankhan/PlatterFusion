using Microsoft.AspNetCore.Http;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.PixelFormats;
using System;
using System.Globalization;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static PlatterFusion.API.Services.media.Enums;
using SixLabors.ImageSharp.Processing;

namespace PlatterFusion.API.Services.media
{
    
    public class BaseUploader
    {
        private readonly string[] _sizeSuffixes =
            {"bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"};

        protected byte[] GetFileBytes(IFormFile file)
        {
            using (var inputStream = file.OpenReadStream())
            {
                if (inputStream is MemoryStream memoryStream) return memoryStream.ToArray();
                memoryStream = new MemoryStream();
                inputStream.CopyTo(memoryStream);
                return memoryStream.ToArray();
            }
        }

        protected Image<Rgba32> ResizeImage(Image<Rgba32> image, Quality quality)
        {
            int width;
            switch (quality)
            {
                case Quality.High:
                    width = 1200;
                    break;
                case Quality.Medium:
                    width = 800;
                    break;
                case Quality.Thumbnail:
                    width = 120;
                    break;
                default:
                    width = 300;
                    break;
            }

            var sourceWidth = image.Width;
            var sourceHeight = image.Height;
            var nPercent = (float)width / sourceWidth;
            var destWidth = (int)(sourceWidth * nPercent);
            var destHeight = (int)(sourceHeight * nPercent);
            if (width == 120)
            {
                var resizedImage = image.Clone(x => x.Resize(new ResizeOptions()
                { Mode = ResizeMode.Crop, Size = new Size(120, 120) }));
                return resizedImage;
            }
            else
            {
                var resizedImage = image.Clone(x =>
                    x.Resize(new Size(destWidth, destHeight)));
                return resizedImage;
            }
        }

        protected Image<Rgba32> ByteArrayToImage(byte[] byteArrayIn, string fileType = "image/jpeg")
        {
            Image<Rgba32> img = null;
            var ms = new MemoryStream(byteArrayIn);
            img = (Image<Rgba32>)Image.Load(ms);
            return img;
        }

        protected byte[] ImageToByteArray(Image<Rgba32> image)
        {
            var ms = new MemoryStream();
            image.Save(ms, new JpegEncoder());
            return ms.ToArray();
        }

        protected double GetUnixEpochMethod(DateTime dateTime)
        {
            var unixTime = dateTime.ToUniversalTime() -
                           new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

            return unixTime.TotalSeconds;
        }
        public string SizeSuffix(long value)
        {
            if (value < 0)
            {
                return "-" + SizeSuffix(-value);
            }

            var i = 0;
            decimal dValue = value;
            while (Math.Round(dValue / 1024) >= 1)
            {
                dValue /= 1024;
                i++;
            }

            return $"{dValue:n1} {_sizeSuffixes[i]}";
        }
    }
}
