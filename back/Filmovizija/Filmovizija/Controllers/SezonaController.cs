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
    public class SezonaController : Controller
    {
        private readonly IGraphClient _client;

        public SezonaController(IGraphClient client)
        {
            _client = client;
        }

        [HttpPost]
        [Route("DodajSezonu/{idSerije}")]
        public async Task<ActionResult> DodajSezonu(int idSerije, [FromBody]Sezona sezona)
        {
            var serije = await _client.Cypher.Match("(n:Serija)")
                                        .Where("n.id=" + idSerije)
                                        .Return(n => n.As<Serija>())
                                        .ResultsAsync;

            var serija = serije.First();

            //serija.sezone.Append( sezona);
            //serija.sezone.Add(sezona);

            await _client.Cypher.Create("(s:Sezona $sezona)")
                              .WithParam("sezona", sezona)
                              .ExecuteWithoutResultsAsync();

            var sez = await _client.Cypher.Match("(n:Sezona), (m:Serija)")
                                        .Where("m.id=" + idSerije + " AND n.id="+sezona.id)
                                        .Create("(m)<-[r:PRIPADA_SERIJI]-(n)")
                                        .Return((n, m) => new
                                        {
                                            Sezona = n.As<Sezona>(),
                                            Serija = m.As<Serija>()
                                        }).ResultsAsync;

            return Ok(serija);

        }
        
        //public IActionResult Index()
        //{
        //    return View();
        //}
    }
}
