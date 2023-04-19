using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Neo4jClient;
using Filmovizija.Models;
using Neo4jClient.Cypher;

namespace Filmovizija.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FilmController : Controller
    {
        private readonly IGraphClient _client;

        public FilmController(IGraphClient client)
        {
            _client = client;
        }


        

        //vraca sve filmove
        [HttpGet]
        [Route("PreuzmiFilmove")]
        public async Task<IActionResult> Get()
        {
            var filmovi = await _client.Cypher.Match("(n: Film)")
                                                  .Return(n => n.As<Film>())
                                                  .ResultsAsync;

            foreach (Film f in filmovi)
            {
                var komentari = await _client.Cypher.Match("(m:Komentar)-[r:KOMENTAR_PRIPADA_FILMU]->(n:Film)")
                                       .Where("n.id=" + f.id)
                                       .Return(m => m.As<Komentar>())
                                       .ResultsAsync;
                f.komentari = new List<Komentar>();
                foreach (Komentar k in komentari)
                {
                    f.komentari.Add(k);

                }



                var ocene = await _client.Cypher.Match("(m:Ocena)-[r:OCENA_PRIPADA_FILMU]->(n:Film)")
                                      .Where("n.id=" + f.id)
                                      .Return(m => m.As<Ocena>())
                                      .ResultsAsync;
                f.ocena = new List<Ocena>();
                foreach (Ocena k in ocene)
                {
                    f.ocena.Add(k);

                }

            }


            return Ok(filmovi);
        }

        /*[HttpGet]
        [Route("PreuzmiFilmovee")]
        public async Task<IActionResult> Gett()
        {
            var filmovi = await _client.Cypher.Match("(m:Film)<-[r:PRIPADA_SERIJI]-(n:Komentar)")
                                    .Return(m => m.As<Serija>())
                                    .ResultsAsync;

            return Ok();
        }*/


        //vraca filmove po nazivu
        [HttpGet]
        [Route("PreuzmiFilmPoNazivu/{nazivFilma}")]
        public async Task<IActionResult> PreuzmiFilmovePoNazivu(string nazivFilma)
        {
            var filmovi = await _client.Cypher.Match("(n:Film)").Where("n.naziv='" + nazivFilma + "'").Return(n => n.As<Film>()).ResultsAsync;
            return Ok(filmovi);

        }

        //vraca filmove po godini izdavanja
        [HttpGet]
        [Route("PreuzmiFilmPoGodini/{godina}")]
        public async Task<IActionResult> PreuzmiFilmPoGodini(int godina)
        {
            var filmovi = await _client.Cypher.Match("(n:Film)").Where("n.godinaIzdanja=" + godina + "").Return(n => n.As<Film>()).ResultsAsync;
            return Ok(filmovi);

        }

        //vraca filmove istog  rezisera
        [HttpGet]
        [Route("PreuzmiFilmoveIstogRezisera/{reziser}")]
        public async Task<IActionResult> PreuzmiFilmoveIstogRezisera(string reziser)
        {
            var filmovi = await _client.Cypher.Match("(n:Film)").Where("n.reziser='" + reziser + "'").Return(n => n.As<Film>()).ResultsAsync;
            return Ok(filmovi);

        }

        //vraca filmove cija je cena u  opsegu dve zadate vrednosti
        [HttpGet]
        [Route("PreuzmiFilmovePoCeni/{cenaOd}/{cenaDo}")]
        public async Task<IActionResult> PreuzmiFilmovePoCeni(double cenaOd, double cenaDo)
        {
            var filmovi = await _client.Cypher.Match("(n:Film)")
                                              .Where("n.cena>=" + cenaOd + " AND n.cena<=" + cenaDo + "")
                                              .Return(n => n.As<Film>())
                                              .ResultsAsync;
            return Ok(filmovi);

        }

        //vraca filmove po zanru
        [HttpGet]
        [Route("PreuzmiFilmovePoZanru/{zanr}")]
        public async Task<IActionResult> PreuzmiFilmovePoZanru(string zanr)
        {
            var filmovi = await _client.Cypher.Match("(n:Film)").Where("n.zanr='" + zanr + "'").Return(n => n.As<Film>()).ResultsAsync;
            return Ok(filmovi);

        }

        //vraca filmove koji imaju vecu ili jednaku prosecnu ocenu od zadate
        [HttpGet]
        [Route("PreuzmiFilmovePoProscnojOceni/{prosecnaOcena}")]
        public async Task<IActionResult> PreuzmiFilmovePoProscnojOceni(double prosecnaOcena)
        {
            var filmovi = await _client.Cypher.Match("(n:Film)")
                                              .Where("n.prosecnaOcena>=" + prosecnaOcena )
                                              .Return(n => n.As<Film>())
                                              .ResultsAsync;
            return Ok(filmovi);
            //var data = await _client.Cypher.Match("(m:Ocena)-[r:OCENA_PRIPADA_FILMU]->(f:Film)")
            //                           //.Where("f.id=" + idFilma)
            //                           .Return(m => m.As<Ocena>())
            //                           .ResultsAsync;

            ////var prosecnaOcena = data.Average();
            //return Ok(data);

        }
        [HttpGet]
        [Route("PreuzmiProsecnuOcenuFilma/{idFilma}")]
        public async Task<IActionResult> PreuzmiProsecnuOcenuFilma(int idFilma)
        {
           
            var data = await _client.Cypher.Match("(m:Ocena)-[r:OCENA_PRIPADA_FILMU]->(f:Film)")
                                       .Where("f.id=" + idFilma)
                                       .Return(m => m.As<Ocena>().ocena)
                                       .ResultsAsync;

            var prosecnaOcena = data.Average();
            return Ok(prosecnaOcena);

        }
        //za dodavanje filma
        [HttpPost]
        [Route("DodajFilm")]
        public async Task<IActionResult> Create([FromBody] Film film)
        {
            film.datumDodavanja = DateTime.Now.Date;
            await _client.Cypher.Create("(f:Film $film)")
                                .WithParam("film", film)
                                .ExecuteWithoutResultsAsync();

            return Ok();
        }
        [HttpPost]
        [Route("KorisnikKojiJeUzeoFilm/{idFilma}/{idKorisnika}")]
        public async Task<ActionResult> KorisnikKojiJeUzeoKnjigu(int idFilma, int idKorisnika)
        {
            //var filmovi = await _client.Cypher.Match("(n:Film)")
            //                            .Where("n.id=" + idFilma)
            //                            .Return(n => n.As<Film>())
            //                            .ResultsAsync;

            //var film = filmovi.First();

            //var korisnici = await _client.Cypher.Match("(n:Korisnik)")
            //                            .Where("n.id=" + idKorisnika)
            //                            .Return(n => n.As<Korisnik>())
            //                            .ResultsAsync;

            //var korisnik = korisnici.First();


            var rez = await _client.Cypher.Match("(n:Film), (m:Korisnik)")
                                        .Where("m.id=" + idKorisnika + " AND n.id=" + idFilma)
                                        .Create("(m)<-[r:JE_KUPIO_FILM]-(n)")
                                        .Return((n, m) => new
                                        {
                                            Film = n.As<Film>(),
                                            Korisnik = m.As<Korisnik>()
                                        }).ResultsAsync;
            return Ok(rez);

        }
        [HttpPut]
        [Route("OceniFilm/{idFilma}/{idKorisnika}/{ocena}")]
        public async Task<ActionResult> OceniFilm(int idFilma, int idKorisnika, int ocena)
        {
            //var filmovi = await _client.Cypher.Match("(n:Film)")
            //                            .Where("n.id=" + idFilma)
            //                            .Return(n => n.As<Film>())
            //                            .ResultsAsync;

            //var film = filmovi.First();

            //var korisnici = await _client.Cypher.Match("(n:Korisnik)")
            //                            .Where("n.id=" + idKorisnika)
            //                            .Return(n => n.As<Korisnik>())
            //                            .ResultsAsync;

            //var korisnik = korisnici.First();


            var rez = await _client.Cypher.Match("(n:Film), (m:Korisnik)")
                                        .Where("m.id=" + idKorisnika + " AND n.id=" + idFilma)
                                        .Create("(m)<-[r:JE_OCENIO_FILM {oceni: "+ocena+"}]-(n)")
                                        .Return((n, m, r) => new
                                        {
                                            Film = n.As<Film>(),
                                            Korisnik = m.As<Korisnik>(),
                                            R = r.As<int>().ToString()
                                            //R = r.As<String>()
                                        }).ResultsAsync;

            var ocene = await _client.Cypher.Match("(m:Korisnik)<-[r:JE_OCENIO_FILM]-(n:Film)")
                                       //.Where("m.id=" + idKorisnika + " AND n.id=" + idFilma)
                                       //.Create("(m)<-[r:JE_OCENIO_FILM {oceni: " + ocena + "}]-(n)")
                                      
                                       .Return((r)=>new
                                       {
                                           //R = r.As<int>()
                                       })
                                      // .With("*, r.oceni")
                                      
                                       //.Return(r=>r)
                                       
                                       .ResultsAsync;
            var niz = new List<double>();
            //niz.Average
            
            return Ok(rez);

        }
        //za zadati id filma menja naziv koji stavimo
        [HttpPut]
        [Route("IzmeniFilm/{id}/{nazivFilma}")]
        public async Task<IActionResult> IzmeniFilm(int id, string nazivFilma)
        {
            var film = await _client.Cypher.Match("(n:Film)").Where("n.id=" + id + "").Set("n.naziv='" + nazivFilma + "'").Return(n => n.As<Film>()).ResultsAsync;
            return Ok(film.First());
        }
        [HttpPut]
        [Route("DodajKomentarFilmu/{idKomentara}/{nazivFilma}")]
        public async Task<ActionResult> DodajKomentarFilmu(int idKomentara, string nazivFilma)
        {
             await _client.Cypher.Match("(n:Komentar), (m:Film)")
                                        .Where("n.id=" + idKomentara + " AND m.naziv='"+nazivFilma+"'")
                                        .Create("(m)-[r:FILM_IMA_KOMENTAR]->(n)")
                                        //.Return(n => n.As<Serija>())
                                        .ExecuteWithoutResultsAsync();

            return Ok("Komentar je uspesno dodat!");
        }
       
        [HttpGet]
        [Route("PreuzmiSveKomentareZaDatiFilm/{idFilma}")]
        public async Task<IActionResult> PreuzmiSveKomentareZaDatiFilm(int idFilma)
        {

            var komentari = await _client.Cypher.Match("(m:Film)-[r:FILM_IMA_KOMENTAR]->(n:Komentar)")
                                                   .Where("m.id=" + idFilma)
                                                   .Return(n => n.As<Komentar>())
                                                   .ResultsAsync;
            
            return Ok(komentari);
        }
        //brisanje filma koji ima zadati naziv
        [HttpDelete]
        [Route("ObrisiFilm/{id}")]
        public async Task<IActionResult> ObrisiFilm(int id)
        {
            var film = await _client.Cypher.Match("(n:Film)")
                                         .Where("n.id=" + id)
                                          .DetachDelete("n")
                                          .Return(n => n.As<Film>())
                                          .ResultsAsync;
            return Ok("Film je obrisan");

        }

        //trazimo sve filmove i serije za datog rezisera
        [HttpGet]
        [Route("PreuzmiSveFilmoveISerijeZaDatogRezisera/{reziser}")]
        public async Task<IActionResult> PreuzmiSveFilmoveISerijeZaDatogRezisera(string reziser)
        {


            //var filmovi_serije = await _client.Cypher.Match("(n:Film),(m:Serija)")
            //                                       .Where("n.reziser='" + reziser + "' AND m.reziser='" + reziser + "'")
            //                                       .Return((n, m) => new
            //                                       {
            //                                           Film = n.As<Film>(),
            //                                           Serija = m.As<Serija>()

            //                                       }).ResultsAsync;
            var filmovi = await _client.Cypher.Match("(n:Film)")
                                                   .Where("n.reziser='" + reziser + "'")
                                                   .Return(n => n.As<Film>())
                                                   .ResultsAsync;
            var serije = await _client.Cypher.Match("(m:Serija)")
                                                  .Where("m.reziser='" + reziser + "'")
                                                  .Return(m => m.As<Serija>())
                                                  .ResultsAsync;
            return Ok(new
            {
                Filmovi = filmovi,
                Serije = serije
            });
        }
        //trazimo serije i filmove gde je isti glumac
        [HttpGet]
        [Route("PreuzmiFilmoveISerijeGdeJeZadatiGlumac/{glumac}")]
        public async Task<IActionResult> PreuzmiFilmoveISerijeGdeJeZadatiGlumac(string glumac)
        {


            //var filmovi_serije = await _client.Cypher.Match("(n:Film),(m:Serija)")
            //                                       .Where("'" + glumac + "' IN n.glumci  AND '" + glumac + "' IN m.glumci")
            //                                       .Return((n, m) => new
            //                                       {
            //                                           Film = n.As<Film>(),
            //                                           Serija = m.As<Serija>()

            //                                       }).ResultsAsync;
            //return Ok(filmovi_serije);


            var filmovi = await _client.Cypher.Match("(n:Film)")
                                                   .Where("'" + glumac + "' IN n.glumci")
                                                   .Return(n => n.As<Film>())
                                                   .ResultsAsync;
            var serije = await _client.Cypher.Match("(m:Serija)")
                                                  .Where("'" + glumac + "' IN m.glumci")
                                                  .Return(m => m.As<Serija>())
                                                  .ResultsAsync;
            return Ok(new
            {
                Filmovi = filmovi,
                Serije = serije
            });
        }
        //vraca najnovije filmove
        //[HttpGet]
        //[Route("PreuzmiNajnovije")]
        //public async Task<IActionResult> PreuzmiNajnovijeFilmove()
        //{

        //    var filmovi = await _client.Cypher.Match("(n: Film)")
        //                                          .Return(n => n.As<Film>())
        //                                          .ResultsAsync;
        //    //var serije = await _client.Cypher.Match("(m: Serija)")
        //    //                                     .Return(m => m.As<Serija>())
        //    //                                     .ResultsAsync;
        //    var serije = await _client.Cypher.Match("(m:Serija)<-[r:PRIPADA_SERIJI]-(n:Sezona)")
        //                           .Return(m => m.As<Serija>())
        //                           .ResultsAsync;
        //    var knjige = await _client.Cypher.Match("(k: Knjiga)")
        //                                        .Return(k => k.As<Knjiga>())
        //                                        .ResultsAsync;

        //    var lastElementsFilm = filmovi.Reverse();
        //    var lastElementsSerija = serije.Reverse();
        //    var lastElementsKnjiga = knjige.Reverse();

        //    var lastFilm = lastElementsFilm.Take(2);
        //    var lastSerija = lastElementsSerija.Take(2);
        //    var lastKnjiga = lastElementsKnjiga.Take(2);


        //    return Ok(new
        //    {
        //        Filmovi = lastFilm,
        //        Serije = lastSerija,
        //        Knjiga = lastKnjiga
        //    });

        //}
        [HttpGet]
        [Route("PreuzmiNajnovije")]
        public async Task<IActionResult> PreuzmiNajnovije()
        {

            var filmovi = await _client.Cypher.Match("(n: Film)")
                                                  .Return(n => n.As<Film>())
                                                  .OrderBy("n.datumDodavanja DESC") 
                                                  .Limit(2)
                                                  .ResultsAsync;
            var serije = await _client.Cypher.Match("(m: Serija)")
                                                 .Return(m => m.As<Serija>())
                                                 .OrderBy("m.datumDodavanja DESC")
                                                 .Limit(2)
                                                 .ResultsAsync;

            foreach(Serija s in serije)
            {
                var sezone = await _client.Cypher.Match("(m:Serija)<-[r:PRIPADA_SERIJI]-(n:Sezona)")
                                       .Where("m.id="+s.id)
                                       .Return(n => n.As<Sezona>())
                                       .ResultsAsync;
                s.sezone = new List<Sezona>();
                foreach(Sezona sez in sezone)
                {
                    s.sezone.Add(sez);
                }
            }
            //var serijeSaSezonama = await _client.Cypher.Match("(m:Serija)<-[r:PRIPADA_SERIJI]-(n:Sezona)")
            //                       .Return(m => m.As<Serija>())
            //                       .OrderBy("m.datumDodavanja DESC")
            //                       .Limit(2)
            //                       .ResultsAsync;
            var knjige = await _client.Cypher.Match("(k: Knjiga)")
                                                .Return(k => k.As<Knjiga>())
                                                .OrderBy("k.datumDodavanja DESC")
                                                .Limit(2)
                                                .ResultsAsync;



            return Ok(new
            {
                Filmovi = filmovi,
                Serije = serije,
                Knjiga = knjige
            });
            //return Ok(sezone);

        }
        [HttpPost]
        [Route("DodajOcenu/{email}/{idFilma}")]
        public async Task<ActionResult> DodajOcenu(string email, int idFilma, [FromBody] Ocena ocena)
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
            
            var data = await _client.Cypher.Match("(n:Korisnik), (m:Ocena), (f:Film)")
                                        .Where("n.email='" + email + "' AND m.id='" + ocena.id + "' AND f.id=" + idFilma)
                                        .Create("(n)-[r1:OCENJUJE_FILM]->(m)-[r2:OCENA_PRIPADA_FILMU]->(f)")
                                        //.Return((n, m, f) => new
                                        //{
                                        //    Korisnik = n.As<Korisnik>(),
                                        //    Ocena = m.As<Ocena>(),
                                        //    Film = f.As<Film>()
                                        //}).ResultsAsync;
                                        .Return(f => f.As<Film>())
                                        .ResultsAsync;
            var film = data.First();
            //var prosecnaOcena = podaci.Average();
            var podaci = await _client.Cypher.Match("(m:Ocena)-[r:OCENA_PRIPADA_FILMU]->(f:Film)")
                                      .Where("f.id=" + idFilma)
                                      .Return(m => m.As<Ocena>().ocena)
                                      .ResultsAsync;

            film.prosecnaOcena = podaci.Average();
            await _client.Cypher.Match("(f:Film)")
                                      .Where("f.id=" + idFilma)
                                      .Set("f.prosecnaOcena=" + film.prosecnaOcena)
                                      .ExecuteWithoutResultsAsync();
            //var prosecnaOcena = podaci.Average();

            return Ok(podaci);

        }
        [HttpPost]
        [Route("DodajKomentar/{email}/{idFilma}")]
        public async Task<ActionResult> DodajKomentar(string email, int idFilma, [FromBody] Komentar komentar)
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

            var data = await _client.Cypher.Match("(n:Korisnik), (m:Komentar), (f:Film)")
                                        .Where("n.email='" + email + "' AND m.id='" + komentar.id + "' AND f.id=" + idFilma)
                                        .Create("(n)-[r1:DAJE_KOMENTAR_NA_FILM]->(m)-[r2:KOMENTAR_PRIPADA_FILMU]->(f)")
                                        .Return((n, m, f) => new
                                        {
                                            Korisnik = n.As<Korisnik>(),
                                            Komentar = m.As<Komentar>(),
                                            Film = f.As<Film>()
                                        }).ResultsAsync;

            return Ok(data);
        }
        [HttpGet]
        [Route("PreuzmiKomentareIOcene/{idFilma}")]
        public async Task<IActionResult> PreuzmiKomentareIOcene(int idFilma)
        {
            var komentari = await _client.Cypher.Match("(n:Korisnik)-[r1:DAJE_KOMENTAR_NA_FILM]->(m:Komentar)-[r2:KOMENTAR_PRIPADA_FILMU]->(f:Film)")
                                                   .Where("f.id=" + idFilma)
                                                   .Return((n, m) => new
                                                   {
                                                       korisnik = n.As<Korisnik>().email,
                                                       komentar = m.As<Komentar>().sadrzaj
                                                   }

                                                    )
                                                   .ResultsAsync;

            var ocene = await _client.Cypher.Match("(n:Korisnik)-[r1:OCENJUJE_FILM]->(m:Ocena)-[r2:OCENA_PRIPADA_FILMU]->(f:Film)")
                                                   .Where("f.id=" + idFilma)
                                                   .Return((n, m) => new
                                                   {
                                                       korisnik = n.As<Korisnik>().email,
                                                       ocena = m.As<Ocena>().ocena
                                                   })
                                                   .ResultsAsync;
            return Ok(
                new
                {
                    KomentariFilma = komentari,
                    OceneFilma = ocene
                }
                );

        }
    }
}
