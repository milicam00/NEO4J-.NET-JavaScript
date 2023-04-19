import { Ocena } from "./Ocena.js";
import{Komentar} from "./Komentar.js";

export class Knjiga
{
    constructor(id,naziv,autor,godina_izdavanja,kratak_opis,izdavac,zanr,broj_strana,povez,prosecna_ocena,cena,jezik,slika,korisnici)
    {
        this.id=id;
        this.naziv=naziv;
        this.autor=autor;
        this.godina_izdavanja=godina_izdavanja;
        this.kratak_opis=kratak_opis;
        this.izdavac=izdavac;
        this.zanr=zanr;
        this.broj_strana=broj_strana;
        this.povez=povez;
        this.komentari=[];
        this.prosecna_ocena = prosecna_ocena;
        this.cena=cena;
        this.jezik=jezik;
        this.slika=slika;
        this.korisnici=korisnici;
    }

    crtajKnjigu(host, prikaz){
      
        this.kontejner=document.createElement("div");
        this.kontejner.className="DivKnjiga";
        host.appendChild(this.kontejner);

        let divSlika = document.createElement("img");
        divSlika.className = "DivSlika";
        divSlika.src = this.slika;
        this.kontejner.onclick = (ev) => this.prikaziKnjigu(host, prikaz);
        this.kontejner.appendChild(divSlika);

        let divNaziv = document.createElement("div");
        divNaziv.className = "DivNaziv";
        divNaziv.innerHTML = this.naziv;
        this.kontejner.appendChild(divNaziv);

        let divProsecnaOcena = document.createElement("div");
        divProsecnaOcena.className = "DivProsecnaOcena";
        divProsecnaOcena.innerHTML = this.prosecna_ocena+ "/10";
        this.kontejner.appendChild(divProsecnaOcena);

        let divGodinaIzdanja = document.createElement("div");
        divGodinaIzdanja.className = "DivGodinaIzdanja";
        divGodinaIzdanja.innerHTML = this.godina_izdavanja;
        this.kontejner.appendChild(divGodinaIzdanja);
    }
    prikaziKnjigu(host, prikaz){
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
        divNaziv.innerHTML ="Naziv knjige: "+ this.naziv;
        divInfo.appendChild(divNaziv);

        let divAutor = document.createElement("div");
        divAutor.className = "DivAutor";
        divAutor.innerHTML ="Autor: "+ this.autor;
        divInfo.appendChild(divAutor);


        let divProsecnaOcena = document.createElement("div");
        divProsecnaOcena.className = "DivProsecnaOcena";
        divProsecnaOcena.innerHTML ="Prosecna ocena: "+ this.prosecna_ocena+ "/10";
        divInfo.appendChild(divProsecnaOcena);

        let divGodinaIzdanja = document.createElement("div");
        divGodinaIzdanja.className = "DivGodinaIzdanja";
        divGodinaIzdanja.innerHTML ="Godina izlaska: "+ this.godina_izdavanja;
        divInfo.appendChild(divGodinaIzdanja);


        let divOpis = document.createElement("div");
        divOpis.className = "divOpis";
        divOpis.innerHTML ="Kratak opis: "+ this.kratak_opis;
        divInfo.appendChild(divOpis);

        let btnIzmeniKnjigu = document.createElement("button");
        btnIzmeniKnjigu.className = "btnIzmeniKnjigu";
        btnIzmeniKnjigu.innerHTML = "Izmeni knjigu";
        btnIzmeniKnjigu.onclick = (ev) => this.izmeniKnjigu(divForme,host,  prikaz);
        divForme.appendChild(btnIzmeniKnjigu);


        let btnObrisiKnjigu = document.createElement("button");
        btnObrisiKnjigu.className = "btnObrisiKnjigu";
        btnObrisiKnjigu.innerHTML = "Obrisi knjigu";
        btnObrisiKnjigu.onclick = (ev) => this.obrisiKnjigu(divForme,host,  prikaz);
        divForme.appendChild(btnObrisiKnjigu);

        let btnOceniKnjigu = document.createElement("button");
        btnOceniKnjigu.className = "btnOceniKnjigu";
        btnOceniKnjigu.innerHTML = "Oceni knjigu";
        btnOceniKnjigu.onclick = (ev) => this.oceniKnjigu(divForme,host,  prikaz);
        divForme.appendChild(btnOceniKnjigu);

          
        let btnKomentrisiKnjigu = document.createElement("button");
        btnKomentrisiKnjigu.className = "btnKomentrisiKnjigu";
        btnKomentrisiKnjigu.innerHTML = "Komentarisi knjigu";
        btnKomentrisiKnjigu.onclick = (ev) => this.komentarisiKnjigu(divForme,host,  prikaz);
        divForme.appendChild(btnKomentrisiKnjigu);

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
    izmeniKnjigu(divForme,host,  prikaz){
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
        let btnIzmeniKnjigu = document.createElement("button");
        btnIzmeniKnjigu.className = "btnIzmeniKnjigu";
        btnIzmeniKnjigu.innerHTML = "Izmeni";
        btnIzmeniKnjigu.onclick = (ev) => this.izmeni(inputNaziv.value,host,  prikaz);
        divForme.appendChild(btnIzmeniKnjigu);
    }
    oceniKnjigu(divForme,host,  prikaz){
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
        btnOceni.innerHTML = "Oceni knjigu";
        btnOceni.onclick = (ev) => this.oceni(inputOceni.value, inputEmail.value ,host,  prikaz);
        divForme.appendChild(btnOceni);
    }
    komentarisiKnjigu(divForme,host,  prikaz){
        
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
        btnKomentrisi.innerHTML = "Komentarisi knjigu";
        btnKomentrisi.onclick = (ev) => this.komentarisi(inputKomentarisi.value, inputEmail.value ,host,  prikaz);
        divForme.appendChild(btnKomentrisi);
    }
    izmeni(naziv,host,  prikaz){
        console.log(naziv);

        fetch("https://localhost:44389/Knjiga/IzmeniKnjigu/"+this.id + "/"+naziv,
        {
           method:"PUT"
        }).then(s=>{
            if(s.ok){
                s.json().then(k=>{
                    console.log(k);
                    this.naziv =k.naziv;
                    alert("Knjiga je izmenjena!");
                    //this.crtajFilm(host,prikaz);
                })
            }
        })
    }
    obrisiKnjigu(divForme,host,  prikaz){
        fetch("https://localhost:44389/Knjiga/ObrisiKnjigu/"+this.id,
        {
           method:"DELETE"
        }).then(s=>{
            if(s.ok){
               
                alert("Knjiga je obrisana!");
                
            }
        })
    }
    oceni(ocena,email, host,  prikaz){
        let o = new Ocena(ocena);
        fetch("https://localhost:44389/Knjiga/DodajOcenu/"+email+"/"+this.id,
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
                   
                    alert("Knjiga je ocenjena!");
                    //this.crtajFilm(host,prikaz);
                })
            }
        })
    }
    komentarisi(komentar,email){
        let k = new Komentar(komentar);
        fetch("https://localhost:44389/Knjiga/DodajKomentar/"+email+"/"+this.id,
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