using Filmovizija.Models;
using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using Neo4jClient.Cypher;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Filmovizija.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SerijaController : Controller
    {
        private readonly IGraphClient _client;

        public SerijaController(IGraphClient client)
        {
            _client = client;
        }

        //[HttpPost]
        //public async Task DodajSeriju(Serija serija)
        //{
        //    Dictionary<string, object> queryDict = new Dictionary<string, object>();
        //    queryDict.Add("naziv", serija.naziv);
        //    queryDict.Add("reziser", serija.reziser);
        //    queryDict.Add("glumci", serija.glumci);
        //    queryDict.Add("kratakOpis", serija.kratakOpis);
        //    queryDict.Add("komentari", serija.komentari);
        //    queryDict.Add("cena", serija.cena);
        //    queryDict.Add("sezone", serija.sezone);
        //    //queryDict.Add("korisnici", serija.korisnici);

        //    var query = new Neo4jClient.Cypher.CypherQuery("MERGE (n:Serija {id: '" + serija.id + "', naziv:'" + serija.naziv
        //                                                   + "', reziser: '" + serija.reziser + "', glumci:[" + serija.glumci.ToArray()
        //                                                   + "], kratakOpis:'" + serija.kratakOpis + "', komentari:[" + serija.komentari.ToArray()
        //                                                   + "] cena:'" + serija.cena + "', sezone:[" + serija.sezone.ToArray() + "]}) RETURN n", queryDict, CypherResultMode.Set, "neo4j");
        //    _ = await ((IRawGraphClient)_client).ExecuteGetCypherResultsAsync<Serija>(query);
        //    //return Ok();

        //}
        [HttpPost]
        [Route("DodajSeriju")]
        public async Task<ActionResult> Create([FromBody] Serija serija)
        {
      
        await _client.Cypher.Create("(s:Serija $serija)")
                                .WithParam("serija", serija)
                                .ExecuteWithoutResultsAsync();

            return Ok();
        }
        [HttpGet]
        [Route("PreuzmiSerije")]
        public async Task<ActionResult> GetSerije()
        {
            //var sez = await _client.Cypher.Match("(n:Sezona), (m:Serija)")
            //                          .Where("m.id=" + idSerije + " AND n.id=" + sezona.id)
            //                          .Create("(m)<-[r:IMA_SEZONU]-(n)")
            //                          .Return((n, m) => new
            //                          {
            //                              Sezona = n.As<Sezona>(),
            //                              Serija = m.As<Serija>()
            //                          }).ResultsAsync;
            //var serije = await _client.Cypher.Match("(n: Serija)")
            //                        .Return(n => n.As<Serija>())
            //                        .ResultsAsync;
            var serije = await _client.Cypher.Match("(m:Serija)<-[r:PRIPADA_SERIJI]-(n:Sezona)")
                                    .Return(m => m.As<Serija>())
                                    .ResultsAsync;

            List<Serija> vratiSerije = new List<Serija>();

            foreach(Serija s in serije)
            {
                
                
                    var sezone = await _client.Cypher.Match("(m:Serija)<-[r:PRIPADA_SERIJI]-(n:Sezona)")
                                            .Where("m.id=" + s.id)
                                            .Return(n => n.As<Sezona>())
                                            .ResultsAsync;

                    s.sezone = new List<Sezona>();
                    foreach(Sezona sezona in sezone)
                    {
                        s.sezone.Add(sezona);
                    }
                    ///vratiSerije.Add(s);


                var komentari = await _client.Cypher.Match("(m:Serija)-[r:SERIJA_IMA_KOMENTAR]->(n:Komentar)")
                                        .Where("m.id=" + s.id)
                                        .Return(n => n.As<Komentar>())
                                        .ResultsAsync;

                s.komentari = new List<Komentar>();
                foreach (Komentar komentar in komentari)
                {
                    s.komentari.Add(komentar);
                }
               // vratiSerije.Add(s);
            }
            return Ok(serije);
        }


        //(n:Komentar), (m:Serija)")
         //                              .Where("n.id=" + idKomentara + " AND m.naziv='" + nazivSerije + "'")
        //                               .Create("(m)-[r:SERIJA_IMA_KOMENTAR]->(n)")
        //                               //.Return(n => n.As<Serija>())
        //                               .ExecuteWithoutResultsAsync();
        [HttpGet]
        [Route("PreuzmiSerijePoNazivu/{nazivSerije}")]
        public async Task<IActionResult> PreuzmiSerijePoNazivu(string nazivSerije)
        {
            var serije = await _client.Cypher.Match("(n:Serija)")
                                             .Where("n.naziv='" + nazivSerije + "'")
                                             .Return(n => n.As<Serija>())
                                             .ResultsAsync;

            List<Serija> vratiSerije = new List<Serija>();

            foreach (Serija s in serije)
            {


                var sezone = await _client.Cypher.Match("(m:Serija)<-[r:PRIPADA_SERIJI]-(n:Sezona)")
                                        .Where("m.id=" + s.id)
                                        .Return(n => n.As<Sezona>())
                                        .ResultsAsync;

                s.sezone = new List<Sezona>();
                foreach (Sezona sezona in sezone)
                {
                    s.sezone.Add(sezona);
                }
                vratiSerije.Add(s);
            }
            return Ok(vratiSerije);
            //return Ok(serije);

        }

        [HttpGet]
        [Route("PreuzmiSerijeIstogRezisera/{reziser}")]
        public async Task<IActionResult> PreuzmiSerijeIstogRezisera(string reziser)
        {
            var serije = await _client.Cypher.Match("(n:Serija)")
                                             .Where("n.reziser='" + reziser + "'")
                                             .Return(n => n.As<Serija>())
                                             .ResultsAsync;

            List<Serija> vratiSerije = new List<Serija>();

            foreach (Serija s in serije)
            {


                var sezone = await _client.Cypher.Match("(m:Serija)<-[r:PRIPADA_SERIJI]-(n:Sezona)")
                                        .Where("m.id=" + s.id)
                                        .Return(n => n.As<Sezona>())
                                        .ResultsAsync;

                s.sezone = new List<Sezona>();
                foreach (Sezona sezona in sezone)
                {
                    s.sezone.Add(sezona);
                }
                vratiSerije.Add(s);
            }
            return Ok(vratiSerije);
            //return Ok(serijeRezisera);

        }

        [HttpGet]
        [Route("PreuzmiSerijePoCeni/{cenaOd}/{cenaDo}")]
        public async Task<IActionResult> PreuzmiSerijePoCeni(double cenaOd, double cenaDo)
        {
            var serijePoCeni = await _client.Cypher.Match("(n:Serija)")
                                                    .Where("n.cena>=" + cenaOd + " AND n.cena<=" + cenaDo + "")
                                                    .Return(n => n.As<Serija>())
                                                    .ResultsAsync;
            //List<Serija> vratiSerije = new List<Serija>();

            foreach (Serija s in serijePoCeni)
            {


                var sezone = await _client.Cypher.Match("(m:Serija)<-[r:PRIPADA_SERIJI]-(n:Sezona)")
                                        .Where("m.id=" + s.id)
                                        .Return(n => n.As<Sezona>())
                                        .ResultsAsync;

                s.sezone = new List<Sezona>();
                foreach (Sezona sezona in sezone)
                {
                    s.sezone.Add(sezona);
                }
                //vratiSerije.Add(s);
            }
            return Ok(serijePoCeni);

        }
        [HttpGet]
        [Route("PreuzmiGlumceUSeriji/{nazivSerije}")]
        public async Task<IActionResult> PreuzmiGlumceUSeriji(string nazivSerije)
        {
            var glumci = await _client.Cypher.Match("(n:Serija)")
                                                    .Where("n.naziv='"+nazivSerije+"'")
                                                    .Return(n => n.As<Serija>().glumci)
                                                    .ResultsAsync;
            return Ok(glumci.First());

        }

        [HttpPut]
        [Route("IzmeniSeriju/{id}/{nazivSerije}")]
        public async Task<ActionResult> IzmeniSeriju(int id, string nazivSerije)
        {
            var s = await _client.Cypher.Match("(n:Serija)")
                                        .Where("n.id=" + id)
                                        .Set("n.naziv='" + nazivSerije + "'")
                                        .Return(n => n.As<Serija>())
                                        .ResultsAsync;

            return Ok(s.First());
        }
        [HttpPut]
        [Route("IzmeniCenuSerije/{id}/{cena}")]
        public async Task<ActionResult> IzmeniCenuSerije(int id, double cena)
        {
            var s = await _client.Cypher.Match("(n:Serija)")
                                        .Where("n.id=" + id)
                                        .Set("n.cena=" + cena)
                                        .Return(n => n.As<Serija>())
                                        .ResultsAsync;

            return Ok(s);
        }

        [HttpDelete]
        [Route("ObrisiSeriju/{id}")]
        public async Task<ActionResult> ObrisiSeriju(int id)
        {
            var s = await _client.Cypher.Match("(n:Serija)")
                                        .Where("n.id=" + id)
                                        .DetachDelete("n")
                                        .Return(n=>n.As<Serija>())
                                        .ResultsAsync;

            return Ok("Serija je obrisana!");                            
        }


        //ukucas seriju,ukucas sezonu i izbaci sve epizode
        [HttpGet]
        [Route("PreuzmiSveEpizodeSerijePoID/{idSerije}/{idSezone}")]
        public async Task<ActionResult> PreuzmiSveEpizodeJedneSezoneSerijePoID(int idSerije, int idSezone)
        {
            var epizode = await _client.Cypher.Match("(m:Serija)<-[r:PRIPADA_SERIJI]-(n:Sezona)")
                                               .Where("n.id=" + idSezone + " AND m.id=" + idSerije)
                                               .Return(n => n.As<Sezona>().epizode)
                                               .ResultsAsync;
            return Ok(epizode);
        }
        //ukucas seriju,ukucas sezonu i izbaci sve epizode
        [HttpGet]
        [Route("PreuzmiSveEpizodeSerijePoNazivu/{nazivSerije}")]
        public async Task<ActionResult> PreuzmiSveEpizodeJedneSezoneSerije(string nazivSerije)
        {
            var epizode = await _client.Cypher.Match("(m:Serija)<-[r:PRIPADA_SERIJI]-(n:Sezona)")
                                               .Where("m.naziv='" + nazivSerije + "'")
                                               .Return(n => n.As<Sezona>())
                                               .ResultsAsync;
            return Ok(epizode);
        }
        //ukucas nazivns serije,sezonu i epizodu (naziv epizoda)
        //[HttpGet]
        //[Route("PreuzmiEpizoduSerije/{nazivSerije}/{idSezone}/{nazivEpizode}")]
        //public async Task<ActionResult> PreuzmiSveEpizodeJedneSezoneSerije(int idSerije, int idSezone)
        //{
        //    var epizode = await _client.Cypher.Match("(m:Serija)<-[r:IMA_SEZONU]-(n:Sezona)")
        //                                       .Where("n.id=" + idSezone + " AND m.id=" + idSerije)
        //                                       .Return(n => n.As<Sezona>().epizode)
        //                                       .ResultsAsync;
        //    return Ok(epizode);
        //}

        //Pretrazi serije i filmove po godini izdavanja
        [HttpGet]
        [Route("PreuzmiSerijeIFilmovePoGodiniIzdavanja/{godinaIzdavanja}")]
        public async Task<ActionResult> PreuzmiSerijeIFilmovePoGodiniIzdavanja(int godinaIzdavanja)
        {
            //var serijeIFilmovi = await _client.Cypher.Match("(f:Film), (m:Serija)<-[r:IMA_SEZONU]-(n:Sezona)")
            //                                   .Where("n.godinaIzdavanja=" + godinaIzdavanja + " AND f.godinaIzdanja=" + godinaIzdavanja)
            //                                   //.Return(n => n.As<Sezona>().epizode)
            //                                    .Return((n, m,f) => new
            //                                    {
            //                                        Serija = m.As<Serija>(),
            //                                        Sezona = n.As<Sezona>(),
            //                                        Film = f.As<Film>()
            //                                    }).ResultsAsync;

            //var serije = await _client.Cypher.Match("(m:Serija)<-[r:IMA_SEZONU]-(n:Sezona)")
            //                                   .Where("n.godinaIzdavanja=" + godinaIzdavanja )
            //                                    .Return((n, m) => new
            //                                    {
            //                                        Serija = m.As<Serija>(),
            //                                        Sezona = n.As<Sezona>()
            //                                    }).ResultsAsync;
            var serije = await _client.Cypher.Match("(m:Serija)<-[r:PRIPADA_SERIJI]-(n:Sezona)")
                                    .Where("n.godinaIzdavanja=" + godinaIzdavanja)
                                    .Return(m => m.As<Serija>())
                                    .ResultsAsync;
            var filmovi = await _client.Cypher.Match("(f:Film)")
                                               .Where("f.godinaIzdanja=" + godinaIzdavanja) 
                                                .Return(f => f.As<Film>())
                                                .ResultsAsync;

            List<Serija> vratiSerije = new List<Serija>();

            foreach(Serija s in serije)
            {


                var sezone = await _client.Cypher.Match("(m:Serija)<-[r:PRIPADA_SERIJI]-(n:Sezona)")
                                        .Where("m.id=" + s.id)
                                        .Return(n => n.As<Sezona>())
                                        .ResultsAsync;

                s.sezone = new List<Sezona>();
                foreach (Sezona sezona in sezone)
                {
                    s.sezone.Add(sezona);
                }
                vratiSerije.Add(s);
            }
            //return Ok(vratiSerije);

            return Ok(new
            {
                vratiSerije,
                filmovi
            });
        }
        [HttpPut]
        [Route("DodajKomentarSeriji/{idKomentara}/{nazivSerije}")]
        public async Task<ActionResult> DodajKomentarSeriji(string idKomentara, string nazivSerije)
        {
            await _client.Cypher.Match("(n:Komentar), (m:Serija)")
                                       .Where("n.id='" + idKomentara + "' AND m.naziv='" + nazivSerije + "'")
                                       .Create("(m)-[r:SERIJA_IMA_KOMENTAR]->(n)")
                                       //.Return(n => n.As<Serija>())
                                       .ExecuteWithoutResultsAsync();

            return Ok("Komentar je uspesno dodat!");
        }
        [HttpGet]
        [Route("PreuzmiSveKomentareZaDatuSeriju/{idSerije}")]
        public async Task<IActionResult> PreuzmiSveKomentareZaDatuSeriju(int idSerije)
        {

            var komentari = await _client.Cypher.Match("(m:Serija)-[r:SERIJA_IMA_KOMENTAR]->(n:Komentar)")
                                                   .Where("m.id=" + idSerije)
                                                   .Return(n => n.As<Komentar>())
                                                   .ResultsAsync;

            return Ok(komentari);
        }
        [HttpPost]
        [Route("DodajOcenu/{email}/{idSerije}")]
        public async Task<ActionResult> DodajOcenu(string email,int idSerije, [FromBody] Ocena ocena)
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

            var data = await _client.Cypher.Match("(n:Korisnik), (m:Ocena), (s:Serija)")
                                        .Where("n.email='" + email + "' AND m.id='" + ocena.id+ "' AND s.id="+idSerije)
                                        .Create("(n)-[r1:OCENJUJE_SERIJU]->(m)-[r2:OCENA_PRIPADA_SERIJI]->(s)")
                                        //.Return((n, m,s) => new
                                        //{
                                        //    Korisnik = n.As<Korisnik>(),
                                        //    Ocena = m.As<Ocena>(),
                                        //    Serija = s.As<Serija>()
                                        //}).ResultsAsync;
                                        .Return(s => s.As<Serija>())
                                        .ResultsAsync;

            var serija = data.First();
            //var prosecnaOcena = podaci.Average();
            var podaci = await _client.Cypher.Match("(m:Ocena)-[r:OCENA_PRIPADA_SERIJI]->(s:Serija)")
                                      .Where("s.id=" + idSerije)
                                      .Return(m => m.As<Ocena>().ocena)
                                      .ResultsAsync;

            serija.prosecnaOcena = podaci.Average();

            await _client.Cypher.Match("(s:Serija)")
                                     .Where("s.id=" + idSerije)
                                     .Set("s.prosecnaOcena=" + serija.prosecnaOcena)
                                     .ExecuteWithoutResultsAsync();

            return Ok(serija);

        }
        [HttpGet]
        [Route("PreuzmiSerijePoProscnojOceni/{idSerije}")]
        public async Task<IActionResult> PreuzmiSerijePoProscnojOceni(int idSerije)
        {
           
            var data = await _client.Cypher.Match("(m:Ocena)-[r:OCENA_PRIPADA_SERIJI]->(s:Serija)")
                                       .Where("s.id=" + idSerije)
                                       .Return(m => m.As<Ocena>().ocena)
                                       .ResultsAsync;

            var prosecnaOcena = data.Average();

            return Ok(prosecnaOcena);

        }

        [HttpPost]
        [Route("DodajKomentar/{email}/{idSerije}")]
        public async Task<ActionResult> DodajKomentar(string email, int idSerije, [FromBody] Komentar komentar)
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

            var data = await _client.Cypher.Match("(n:Korisnik), (m:Komentar), (s:Serija)")
                                        .Where("n.email='" + email + "' AND m.id='" + komentar.id + "' AND s.id=" + idSerije)
                                        .Create("(n)-[r1:DAJE_KOMENTAR_NA_SERIJU]->(m)-[r2:KOMENTAR_PRIPADA_SERIJI]->(s)")
                                        .Return((n, m, s) => new
                                        {
                                            Korisnik = n.As<Korisnik>(),
                                            Komentar = m.As<Komentar>(),
                                            Serija = s.As<Serija>()
                                        }).ResultsAsync;

            return Ok(data);
        }
        [HttpGet]
        [Route("PreuzmiKomentareIOcene/{idSerije}")]
        public async Task<IActionResult> PreuzmiKomentareIOcene(int idSerije)
        {
            var komentari = await _client.Cypher.Match("(m:Komentar)-[r1:KOMENTAR_PRIPADA_SERIJI]->(s:Serija)")
                                                   .Where("s.id=" + idSerije)
                                                   .Return(m => m.As<Komentar>())
                                                   .ResultsAsync;
            var ocene = await _client.Cypher.Match("(o:Ocena)-[r2:OCENA_PRIPADA_SERIJI]->(s:Serija)")
                                                   .Where("s.id=" + idSerije)
                                                   .Return(o => o.As<Ocena>())
                                                   .ResultsAsync;
            return Ok(
                new
                {
                    KomentariSerije = komentari,
                    OceneSerije = ocene
                }
                );

        }

        [HttpGet]
        [Route("PreuzmiKomentareIOceneSerije/{idSerije}")]
        public async Task<IActionResult> PreuzmiKomentareIOceneSerije(int idSerije)
        {
            var komentari = await _client.Cypher.Match("(n:Korisnik)-[r1:DAJE_KOMENTAR_NA_SERIJU]->(m:Komentar)-[r2:KOMENTAR_PRIPADA_SERIJI]->(f:Serija)")
                                                   .Where("f.id=" + idSerije)
                                                   .Return((n, m) => new
                                                   {
                                                       korisnik = n.As<Korisnik>().email,
                                                       komentar = m.As<Komentar>().sadrzaj
                                                   }

                                                    )
                                                   .ResultsAsync;

            var ocene = await _client.Cypher.Match("(n:Korisnik)-[r1:OCENJUJE_SERIJU]->(m:Ocena)-[r2:OCENA_PRIPADA_SERIJI]->(f:Serija)")
                                                   .Where("f.id=" + idSerije)
                                                   .Return((n, m) => new
                                                   {
                                                       korisnik = n.As<Korisnik>().email,
                                                       ocena = m.As<Ocena>().ocena
                                                   })
                                                   .ResultsAsync;
            return Ok(
                new
                {
                    KomentariSerije = komentari,
                    OceneSerije = ocene
                }
                );

        }
        //public IActionResult Index()
        //{
        //    return View();
        //}
    }
}
