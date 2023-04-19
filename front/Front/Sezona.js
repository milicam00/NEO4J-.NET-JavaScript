export class Sezona{

    constructor(id,naziv,epizode,godinaIzdavanja,serija)
    {
        this.id=id;
        this.naziv=naziv;
        this.epizode=epizode;
        //this.prosecnaOcena=prosecnaOcena;
        this.godinaIzdavanja=godinaIzdavanja;
        this.serija=serija;
        this.kontejner = null;
    }
    prikaziSezonu(host){

        this.kontejner=document.createElement("div");
        this.kontejner.className="DivSeznona";
        host.appendChild(this.kontejner);

        let divNazivSezone = document.createElement("div");
        divNazivSezone.className = "DivNazivSezone";
        divNazivSezone.innerHTML ="Naziv sezone: "+ this.naziv;
        this.kontejner.appendChild(divNazivSezone);

        // let divProsecnaOcena = document.createElement("div");
        // divProsecnaOcena.className = "DivProsecnaOcena";
        // divProsecnaOcena.innerHTML = "Prosecna ocena sezone: "+this.prosecnaOcena+ "/10";
        // this.kontejner.appendChild(divProsecnaOcena);

      

        let divEpizode = document.createElement("div");
        divEpizode.className = "DivEpizode";
        divEpizode.innerHTML ="Epizode: ";

        this.epizode.forEach(e=>{
            divEpizode.innerHTML += e + ", ";
        })

        this.kontejner.appendChild(divEpizode);
    }
}