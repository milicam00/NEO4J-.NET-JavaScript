import { Ocena } from "./Ocena.js";
import{Komentar} from "./Komentar.js";

export class Film{

    constructor(id, naziv, reziser, zanr, glumci, godinaIzdanja,prosecnaOcena,  kratakOpis, cena, korisnici, slika, triler){
        this.id = id;
        this.naziv = naziv;
        this.reziser = reziser;
        this.zanr = zanr;
        this.glumci = glumci;
        this.godinaIzdanja = godinaIzdanja;
        this.kratakOpis = kratakOpis;
        this.komentari = [];
        this.cena = cena;
        this.korisnici = korisnici;
        this.slika = slika;
        this.triler = triler;
        this.prosecnaOcena = prosecnaOcena;
        this.kontejner = null;
    }
    crtajFilm(host, prikaz){
      
        this.kontejner=document.createElement("div");
        this.kontejner.className="DivFilm";     
        host.appendChild(this.kontejner);

        let divSlika = document.createElement("img");
        divSlika.className = "DivSlika";
        divSlika.src = this.slika;
        this.kontejner.onclick = (ev) => this.prikaziFilm(host, prikaz);
        this.kontejner.appendChild(divSlika);

        let divNaziv = document.createElement("div");
        divNaziv.className = "DivNaziv";
        divNaziv.innerHTML = this.naziv;
        this.kontejner.appendChild(divNaziv);

        let divProsecnaOcena = document.createElement("div");
        divProsecnaOcena.className = "DivProsecnaOcena";
        divProsecnaOcena.innerHTML = this.prosecnaOcena+ "/10";
        this.kontejner.appendChild(divProsecnaOcena);

        let divGodinaIzdanja = document.createElement("div");
        divGodinaIzdanja.className = "DivGodinaIzdanja";
        divGodinaIzdanja.innerHTML = this.godinaIzdanja;
        this.kontejner.appendChild(divGodinaIzdanja);
    }
    prikaziFilm(host, prikaz){
        //var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divInfo = document.createElement("div");
        divInfo.className = "DivInfo";
        prikaz.appendChild(divInfo);

        let divForme = document.createElement("div");
        divForme.className = "DivForme";
        prikaz.appendChild(divForme);

        let divSlika = document.createElement("img");
        divSlika.className = "DivSlika";
        divSlika.src = this.slika;
        divInfo.appendChild(divSlika);

        let divNaziv = document.createElement("div");
        divNaziv.className = "DivNaziv";
        divNaziv.innerHTML ="Naziv filma: "+ this.naziv;
        divInfo.appendChild(divNaziv);

        let divReziser = document.createElement("div");
        divReziser.className = "DivReziser";
        divReziser.innerHTML ="Reziser: "+ this.reziser;
        divInfo.appendChild(divReziser);

        let glumci = "";
        this.glumci.forEach(g=>{
            glumci += g + ", ";
        })
        let divGlumci = document.createElement("div");
        divGlumci.className = "DivGlumci";
        divGlumci.innerHTML ="Glumci: "+ glumci;
        divInfo.appendChild(divGlumci);

        let divProsecnaOcena = document.createElement("div");
        divProsecnaOcena.className = "DivProsecnaOcena";
        divProsecnaOcena.innerHTML ="Prosecna ocena: "+ this.prosecnaOcena+ "/10";
        divInfo.appendChild(divProsecnaOcena);

        let divGodinaIzdanja = document.createElement("div");
        divGodinaIzdanja.className = "DivGodinaIzdanja";
        divGodinaIzdanja.innerHTML ="Godina izlaska: "+ this.godinaIzdanja;
        divInfo.appendChild(divGodinaIzdanja);

        let divOpis = document.createElement("div");
        divOpis.className = "divOpis";
        divOpis.innerHTML ="Kratak opis: "+ this.kratakOpis;
        divInfo.appendChild(divOpis);


        let btnIzmeniFilm = document.createElement("button");
        btnIzmeniFilm.className = "btnIzmeniFilm";
        btnIzmeniFilm.innerHTML = "Izmeni film";
        btnIzmeniFilm.onclick = (ev) => this.izmeniFilm(divForme,host,  prikaz);
        divForme.appendChild(btnIzmeniFilm);


        let btnObrisiFilm = document.createElement("button");
        btnObrisiFilm.className = "btnObrisiFilm";
        btnObrisiFilm.innerHTML = "Obrisi film";
        btnObrisiFilm.onclick = (ev) => this.obrisiFilm(divForme,host,  prikaz);
        divForme.appendChild(btnObrisiFilm);

        let btnOceniFilm = document.createElement("button");
        btnOceniFilm.className = "btnOceniFilm";
        btnOceniFilm.innerHTML = "Oceni film";
        btnOceniFilm.onclick = (ev) => this.oceniFilm(divForme,host,  prikaz);
        divForme.appendChild(btnOceniFilm);

        let btnKomentrisiFilm = document.createElement("button");
        btnKomentrisiFilm.className = "btnKomentrisiFilm";
        btnKomentrisiFilm.innerHTML = "Komentarisi film";
        btnKomentrisiFilm.onclick = (ev) => this.komentarisiFilm(divForme,host,  prikaz);
        divForme.appendChild(btnKomentrisiFilm);


        let divKomentari = document.createElement("div");
        divKomentari.className = "DivKomntari";
        divForme.appendChild(divKomentari);
        let lbl1 = document.createElement("label");
        lbl1.innerHTML = "Komentari: ";
        divKomentari.appendChild(lbl1);

        this.komentari.forEach(k=>{
            let lbl = document.createElement("label");
            lbl.className = "LblKomentari";
            lbl.innerHTML = k.sadrzaj;
            divKomentari.appendChild(lbl);
        })

    }

    izmeniFilm(divForme,host,  prikaz){
        
        let divNaziv = document.createElement("div");
        divNaziv.className = "DivNaziv";
        divForme.appendChild(divNaziv);
        let lblNaziv = document.createElement("label");
        lblNaziv.className = "LblNaziv";
        divNaziv.appendChild(lblNaziv);
        let inputNaziv = document.createElement("input");
        inputNaziv.className = "InputNaziv";
        inputNaziv.placeholder = "Naziv";
        divNaziv.appendChild(inputNaziv);
        let btnIzmeniFilm = document.createElement("button");
        btnIzmeniFilm.className = "btnIzmeniFilm";
        btnIzmeniFilm.innerHTML = "Izmeni";
        btnIzmeniFilm.onclick = (ev) => this.izmeni(inputNaziv.value,host,  prikaz);
        divForme.appendChild(btnIzmeniFilm);
    }
    oceniFilm(divForme,host,  prikaz){
        
        let divOceni = document.createElement("div");
        divOceni.className = "DivOceni";
        divForme.appendChild(divOceni);
        let lblOceni = document.createElement("label");
        lblOceni.className = "LblOceni";
        divOceni.appendChild(lblOceni);
        let inputOceni = document.createElement("input");
        inputOceni.className = "InputOceni";
        inputOceni.placeholder = "Unesite ocenu";
        divOceni.appendChild(inputOceni);
        let inputEmail = document.createElement("input");
        inputEmail.className = "InputEmail";
        inputEmail.placeholder = "Unesite email";
        divOceni.appendChild(inputEmail);
        let btnOceni = document.createElement("button");
        btnOceni.className = "btnOceni";
        btnOceni.innerHTML = "Oceni film";
        btnOceni.onclick = (ev) => this.oceni(inputOceni.value, inputEmail.value ,host,  prikaz);
        divForme.appendChild(btnOceni);
    }
    komentarisiFilm(divForme,host,  prikaz){
        
        let divKomentarisi = document.createElement("div");
        divKomentarisi.className = "divKomentarisi";
        divForme.appendChild(divKomentarisi);
      
        let inputKomentarisi = document.createElement("input");
        inputKomentarisi.className = "inputKomentarisi";
        inputKomentarisi.placeholder = "Dajte komentar";
        divKomentarisi.appendChild(inputKomentarisi);
        let inputEmail = document.createElement("input");
        inputEmail.className = "InputEmail";
        inputEmail.placeholder = "Unesite email";
        divKomentarisi.appendChild(inputEmail);
        let btnKomentrisi= document.createElement("button");
        btnKomentrisi.className = "btnKomentrisi";
        btnKomentrisi.innerHTML = "Komentarisi film";
        btnKomentrisi.onclick = (ev) => this.komentarisi(inputKomentarisi.value, inputEmail.value ,host,  prikaz);
        divForme.appendChild(btnKomentrisi);
    }
    izmeni(naziv,host,  prikaz){
        console.log(naziv);

        fetch("https://localhost:44389/Film/IzmeniFilm/"+this.id + "/"+naziv,
        {
           method:"PUT"
        }).then(s=>{
            if(s.ok){
                s.json().then(f=>{
                    console.log(f);
                    this.naziv =f.naziv;
                    alert("Film je izmenjen!");
                    //this.crtajFilm(host,prikaz);
                })
            }
        })
    }

    obrisiFilm(divForme,host,  prikaz){
        fetch("https://localhost:44389/Film/ObrisiFilm/"+this.id,
        {
           method:"DELETE"
        }).then(s=>{
            if(s.ok){
               
                alert("Film je obrisan!");
                
            }
        })

    }

    oceni(ocena,email, host,  prikaz){
        console.log(ocena)
        console.log(email)
        let o = new Ocena(ocena);
       
        fetch("https://localhost:44389/Film/DodajOcenu/"+email+"/"+this.id,
        {

            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(o)
            }).then(s=>{
            if(s.ok){
                s.json().then(rez=>{
                    console.log(rez);
                    this.prosecnaOcena = rez.prosecnaOcena;
                    alert("Film je ocenjen!");
                    //this.crtajFilm(host,prikaz);
                })
            }
        })
    }
    komentarisi(komentar,email){
        let k = new Komentar(komentar);
        fetch("https://localhost:44389/Film/DodajKomentar/"+email+"/"+this.id,
        {

            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(k)
            }).then(s=>{
            if(s.ok){
                s.json().then(rez=>{
                    console.log(rez);
                   
                    alert("Komentar je uspesno dodat!");
                    //this.crtajFilm(host,prikaz);
                })
            }
        })
    }
}