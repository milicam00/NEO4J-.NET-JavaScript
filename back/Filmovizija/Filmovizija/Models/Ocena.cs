using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Filmovizija.Models
{
    public class Ocena
    {
        public string id { get; set; }
        public int ocena { get; set; }
        public Korisnik korisnik { get; set; }
        //public Serija serija { get; set; }
        //public Film film { get; set; }
        //public Knjiga knjiga { get; set; }
    }
}
