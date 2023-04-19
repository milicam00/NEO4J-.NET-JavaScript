export class Korisnik{
    constructor(id,ime,prezime,JMBG,email,sifra)
    {
        this.id=id;
        this.ime=ime;
        this.prezime=prezime;
        this.filmovi=[];
        this.knjige=[];
        this.serije=[];
        this.JMBG=JMBG;
        this.email=email;
        this.sifra=sifra;
        this.komentari = [];
        this.ocene = [];
        this.kontejner=null;
    }

    crtajKorisnika(host,prikaz){

        this.kontejner=document.createElement("div");
        this.kontejner.className="DivKorisnik";
        this.kontejner.onclick=(ev)=>this.prikaziKorisnika(host,prikaz)
        host.appendChild(this.kontejner);

        let divIme=document.createElement("div");
        divIme.className="DivIme";
        divIme.innerHTML="IME KORISNIKA: " +this.ime;
        this.kontejner.appendChild(divIme);

        let divPrezime=document.createElement("div");
        divPrezime.className="DivPrezime";
        divPrezime.innerHTML="PREZIME KORISNIKA: "+this.prezime;
        this.kontejner.appendChild(divPrezime);

        let divJMBG=document.createElement("div");
        divJMBG.className="DivJMBG";
        divJMBG.innerHTML="JMBG: "+this.JMBG;
        this.kontejner.appendChild(divJMBG);

        let divEmail=document.createElement("div");
        divEmail.className="DivEmail";
        divEmail.innerHTML="EMAIL: "+this.email;
        this.kontejner.appendChild(divEmail);

        let divSifra=document.createElement("div");
        divSifra.className="DivSifra";
        divSifra.innerHTML="SIFRA: "+this.sifra;
        this.kontejner.appendChild(divSifra);
    }

    prikaziKorisnika(host,prikaz){
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);
        
        
        let divInformacije=document.createElement("div");
        divInformacije.className="DivInformacije";
        prikaz.appendChild(divInformacije);

        let divForme = document.createElement("div");
        divForme.className = "DivForme";
        prikaz.appendChild(divForme);


        let divIme=document.createElement("div");
        divIme.className="DivIme";
        divIme.innerHTML="Ime korisnika: "+this.ime;
        divInformacije.appendChild(divIme);

        let divPrezime=document.createElement("div");
        divPrezime.className="DivPrezime";
        divPrezime.innerHTML="PREZIME KORISNIKA: "+this.prezime;
        divInformacije.appendChild(divPrezime);

        let divJMBG=document.createElement("div");
        divJMBG.className="DivJMBG";
        divJMBG.innerHTML="JMBG: "+this.JMBG;
        divInformacije.appendChild(divJMBG);

        let divEmail=document.createElement("div");
        divEmail.className="DivEmail";
        divEmail.innerHTML="EMAIL: "+this.email;
        divInformacije.appendChild(divEmail);

        let divSifra=document.createElement("div");
        divSifra.className="DivSifra";
        divSifra.innerHTML="SIFRA: "+this.sifra;
        divInformacije.appendChild(divSifra);


        let btnIzmeniKorisnika=document.createElement("button");
        btnIzmeniKorisnika.className="btnIzmeniKorisnika";
        btnIzmeniKorisnika.innerHTML="Izmeni korisnika";
        btnIzmeniKorisnika.onclick=(ev)=>this.izmeniKorisnika(divForme,host,prikaz);
        divForme.appendChild(btnIzmeniKorisnika);


        let btnObrisiKorisnika=document.createElement("button");
        btnObrisiKorisnika.className="btnObrisiKorisnika";
        btnObrisiKorisnika.innerHTML="Obrisi korisnika";
        btnObrisiKorisnika.onclick=(ev)=>this.obrisiKorisnika(divForme,host,prikaz);
        divForme.appendChild(btnObrisiKorisnika);

    }

    izmeniKorisnika(divForme,host,prikaz){

        let divIme=document.createElement("div");
        divIme.className="DivIme";
        divForme.appendChild(divIme);
        
        
        let divPrezime=document.createElement("div");
        divPrezime.className="divPrezime";
        divForme.appendChild(divPrezime);
        
        let inputIme = document.createElement("input");
        inputIme.className = "InputIme";
        inputIme.placeholder = "Ime";
        divIme.appendChild(inputIme);

        let btnIzmeniImeKorisnika = document.createElement("button");
        btnIzmeniImeKorisnika.className = "btnIzmeniImeKorisnika";
        btnIzmeniImeKorisnika.innerHTML = "Izmeni ime korisnika";
        btnIzmeniImeKorisnika.onclick = (ev) => this.izmeniImeKorisnika(inputIme.value,host,  prikaz);
        divIme.appendChild(btnIzmeniImeKorisnika);

        
        let inputPrezime = document.createElement("input");
        inputPrezime.className = "InputPrezime";
        inputPrezime.placeholder = "Prezime";
        divPrezime.appendChild(inputPrezime);

        let btnIzmeniPrezimeKorisnika = document.createElement("button");
        btnIzmeniPrezimeKorisnika.className = "btnIzmeniPrezimeKorisnika";
        btnIzmeniPrezimeKorisnika.innerHTML = "Izmeni prezime korisnika";
        btnIzmeniPrezimeKorisnika.onclick = (ev) => this.izmeniPrezimeKorisnika(inputPrezime.value,host,  prikaz);
        divPrezime.appendChild(btnIzmeniPrezimeKorisnika);


    }

    izmeniImeKorisnika(ime){
        //console.log(ime);
        fetch("https://localhost:44389/Korisnik/IzmeniImeKorisnika/"+this.id+"/"+ime,{
            method:"PUT"
        }).then(x=>{
            if(x.ok){
                x.json().then(p=>{
                   // console.log(p);
                    this.ime=p.ime;
                    alert("Ime korisnika je izmenjeno!");
                               })
            }
        })
    }

    izmeniPrezimeKorisnika(prezime){
        console.log(prezime);
        fetch("https://localhost:44389/Korisnik/IzmeniPrezimeKorisnika/"+this.id+"/"+prezime,{
            method:"PUT"
        }).then(x=>{
            if(x.ok){
                x.json().then(p=>{
                   // console.log(p);
                    this.prezime=p.prezime;
                    alert("Prezime korisnika je izmenjeno!");
                               })
            }
        })
    }

    obrisiKorisnika(){
        fetch("https://localhost:44389/Korisnik/ObrisiKorisnika/"+this.id,{
            method:"DELETE"
        }).then(x=>{
            if(x.ok){
                //console.log(x);
                alert("Korisnik je obrisan!")
            }
        })
    }

}