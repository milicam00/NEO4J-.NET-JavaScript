using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Filmovizija.Models
{
    public class Komentar
    {
        public string id { get; set; }

        public string sadrzaj { get; set; }

        public Korisnik korisnik { get; set; }
    }
}
