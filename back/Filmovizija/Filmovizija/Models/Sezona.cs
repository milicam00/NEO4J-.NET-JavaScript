using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Filmovizija.Models
{
    public class Sezona
    {
        public int id { get; set;  }
        public string naziv { get; set; }
        public List<string> epizode { get; set; }
        public double prosecnaOcena { get; set; }
        public int godinaIzdavanja { get; set; }
        public Serija serija { get; set; }
    }
}
