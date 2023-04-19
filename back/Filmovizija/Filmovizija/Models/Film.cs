using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Filmovizija.Models
{
    public class Film
    {
        public int id { get; set; }

        public string naziv { get; set; }

        public string reziser { get; set; }

        public string zanr { get; set; }

        public List<string> glumci { get; set; }
        public int godinaIzdanja { get; set; }

        public double prosecnaOcena { get; set; }

        public string kratakOpis { get; set; }

        public List<Komentar> komentari { get; set; }

        public double cena { get; set; }
        public string slika { get; set; }
        public string triler { get; set; }

        public DateTime datumDodavanja { get; set; }
        public List<Korisnik> korisnici { get; set; }
        public List<Ocena> ocena { get; set; }
    }
}
