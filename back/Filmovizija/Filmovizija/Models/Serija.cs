using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Filmovizija.Models
{
    public class Serija
    {
        
        public int id { get; set; }
        public string naziv { get; set; }
        public string reziser { get; set; }
        public List<string> glumci { get; set; }
        public string kratakOpis { get; set; }
        public List<Komentar> komentari { get; set; }
        public double cena { get; set; }
        public string slika { get; set; }
        public string triler { get; set; }
        public DateTime datumDodavanja { get; set; }
        public List<Sezona> sezone { get; set; }
        public List<Korisnik> korisnici { get; set; }

        public double prosecnaOcena { get; set; }
        public List<Ocena> ocena { get; set; }
    }
}
