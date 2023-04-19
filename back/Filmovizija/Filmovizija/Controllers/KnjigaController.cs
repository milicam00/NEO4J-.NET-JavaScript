using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Neo4jClient;
using Filmovizija.Models;

namespace Filmovizija.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KnjigaController : Controller
    {
        private readonly IGraphClient _client;

        public KnjigaController(IGraphClient client)
        {
            _client = client;
        }

        //vraca sve knjige
        [HttpGet]
        [Route("VratiSveKnjige")] 
        public async Task<IActionResult> Get()
        {
            var knjige = await _client.Cypher.Match("(n: Knjiga)")
                                                  .Return(n => n.As<Knjiga>())
                                                  .ResultsAsync;
            foreach(Knjiga k in knjige)
            {
                var komentari = await _client.Cypher.Match("(m:Komentar)-[r:KOMENTAR_PRIPADA_KNJIZI]->(n:Knjiga)")
                                       .Where("n.id=" + k.id)
                                       .Return(m => m.As<Komentar>())
                                       .ResultsAsync;
                k.komentari = new List<Komentar>();
                foreach (Komentar g in komentari)
                {
                    k.komentari.Add(g);

                }

                var ocene = await _client.Cypher.Match("(m:Ocena)-[r:OCENA_PRIPADA_KNJIZI]->(n:Knjiga)")
                                      .Where("n.id=" + k.id)
                                      .Return(m => m.As<Ocena>())
                                      .ResultsAsync;
                k.ocena = new List<Ocena>();
                foreach (Ocena o in ocene)
                {
                    k.ocena.Add(o);

                }
            }

            return Ok(knjige);
        }
        //vraca knjigu na osnovu zadatog autora i naziva
        [HttpGet]
        [Route("PreuzmiKnjiguNaOsnovuAutoraINaziva/{autor}/{naziv}")]
        public async Task<IActionResult> PreuzmiKnjiguNaOsnovuAutoraINaziva(string autor, string naziv)
        {
            var knjige = await _client.Cypher.Match("(n:Knjiga)").Where("n.autor='" + autor + "' AND n.naziv='" + naziv + "'").Return(n => n.As<Knjiga>()).ResultsAsync;
            return Ok(knjige);

        }

        //vraca knjigu po tipu poveza
        [HttpGet]
        [Route("PreuzmiKnjiguPoPovezu/{povez}")]
        public async Task<IActionResult> PreuzmiKnjigePoPovezu(string povez)
        {
            var knjige = await _client.Cypher.Match("(n:Knjiga)").Where("n.povez='" + povez + "'").Return(n => n.As<Knjiga>()).ResultsAsync;
            return Ok(knjige);

        }

        //vraca knjige odredjenog jezika
        [HttpGet]
        [Route("PreuzmiKnjiguPoJeziku/{jezik}")]
        public async Task<IActionResult> PreuzmiKnjigePoJeziku(string jezik)
        {
            var knjige = await _client.Cypher.Match("(n:Knjiga)").Where("n.jezik='" + jezik + "'").Return(n => n.As<Knjiga>()).ResultsAsync;
            return Ok(knjige);

        }

        //vraca knjige istog izdavaca
        [HttpGet]
        [Route("PreuzmiKnjigeIstogIzdavaca/{izdavac}")]
        public async Task<IActionResult> PreuzmiKnjigeIstogIzdavaca(string izdavac)
        {
            var knjige = await _client.Cypher.Match("(n:Knjiga)").Where("n.izdavac='" + izdavac + "'").Return(n => n.As<Knjiga>()).ResultsAsync;
            return Ok(knjige);

        }



        //vraca knjigu po nazivu
        [HttpGet]
        [Route("PreuzmiKnjiguPoNazivu/{nazivKnjige}")]
        public async Task<IActionResult> PreuzmiKnjigePoNazivu(string nazivKnjige)
        {
            var knjige = await _client.Cypher.Match("(n:Knjiga)").Where("n.naziv='" + nazivKnjige + "'").Return(n => n.As<Knjiga>()).ResultsAsync;
            return Ok(knjige);

        }



        //vraca knjige po godini izdavanja
        [HttpGet]
        [Route("PreuzmiKnjigePoGodini/{godina}")]
        public async Task<IActionResult> PreuzmiKnjigePoGodini(int godina)
        {
            var knjige = await _client.Cypher.Match("(n:Knjiga)").Where("n.godina_izdavanja=" + godina + "").Return(n => n.As<Knjiga>()).ResultsAsync;
            return Ok(knjige);

        }


        //vraca knjige istog pisca
        [HttpGet]
        [Route("PreuzmiKnjigeIstogPisca/{pisac}")]
        public async Task<IActionResult> PreuzmiKnjigeIstogPisca(string pisac)
        {
            var knjige = await _client.Cypher.Match("(n:Knjiga)").Where("n.autor='" + pisac + "'").Return(n => n.As<Knjiga>()).ResultsAsync;
            return Ok(knjige);

        }

        //vraca knjige cija je cena u  opsegu dve zadate vrednosti
        [HttpGet]
        [Route("PreuzmiKnjigePoCeni/{cenaOd}/{cenaDo}")]
        public async Task<IActionResult> PreuzmiKnjigePoCeni(double cenaOd, double cenaDo)
        {
            var knjige = await _client.Cypher.Match("(n:Knjiga)").Where("n.cena>=" + cenaOd + " AND n.cena<=" + cenaDo + "").Return(n => n.As<Knjiga>()).ResultsAsync;
            return Ok(knjige);

        }

        //vraca knjige po zanru
        [HttpGet]
        [Route("PreuzmiKnjigePoZanru/{zanr}")]
        public async Task<IActionResult> PreuzmiKnjigePoZanru(string zanr)
        {
            var knjige = await _client.Cypher.Match("(n:Knjiga)").Where("n.zanr='" + zanr + "'").Return(n => n.As<Knjiga>()).ResultsAsync;
            return Ok(knjige);

        }

        //vraca knjige koje imaju vecu ili jednaku prosecnu ocenu od zadate
        [HttpGet]
        [Route("PreuzmiKnjigePoProscnojOceni/{ocena}")]
        public async Task<IActionResult> PreuzmiKnjigePoProscnojOceni(double ocena)
        {
            var knjige = await _client.Cypher.Match("(n:Knjiga)")
                                             .Where("n.prosecna_ocena>=" + ocena )
                                             .Return(n => n.As<Knjiga>())
                                             .ResultsAsync;
            return Ok(knjige);
            //var data = await _client.Cypher.Match("(m:Ocena)-[r:OCENA_PRIPADA_KNJIZI]->(k:Knjiga)")
            //                            .Where("k.id=" + idKnjige)               
            //                            .Return(m => m.As<Ocena>().ocena)
            //                            .ResultsAsync;

            //var prosecnaOcena = data.Average();
            //return Ok(prosecnaOcena);
        }

        //za zadati id knjige menja naziv koji stavimo
        [HttpPut]
        [Route("IzmeniKnjigu/{id}/{naziv}")]
        public async Task<IActionResult> IzmeniFilm(int id, string naziv)
        {
            var knjiga = await _client.Cypher.Match("(n:Knjiga)").Where("n.id=" + id + "").Set("n.naziv='" + naziv + "'").Return(n => n.As<Knjiga>()).ResultsAsync;
            return Ok(knjiga);
        }

        //dodaje knjigu
        [HttpPost]
        [Route("DodajKnjigu")]
        public async Task<IActionResult> Create([FromBody] Knjiga knjiga)
        {
            knjiga.datumDodavanja = DateTime.Now.Date;
            await _client.Cypher.Create("(k:Knjiga $knjiga)")
                                .WithParam("knjiga", knjiga)
                                .ExecuteWithoutResultsAsync();

            return Ok();
        }

        [HttpPost]
        [Route("KorisnikKojiJeUzeoKnjigu/{idKnjige}/{idKorisnika}")]
        public async Task<ActionResult> KorisnikKojiJeUzeoKnjigu(int idKnjige, int idKorisnika)
        {
            var knjige = await _client.Cypher.Match("(n:Knjiga)")
                                        .Where("n.id=" + idKnjige)
                                        .Return(n => n.As<Knjiga>())
                                        .ResultsAsync;

            var knjiga = knjige.First();

            var korisnici = await _client.Cypher.Match("(n:Korisnik)")
                                        .Where("n.id=" + idKorisnika)
                                        .Return(n => n.As<Korisnik>())
                                        .ResultsAsync;

            var korisnik = korisnici.First();


            var rez = await _client.Cypher.Match("(n:Knjiga), (m:Korisnik)")
                                        .Where("m.id=" + korisnik.id + " AND n.id=" + knjiga.id)
                                        .Create("(m)<-[r:JE_KUPIO]-(n)")
                                        .Return((n, m) => new
                                        {
                                            Knjiga = n.As<Knjiga>(),
                                            Korisnik = m.As<Korisnik>()
                                        }).ResultsAsync;
            return Ok(rez);

        }

        //brisanje knjige koji ima zadati naziv
        [HttpDelete]
        [Route("ObrisiKnjigu/{id}")]
        public async Task<IActionResult> ObrisiKnjigu(int id)
        {
            var knjiga = await _client.Cypher.Match("(n:Knjiga)")
                                         .Where("n.id=" + id)
                                          .DetachDelete("n")
                                          .Return(n => n.As<Knjiga>())
                                          .ResultsAsync;
            return Ok("Knjiga je obrisana");

        }

        //na osnovu knjige vidi da li postoji film
        //mozda moze da se napravi veza kao da je film snimljen po nekoj knjizi
        //i onda da se vrsi pretraga po toj vezi
        [HttpGet]
        [Route("NaOsnovuKnjigeNadjiFilm/{nazivKnjige}")]
        public async Task<IActionResult> NaOsnovuKnjigeNadjiFilm(string nazivKnjige)
        {
            var filmovi = await _client.Cypher.Match("(n:Film)")
                                               .Where("n.naziv='" + nazivKnjige + "'")
                                               .Return(n => n.As<Film>())
                                               .ResultsAsync;
            return Ok(filmovi);
        }
        [HttpPut]
        [Route("DodajKomentarKnjizi/{idKomentara}/{nazivKnjige}")]
        public async Task<ActionResult> DodajKomentarKnjizi(string idKomentara, string nazivKnjige)
        {
            await _client.Cypher.Match("(n:Komentar), (m:Knjiga)")
                                       .Where("n.id='" + idKomentara + "' AND m.naziv='" + nazivKnjige + "'")
                                       .Create("(m)-[r:KNJIGA_IMA_KOMENTAR]->(n)")
                                       .ExecuteWithoutResultsAsync();

            return Ok("Komentar je uspesno dodat!");
        }
        [HttpGet]
        [Route("PreuzmiSveKomentareZaDatuKnjigu/{idKnjige}")]
        public async Task<IActionResult> PreuzmiSveKomentareZaDatuKnjigu(int idKnjige)
        {

            var komentari = await _client.Cypher.Match("(m:Knjiga)-[r:KNJIGA_IMA_KOMENTAR]->(n:Komentar)")
                                                   .Where("m.id=" + idKnjige)
                                                   .Return(n => n.As<Komentar>())
                                                   .ResultsAsync;

            return Ok(komentari);
        }

        [HttpPost]
        [Route("DodajOcenu/{email}/{idKnjige}")]
        public async Task<ActionResult> DodajOcenu(string email, int idKnjige, [FromBody] Ocena ocena)
        {
            var korisnici = await _client.Cypher.Match("(n:Korisnik)")
                                        .Where("n.email='" + email + "'")
                                        .Return(n => n.As<Korisnik>())
                                        .ResultsAsync;

            var korisnik = korisnici.First();

            //serija.sezone.Append( sezona);
            //serija.sezone.Add(sezona);
            //ocena.korisnik = korisnik;
            Guid myuuid = Guid.NewGuid();
            string idString = myuuid.ToString();
            ocena.id = idString;

            await _client.Cypher.Create("(o:Ocena $ocena)")
                              .WithParam("ocena", ocena)
                              .ExecuteWithoutResultsAsync();

            var data = await _client.Cypher.Match("(n:Korisnik), (m:Ocena), (k:Knjiga)")
                                        .Where("n.email='" + email + "' AND m.id='" + ocena.id + "' AND k.id=" + idKnjige)
                                        .Create("(n)-[r1:OCENJUJE_KNJIGU]->(m)-[r2:OCENA_PRIPADA_KNJIZI]->(k)")
                                        //.Return((n, m, k) => new
                                        //{
                                        //    Korisnik = n.As<Korisnik>(),
                                        //    Ocena = m.As<Ocena>(),
                                        //    Knjiga = k.As<Knjiga>()
                                        //}).ResultsAsync;
                                        .Return(k => k.As<Knjiga>())
                                        .ResultsAsync;
            var knjiga = data.First();

            //var prosecnaOcena = podaci.Average();
            var podaci = await _client.Cypher.Match("(m:Ocena)-[r:OCENA_PRIPADA_KNJIZI]->(k:Knjiga)")
                                      .Where("k.id=" + idKnjige)
                                      .Return(m => m.As<Ocena>().ocena)
                                      .ResultsAsync;

            knjiga.prosecna_ocena = podaci.Average();

            await _client.Cypher.Match("(k:Knjiga)")
                                     .Where("k.id=" + idKnjige)
                                     .Set("k.prosecna_ocena=" + knjiga.prosecna_ocena)
                                     .ExecuteWithoutResultsAsync();

            return Ok(knjiga);
        }
        [HttpPost]
        [Route("DodajKomentar/{email}/{idKnjige}")]
        public async Task<ActionResult> DodajKomentar(string email, int idKnjige, [FromBody] Komentar komentar)
        {
            var korisnici = await _client.Cypher.Match("(n:Korisnik)")
                                        .Where("n.email='" + email + "'")
                                        .Return(n => n.As<Korisnik>())
                                        .ResultsAsync;

            var korisnik = korisnici.First();


            Guid myuuid = Guid.NewGuid();
            string idString = myuuid.ToString();
            komentar.id = idString;

            await _client.Cypher.Create("(o:Komentar $komentar)")
                              .WithParam("komentar", komentar)
                              .ExecuteWithoutResultsAsync();

            var data = await _client.Cypher.Match("(n:Korisnik), (m:Komentar), (k:Knjiga)")
                                        .Where("n.email='" + email + "' AND m.id='" + komentar.id + "' AND k.id=" + idKnjige)
                                        .Create("(n)-[r1:DAJE_KOMENTAR_NA_KNJIGU]->(m)-[r2:KOMENTAR_PRIPADA_KNJIZI]->(k)")
                                        .Return((n, m, k) => new
                                        {
                                            Korisnik = n.As<Korisnik>(),
                                            Komentar = m.As<Komentar>(),
                                            Knjiga = k.As<Knjiga>()
                                        }).ResultsAsync;

            return Ok(data);
        }

        [HttpGet]
        [Route("PreuzmiKomentareIOcene/{idKnjige}")]
        public async Task<IActionResult> PreuzmiKomentareIOcene(int idKnjige)
        {
            var komentari = await _client.Cypher.Match("(n:Korisnik)-[r1:DAJE_KOMENTAR_NA_KNJIGU]->(m:Komentar)-[r2:KOMENTAR_PRIPADA_KNJIZI]->(f:Knjiga)")
                                                   .Where("f.id=" + idKnjige)
                                                   .Return((n, m) => new
                                                   {
                                                       korisnik = n.As<Korisnik>().email,
                                                       komentar = m.As<Komentar>().sadrzaj
                                                   }

                                                    )
                                                   .ResultsAsync;

            var ocene = await _client.Cypher.Match("(n:Korisnik)-[r1:OCENJUJE_KNJIGU]->(m:Ocena)-[r2:OCENA_PRIPADA_KNJIZI]->(f:Knjiga)")
                                                   .Where("f.id=" + idKnjige)
                                                   .Return((n, m) => new
                                                   {
                                                       korisnik = n.As<Korisnik>().email,
                                                       ocena = m.As<Ocena>().ocena
                                                   })
                                                   .ResultsAsync;
            return Ok(
                new
                {
                    KomentariKnjige = komentari,
                    OceneKnjige = ocene
                }
                );

        }


    }
}
