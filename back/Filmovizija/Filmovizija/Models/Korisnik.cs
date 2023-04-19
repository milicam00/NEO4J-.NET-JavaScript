using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Filmovizija.Models
{
    public class Korisnik
    {
        public int id { get; set; }
        public string ime { get; set; }
        public string prezime { get; set; }
        public List<Film> filmovi { get; set; }
        public List<Knjiga> knjige { get; set; }
        public List<Serija> serije { get; set; }
        public List<Komentar> komentari { get; set; }

        public List<Ocena> ocena { get; set; }
        public string JMBG { get; set; }
        public string email { get; set; }
        public string sifra { get; set; }
    }
}
