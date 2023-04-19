using Filmovizija.Models;
using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Filmovizija.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KorisnikController : Controller
    {
        private readonly IGraphClient _client;

        public KorisnikController(IGraphClient client)
        {
            _client = client;
        }
        [HttpGet]
        [Route("PreuzmiKorisnike")]
        public async Task<IActionResult> PreuzmiKorisnike()
        {
            var korisnici = await _client.Cypher.Match("(n: Korisnik)")
                                                  .Return(n => n.As<Korisnik>()).ResultsAsync;

            return Ok(korisnici);
        }
        [HttpGet]
        [Route("PreuzmiKorisnikaPoImenuIPrezimenu/{ime}/{prezime}")]
        public async Task<IActionResult> PreuzmiKorisnikaPoImenuIPrezimenu(string ime, string prezime)
        {
            var korisnik = await _client.Cypher.Match("(n:Korisnik)")
                                               .Where("n.ime='" + ime + "' AND n.prezime='" + prezime + "'")
                                               .Return(n=>n.As<Korisnik>())
                                               .ResultsAsync;
            return Ok(korisnik.First());

        }
        [HttpGet]
        [Route("PreuzmiKorisnikaPoJMBG/{jmbg}")]
        public async Task<IActionResult> PreuzmiKorisnikaPoJMBG(string jmbg)
        {
            var korisnik = await _client.Cypher.Match("(n:Korisnik)")
                                               .Where("n.JMBG='" +jmbg + "'")
                                               .Return(n => n.As<Korisnik>())
                                               .ResultsAsync;
            return Ok(korisnik.First());

        }
        [HttpGet]
        [Route("PreuzmiKorisnikaPoEmailu/{email}")]
        public async Task<IActionResult> PreuzmiKorisnikaPoEmailu(string email)
        {
            var korisnik = await _client.Cypher.Match("(n:Korisnik)")
                                               .Where("n.email='" + email + "'")
                                               .Return(n => n.As<Korisnik>())
                                               .ResultsAsync;
            return Ok(korisnik.First());

        }
        [HttpPost]
        [Route("DodajKorisnika")]
        public async Task<ActionResult> DodajKorisnika([FromBody] Korisnik korisnik)
        {
            await _client.Cypher.Create("(k:Korisnik $korisnik)")
                                .WithParam("korisnik", korisnik)
                                .ExecuteWithoutResultsAsync();

            return Ok();
        }
        [HttpPost]
        [Route("DodajKorisnika/{idSerije}/{idFilma}/{idKnjige}")]
        public async Task<ActionResult> DodajKorisnika(int idSerije, int idFilma, int idKnjige, [FromBody] Korisnik korisnik)
        {
            var serije = await _client.Cypher.Match("(n:Serija)")
                                        .Where("n.id=" + idSerije)
                                        .Return(n => n.As<Serija>())
                                        .ResultsAsync;
            var serija = serije.First();

            var filmovi = await _client.Cypher.Match("(n:Film)")
                                       .Where("n.id=" + idFilma)
                                       .Return(n => n.As<Film>())
                                       .ResultsAsync;
            var film = filmovi.First();

            var knjige = await _client.Cypher.Match("(n:Knjiga)")
                                       .Where("n.id=" + idKnjige)
                                       .Return(n => n.As<Knjiga>())
                                       .ResultsAsync;
            var knjiga = knjige.First();

            await _client.Cypher.Create("(k:Korisnik $korisnik)")
                              .WithParam("korisnik", korisnik)
                              .ExecuteWithoutResultsAsync();


            var serijaVeza = await _client.Cypher.Match("(n:Korisnik), (m:Serija)")
                                        .Where("m.id=" + idSerije + " AND n.id=" + korisnik.id)
                                        .Create("(n)-[r1:IMA_SERIJU]->(m)")
                                        .Create("(n)<-[r2:SERIJU_JE_KUPIO]-(m)")
                                        .Return((n, m) => new
                                        {
                                            Korisnik = n.As<Korisnik>(),
                                            Serija = m.As<Serija>()
                                        }).ResultsAsync;
            var filmVeza = await _client.Cypher.Match("(n:Korisnik), (m:Film)")
                                       .Where("m.id=" + idFilma + " AND n.id=" + korisnik.id)
                                       .Create("(n)-[r:IMA_FILM]->(m)")
                                       .Return((n, m) => new
                                       {
                                           Korisnik = n.As<Korisnik>(),
                                           Film = m.As<Film>()
                                       }).ResultsAsync;
            var knjigaVeza = await _client.Cypher.Match("(n:Korisnik), (m:Knjiga)")
                                      .Where("m.id=" + idKnjige + " AND n.id=" + korisnik.id)
                                      .Create("(n)-[r:IMA_KNJIGU]->(m)")
                                      .Return((n, m) => new
                                      {
                                          Korisnik = n.As<Korisnik>(),
                                          Knjiga = m.As<Knjiga>()
                                      }).ResultsAsync;



            return Ok(new
            {
                SerijaVeza = serijaVeza,
                FilmVeza = filmVeza,
                KnjigaVeza = knjigaVeza
            });

        }
        [HttpPut]
        [Route("IzmeniImeKorisnika/{id}/{ime}")]
        public async Task<ActionResult> IzmeniImeKorisnika(int id,string ime)
        {
            var korisnik = await _client.Cypher.Match("(n:Korisnik)")
                                           .Where("n.id=" + id)
                                           .Set("n.ime='" + ime + "'")
                                           .Return(n => n.As<Korisnik>())
                                           .ResultsAsync;
            return Ok(korisnik.First());
        }
        [HttpPut]
        [Route("IzmeniPrezimeKorisnika/{id}/{prezime}")]
        public async Task<ActionResult> IzmeniPrezimeKorisnika(int id, string prezime)
        {
            var korisnik = await _client.Cypher.Match("(n:Korisnik)")
                                           .Where("n.id=" + id)
                                           .Set("n.prezime='" + prezime + "'")
                                           .Return(n => n.As<Korisnik>())
                                           .ResultsAsync;
            return Ok(korisnik.First());
        }
        [HttpDelete]
        [Route("ObrisiKorisnika/{id}")]
        public async Task<ActionResult> ObrisiKorisnika(int id)
        {
            var korisnik = await _client.Cypher.Match("(n:Korisnik)")
                                        .Where("n.id=" + id)
                                         .DetachDelete("n")
                                         .Return(n => n.As<Korisnik>())
                                         .ResultsAsync;
            return Ok("Korisnik je obrisan");
        }

    }
}
