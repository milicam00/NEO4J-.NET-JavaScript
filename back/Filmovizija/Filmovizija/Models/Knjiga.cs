using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Filmovizija.Models
{
    public class Knjiga
    {
        public int id { get; set; }
        public string naziv { get; set; }
        public string autor { get; set; }
        public int godina_izdavanja { get; set; }
        public string kratak_opis { get; set; }
        public string izdavac { get; set; }
        public string zanr { get; set; }
        public int broj_strana { get; set; }
        public string povez { get; set; }
        public double prosecna_ocena { get; set; }
        public List<Komentar> komentari { get; set; }
        public double cena { get; set; }
        public string jezik { get; set; }
        public string slika { get; set; }
        public DateTime datumDodavanja { get; set; }
        public List<Korisnik> korisnici { get; set; }
        public List<Ocena> ocena { get; set; }
    }
}
