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
    public class KomentarController : Controller
    {
        private readonly IGraphClient _client;

        public KomentarController(IGraphClient client)
        {
            _client = client;
        }
        //[HttpGet]
        //[Route("PreuzmiKomentareKorisnika/{idKorisnika}")]
        //public async Task<IActionResult> Get(int idKorisnika)
        //{
        //    var departments = await _client.Cypher.Match("(n: Komentar)")
        //                                          .Return(n => n.As<Komentar>()).ResultsAsync;

        //    return Ok(departments);
        //}
        [HttpGet]
        [Route("PreuzmiKomentareKorisnika/{idKorisnika}")]
        public async Task<IActionResult> PreuzmiSerijePoNazivu(int idKorisnika)
        {
            //var korisnici = await _client.Cypher.Match("(n:Korisnik)")
            //                                 .Where("n.id=" + idKorisnika )
            //                                 .Return(n => n.As<Korisnik>())
            //                                 .ResultsAsync;

            ////List<Komentar> vratiKomentare = new List<Komentar>();
            //var korisnik = korisnici.First();

            //foreach (Komentar k in komentari)
            //{


                var komentari = await _client.Cypher.Match("(m:Korisnik)<-[r:PRIPADA]-(n:Komentar)")
                                        .Where("m.id=" +idKorisnika)
                                        .Return(n => n.As<Komentar>())
                                        .ResultsAsync;
            //}
            return Ok(komentari);
            //return Ok(serije);

        }
        [HttpPost]
        [Route("DodajKomentar/{email}")]
        public async Task<ActionResult> DodajKomentar(string email, [FromBody] Komentar komentar)
        {
            //var korisnici = await _client.Cypher.Match("(n:Korisnik)")
            //                            .Where("n.id=" + idKorisnika)
            //                            .Return(n => n.As<Korisnik>())
            //                            .ResultsAsync;

            //var korisnik = korisnici.First();

            Guid myuuid = Guid.NewGuid();
            string idString = myuuid.ToString();
            komentar.id = idString;

            await _client.Cypher.Create("(k:Komentar $komentar)")
                              .WithParam("komentar", komentar)
                              .ExecuteWithoutResultsAsync();

            var kor = await _client.Cypher.Match("(n:Komentar), (m:Korisnik)")
                                        .Where("m.email='" + email + "' AND n.id='" + komentar.id+ "'")
                                        .Create("(m)<-[r:PRIPADA]-(n)")
                                        .Return((n, m) => new
                                        {
                                            Komentar = n.As<Komentar>(),
                                            Korisnik = m.As<Korisnik>()
                                        }).ResultsAsync;

            return Ok(kor);

        }
        //public IActionResult Index()
        //{
        //    return View();
        //}
    }
}
