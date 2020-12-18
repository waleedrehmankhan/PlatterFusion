using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlatterFusion.API.Services.media
{
    public class UploadResponse
    {
        public string Identifier { get; set; }
        public string Url { get; set; }
        public string Type { get; set; }
        public string FileSize { get; set; }
        public int Height { get; set; }
        public int Width { get; set; }
    }
}
