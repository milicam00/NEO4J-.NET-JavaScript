import { Film } from "./Film.js";
import { Knjiga } from "./Knjiga.js";
import { Serija } from "./Serija.js";
import { Sezona } from "./Sezona.js";
import {Korisnik} from "./Korisnik.js"
import { Komentar } from "./Komentar.js";

export class Filmovizija{
    
    constructor(listaFilmova){
        this.listaFilmova = listaFilmova;
        this.listaSerija = [];
        this.listaKnjiga = [];
        this.listaKorisnika=[];
        this.kontejner= null;
    }
    crtajFilmove(host){
        //console.log(this.listaFilmova);
        console.log("CRTAJ")
        this.kontejner=document.createElement("div");
        this.kontejner.className="GlavniDiv";
        host.appendChild(this.kontejner);
        
        let menuDiv=document.createElement("div");
        menuDiv.className="MenuDiv";
        this.kontejner.appendChild(menuDiv);
        
        let prikazDiv=document.createElement("div");
        prikazDiv.className="PrikazDiv";
        this.kontejner.appendChild(prikazDiv);

        this.iscrtajFilmove()
         //crtanje navbara
         let navDiv=document.createElement("nav");
         navDiv.className="nav";
         menuDiv.appendChild(navDiv);
 
         let divKon=document.createElement("div");
         divKon.className="container";
         navDiv.appendChild(divKon);
 
         let divLogo=document.createElement("div");
         divLogo.className="logo";
       
         divKon.appendChild(divLogo);
 
         let diva=document.createElement("a");
         diva.innerText="FILMOVIZIJA";
         divLogo.appendChild(diva);
 
         let divLista=document.createElement("div");
         divLista.className="main_list";
         divLista.id="mainListDiv"
         divKon.appendChild(divLista);
 
         let ul=document.createElement("ul");
         divLista.appendChild(ul);
 
         let li=document.createElement("li");
         li.className="li"
         ul.appendChild(li);
 
         let div1=document.createElement("a");
         div1.href="#";
         div1.onclick=(ev)=>this.iscrtajFilmove();
         div1.innerText="FILMOVI";
         li.appendChild(div1)
 
     ////d

     
     
     let li1=document.createElement("li");
     li1.className="li"
     ul.appendChild(li1);
     
     let div2=document.createElement("a");
     div2.href="#";
     div2.innerText="SERIJE";
     div2.onclick=(ev)=>this.iscrtajSerije();
     li1.appendChild(div2)
     
     
     let li3=document.createElement("li");
     li3.className="li"
     ul.appendChild(li3);
     
     let div3=document.createElement("a");
     div3.innerText="KNJIGE";
     div3.href="#";
     div3.onclick=(ev)=>this.iscrtajKnjige();
     li3.appendChild(div3)
     
     let li4=document.createElement("li");
     li4.className="li"
     ul.appendChild(li4);
     
     let div4=document.createElement("a");
     div4.innerText="NAJNOVIJE";
     div4.onclick=(ev)=>this.iscrtajNajnovije();
     div4.href="#";
     li4.appendChild(div4)
     
     let li5=document.createElement("li");
     li5.className="li"
     ul.appendChild(li5);
     let divButtonPretrazi = document.createElement("a")
     divButtonPretrazi.innerHTML = "PRETRAZI";
     divButtonPretrazi.href="#";
     divButtonPretrazi.onclick=(ev)=>this.pretrazi();
     li5.appendChild(divButtonPretrazi);
     
     
     let li6=document.createElement("li");
     li6.className="li"
     ul.appendChild(li6);
     let zanrovi = []
     this.listaFilmova.forEach(f=>{
         if(!zanrovi.includes(f.zanr))
         zanrovi.push(f.zanr)
        })
        
        let selectFilm=document.createElement("select");
        selectFilm.className="selectFilm";
        li6.appendChild(selectFilm);
        zanrovi.forEach(x=>{
            let op=document.createElement("option");
            op.className="op";
            op.value=x;
            op.innerHTML=x;
            selectFilm.appendChild(op);
        })
        selectFilm.onchange= (ev)=>this.prikaziFilmovePoZanru(selectFilm.options[selectFilm.selectedIndex].value);
        
        
        let li7=document.createElement("li");
        li7.className="li"
        ul.appendChild(li7);
        let godineIzdanja = []
        this.listaFilmova.forEach(f=>{
            if(!godineIzdanja.includes(f.godinaIzdanja))
            godineIzdanja.push(f.godinaIzdanja)
           })
           
           let selectGodinaIzdanja=document.createElement("select");
           selectGodinaIzdanja.className="selectGodinaIzdanja";
           li7.appendChild(selectGodinaIzdanja);
           godineIzdanja.forEach(x=>{
               let op=document.createElement("option");
               op.className="op";
               op.value=x;
               op.innerHTML=x;
               selectGodinaIzdanja.appendChild(op);
           })
           selectGodinaIzdanja.onchange= (ev)=>this.prikaziPoGodiniIzdanja(selectGodinaIzdanja.options[selectGodinaIzdanja.selectedIndex].value);
           
        let li8=document.createElement("li");
        li8.className="li"
        ul.appendChild(li8);
   
        let divKorisnik = document.createElement("a")
        divKorisnik.innerHTML = "KORISNIK";
        divKorisnik.href="#";
        divKorisnik.onclick=(ev)=>this.iscrtajKorisnike();
        //divKorisnik.onclick=(ev)=>this.pretrazi();
        li8.appendChild(divKorisnik);
     
           
        //  let divv=document.createElement("div");
        //  divv.className="media_button";
        //  divKon.appendChild(divv);
 
        //  let button=document.createElement("button");
        //  button.className="main_media_button";
        //  button.id="mediaButton";
        //  divv.appendChild(button)
 
        //  let span1=document.createElement("span")
        //  span1.className="span";
        //  button.appendChild(span1)   
         
        //  let span2=document.createElement("span")
        //  span2.className="span";
        //  button.appendChild(span2) 
 
        //  let span3=document.createElement("span")
        //  span3.className="span";
        //  button.appendChild(span3) 
 
         let section=document.createElement("section");
         section.className="home"
         menuDiv.appendChild(section)
       /*  
        
         var mainListDiv = document.getElementById("mainListDiv"),
         mediaButton = document.getElementById("mediaButton");
     
         mediaButton.onclick = function () {
         
         "use strict";
         
         mainListDiv.classList.toggle("show_list");
         mediaButton.classList.toggle("active");
         
     };
         */



        //this.iscrtajFilmove(prikazDiv)
        //this.iscrtajSerije(prikazDiv)
        //this.iscrtajKnjige(prikazDiv)
    }
    preuzmiKomentareFilma(idFilma){
        let listaKomentara = []
        fetch("https://localhost:44389/Film/PreuzmiSveKomentareZaDatiFilm/" + idFilma,
        {
            method:"GET"
        }).then(data=>{
            data.json().then(komentari=>{
                komentari.forEach(k=>{
                    let komentar = new Komentar(k.id, k.sadrzaj, k.korisnik)
                    listaKomentara.push(komentar)
                })
                this.listaFilmova.forEach(f=>{
                    if(f.id == idFilma){
                        f.komentari = listaKomentara;
                    }
                })
                console.log(this.listaFilmova)
            })
        })
    }
    obrisiPrethodniPrikaz(host){
        var roditelj = host.parentNode;
        roditelj.removeChild(host);

        host = document.createElement("div");
        host.className = "PrikazDiv";
        roditelj.appendChild(host);
    }
    iscrtajNajnovije(){
          var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazNajnovijih=document.createElement("div");
        divZaPrikazNajnovijih.className="DivZaPrikazNajnovijih";
        prikaz.appendChild(divZaPrikazNajnovijih);


        var listaFilmovi = [];
        var listaSerije = [];
        var listaKnjige = [];

        fetch("https://localhost:44389/Film/PreuzmiNajnovije",
        {
            method:"GET"
        }).then(data=>{
            data.json().then(info=>{
                console.log(info)
                info.filmovi.forEach(f=>{
                    console.log("OVDE JE NAJNOVIJE")
                    console.log(f)
                    let film = new Film(f.id, f.naziv, f.reziser, f.zanr, f.glumci, f.godinaIzdanja, f.prosecnaOcena, f.kratakOpis, f.cena, f.korisnici, f.slika, f.triler);
                    console.log(film)
                    listaFilmovi.push(film);
                })
                info.serije.forEach(x=>{
                    console.log(x)
                    let serija=new Serija(x.id,x.naziv,x.reziser,x.glumci,x.prosecnaOcena,x.kratakOpis,x.cena,x.slika,x.triler,x.korisnici);
                    x.sezone.forEach(s=>{
                        let sezona = new Sezona(s.id, s.naziv, s.epizode, s.prosecnaOcena, s.godinaIzdavanja, s.serija);
                        serija.sezone.push(sezona);
                    })
                    listaSerije.push(serija);
                    
                })
                info.knjiga.forEach(x=>{
                  
                    let knjiga=new Knjiga(x.id,x.naziv,x.autor,x.godina_izdavanja,x.kratak_opis,x.izdavac,x.zanr,x.broj_strana,x.povez,x.prosecna_ocena,x.cena,x.jezik,x.slika,x.korisnici);
                    //console.log(knjiga)
                    listaKnjige.push(knjiga)
                } )
                listaFilmovi.forEach(film=>{
                    let divHover=document.createElement("div");
                    divHover.className="DivHover";
                    divZaPrikazNajnovijih.appendChild(divHover);
                    film.crtajFilm(divHover, prikaz)
                })
                listaSerije.forEach(s=>{
                    let divHover=document.createElement("div");
                    divHover.className="DivHover";
                    divZaPrikazNajnovijih.appendChild(divHover);
                     s.iscrtajSeriju(divHover, prikaz); 
            })
            listaKnjige.forEach(k=>{
                let divHover=document.createElement("div");
                divHover.className="DivHover";
                divZaPrikazNajnovijih.appendChild(divHover);
                k.crtajKnjigu(divHover, prikaz)
            })
                
            })
        })
    }
    iscrtajFilmove(){

        //this.obrisiPrethodniPrikaz(host);
        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divDodajFilm = document.createElement("div");
        divDodajFilm.className = "DivDodajFilm";
        prikaz.appendChild(divDodajFilm);
        let btnDodajFilm = document.createElement("button");
        btnDodajFilm.className = "BtnDodajFilm";
        btnDodajFilm.innerHTML = "Dodaj film";
        btnDodajFilm.onclick = (ev) => this.dodajFilm();
        divDodajFilm.appendChild(btnDodajFilm);

        let divZaPrikazFilmova=document.createElement("div");
        divZaPrikazFilmova.className="DivZaPrikazFilmova";
        prikaz.appendChild(divZaPrikazFilmova);

        this.listaFilmova.forEach(film=>{

            let divHover=document.createElement("div");
            divHover.className="DivHover";
            divZaPrikazFilmova.appendChild(divHover);
            console.log(film)
            film.crtajFilm(divHover, prikaz)
        })
    }

    iscrtajSerije(){

        //this.obrisiPrethodniPrikaz(host);
        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divDodajSeriju = document.createElement("div");
        divDodajSeriju.className = "DivDodajSeriju";
        prikaz.appendChild(divDodajSeriju);
        let btnDodajSeriju = document.createElement("button");
        btnDodajSeriju.className = "BtnDodajSeriju";
        btnDodajSeriju.innerHTML = "Dodaj seriju";
        btnDodajSeriju.onclick = (ev) => this.dodajSeriju();
        divDodajSeriju.appendChild(btnDodajSeriju);

        let divZaPrikazSerija=document.createElement("div");
        divZaPrikazSerija.className="DivZaPrikazSerija";
        prikaz.appendChild(divZaPrikazSerija);


        fetch("https://localhost:44389/Serija/PreuzmiSerije",
        {
            method:"GET"
        }).then(data=>{
            data.json().then(info=>{
                info.forEach(x=>{
                    console.log(x)
                    let serija=new Serija(x.id,x.naziv,x.reziser,x.glumci,x.prosecnaOcena,x.kratakOpis,x.cena,x.slika,x.triler,x.korisnici);
                    x.sezone.forEach(s=>{
                        let sezona = new Sezona(s.id, s.naziv, s.epizode, s.prosecnaOcena, s.godinaIzdavanja, s.serija);
                        serija.sezone.push(sezona);
                    })
                    x.komentari.forEach(k=>{
                        let komentar = new Komentar(k.sadrzaj)
                        serija.komentari.push(komentar)
                    })
                    this.listaSerija.push(serija);

            })
            console.log(this.listaSerija);
            this.listaSerija.forEach(s=>{
                let divHover=document.createElement("div");
                divHover.className="DivHover";
                divZaPrikazSerija.appendChild(divHover);
                s.iscrtajSeriju(divHover, prikaz); 
            })
            })
        })
    }
    iscrtajKnjige(){

        //this.obrisiPrethodniPrikaz(host);
        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divDodajKnjigu = document.createElement("div");
        divDodajKnjigu.className = "DivDodajKnjigu";
        prikaz.appendChild(divDodajKnjigu);
        let btnDodajKnjigu = document.createElement("button");
        btnDodajKnjigu.className = "BtnDodajKnjigu";
        btnDodajKnjigu.innerHTML = "Dodaj knjigu";
        btnDodajKnjigu.onclick = (ev) => this.dodajKnjigu();
        divDodajKnjigu.appendChild(btnDodajKnjigu);
        
        let divZaPrikazKnjiga=document.createElement("div");
        divZaPrikazKnjiga.className="DivZaPrikazKnjiga";
        prikaz.appendChild(divZaPrikazKnjiga);

        fetch("https://localhost:44389/Knjiga/VratiSveKnjige",
        {
            method:"GET"
        }).then(data=>{
        data.json().then(knjige=>{
            console.log(knjige)
            knjige.forEach(x=>{

                let knjiga=new Knjiga(x.id,x.naziv,x.autor,x.godina_izdavanja,x.kratak_opis,x.izdavac,x.zanr,x.broj_strana,x.povez,x.prosecna_ocena,x.cena,x.jezik,x.slika,x.korisnici);
                //console.log(knjiga)
                x.komentari.forEach(k=>{
                    let komentar = new Komentar(k.sadrzaj)
                    knjiga.komentari.push(komentar)
                })
                this.listaKnjiga.push(knjiga)
            } )
            console.log(this.listaKnjiga)
            this.listaKnjiga.forEach(k=>{

                let divHover=document.createElement("div");
                divHover.className="DivHover";
                divZaPrikazKnjiga.appendChild(divHover);
                k.crtajKnjigu(divHover, prikaz)
            })
        })
        })
    }
    prikaziFilmovePoZanru(zanr){

        console.log(zanr)

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazFilmovaPoZanru=document.createElement("div");
        divZaPrikazFilmovaPoZanru.className="DivZaPrikazFilmovaPoZanru";
        prikaz.appendChild(divZaPrikazFilmovaPoZanru);


        let filmoviPoZanru = [];

        fetch("https://localhost:44389/Film/PreuzmiFilmovePoZanru/"+zanr,
        {
            method:"GET"
        }).then(data=>{
            data.json().then(filmovi=>{
                filmovi.forEach(f=>{
                    let film = new Film(f.id, f.naziv, f.reziser, f.zanr, f.glumci, f.godinaIzdanja, f.prosecnaOcena, f.kratakOpis, f.cena, f.korisnici, f.slika, f.triler);
                    filmoviPoZanru.push(film);
                })
                filmoviPoZanru.forEach(film=>{
                    film.crtajFilm(divZaPrikazFilmovaPoZanru, prikaz)
                })

            })
        })
    }
    prikaziPoGodiniIzdanja(godina){
        console.log(godina)

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazPoGodiniIzdanja=document.createElement("div");
        divZaPrikazPoGodiniIzdanja.className="DivZaPrikazPoGodiniIzdanja";
        prikaz.appendChild(divZaPrikazPoGodiniIzdanja);

        let filmoviPoGodiniIzdanja = [];
        let serijePoGodiniIzdanja = [];

        fetch("https://localhost:44389/Serija/PreuzmiSerijeIFilmovePoGodiniIzdavanja/"+godina,
        {
            method:"GET"
        }).then(data=>{
            data.json().then(info=>{
                //info.forEach()
                console.log(info)
                info.filmovi.forEach(f=>{
                    let film = new Film(f.id, f.naziv, f.reziser, f.zanr, f.glumci, f.godinaIzdanja, f.prosecnaOcena, f.kratakOpis, f.cena, f.korisnici, f.slika, f.triler);
                    filmoviPoGodiniIzdanja.push(film);
                })

                info.vratiSerije.forEach(x=>{
                    console.log(x)
                    
                    let serija=new Serija(x.id,x.naziv,x.reziser,x.glumci,x.prosecnaOcena,x.kratakOpis,x.cena,x.slika,x.triler,x.korisnici);
                    x.sezone.forEach(s=>{
                        let sezona = new Sezona(s.id, s.naziv, s.epizode, s.prosecnaOcena, s.godinaIzdavanja, s.serija);
                        serija.sezone.push(sezona);
                    })
                    serijePoGodiniIzdanja.push(serija);

                })

                filmoviPoGodiniIzdanja.forEach(film=>{
                    film.crtajFilm(divZaPrikazPoGodiniIzdanja, prikaz)
                })
                serijePoGodiniIzdanja.forEach(s=>{
                    s.iscrtajSeriju(divZaPrikazPoGodiniIzdanja, prikaz); 
                })
            })
        })
    }
    pretrazi(){
        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        // let divPretrazi=document.createElement("div");
        // divZaPretrazi.className="DivPretrazi";
        // prikaz.appendChild(divPretrazi);

        let divPretraziFilmove=document.createElement("div");
        divPretraziFilmove.className="DivPretraziFilmove";
        prikaz.appendChild(divPretraziFilmove);

        let divPretraziSerije=document.createElement("div");
        divPretraziSerije.className="DivPretraziSerije";
        prikaz.appendChild(divPretraziSerije);

        let divPretraziKnjige=document.createElement("div");
        divPretraziKnjige.className="DivPretraziKnjige";
        prikaz.appendChild(divPretraziKnjige);

        let divPretraziKorisnike=document.createElement("div");
        divPretraziKorisnike.className="divPretraziKorisnike";
        prikaz.appendChild(divPretraziKorisnike);


        let divPtretraziFilmPoNazivu = document.createElement("div");
        divPtretraziFilmPoNazivu.className = "DivPtretraziFilmPoNazivu";
        divPretraziFilmove.appendChild(divPtretraziFilmPoNazivu);
        let input1 = document.createElement("input");
        input1.className = "InputPretraziFilmPoNazivu";
        divPtretraziFilmPoNazivu.appendChild(input1);
        let button1 = document.createElement("button");
        button1.className = "ButtonPretraziFilmPoNazivu";
        button1.innerHTML = "Pretrazi film po nazivu";
        button1.onclick = (ev) => this.pretraziFilmPoNazivu(input1.value);
        divPtretraziFilmPoNazivu.appendChild(button1);


        let divPtretraziFilmPoReziseru = document.createElement("div");
        divPtretraziFilmPoReziseru.className = "DivPtretraziFilmPoReziseru";
        divPretraziFilmove.appendChild(divPtretraziFilmPoReziseru);
        let input2 = document.createElement("input");
        input2.className = "InputPretraziFilmPoReziseru";
        divPtretraziFilmPoReziseru.appendChild(input2);
        let button2 = document.createElement("button");
        button2.className = "ButtonPretraziFilmPoNazivu";
        button2.innerHTML = "Pretrazi film po reziseru";
        button2.onclick = (ev) => this.pretraziFilmPoReziseru(input2.value);
        divPtretraziFilmPoReziseru.appendChild(button2);

        let divPtretraziFilmPoCeni = document.createElement("div");
        divPtretraziFilmPoCeni.className = "DivPtretraziFilmPoCeni";
        divPretraziFilmove.appendChild(divPtretraziFilmPoCeni);
        let input3 = document.createElement("input");
        input3.className = "InputPretraziFilmPoCeniOd";
        divPtretraziFilmPoCeni.appendChild(input3);
        let inputDo = document.createElement("input");
        inputDo.className = "InputPretraziFilmPoCeniDo";
        divPtretraziFilmPoCeni.appendChild(inputDo);
        let button3 = document.createElement("button");
        button3.className = "ButtonPretraziFilmPoCeni";
        button3.innerHTML = "Pretrazi film po ceni";
        button3.onclick = (ev) => this.pretraziFilmPoCeni(input3.value, inputDo.value);
        divPtretraziFilmPoCeni.appendChild(button3);

        let divPtretraziFilmPoProsecnojOceni = document.createElement("div");
        divPtretraziFilmPoProsecnojOceni.className = "DivPtretraziFilmPoProsecnojOceni";
        divPretraziFilmove.appendChild(divPtretraziFilmPoProsecnojOceni);
        let input4 = document.createElement("input");
        input4.className = "InputPretraziFilmPoProsecnojOceni";
        divPtretraziFilmPoProsecnojOceni.appendChild(input4);
        let button4 = document.createElement("button");
        button4.className = "ButtonPretraziFilmPoProsecnojOceni";
        button4.innerHTML = "Pretrazi film po prosecnoj oceni";
        button4.onclick = (ev) => this.pretraziFilmPoProsecnojOceni(input4.value);
        divPtretraziFilmPoProsecnojOceni.appendChild(button4);

        // let divPtretraziSveFilmoveISerijeZaDatogRezisera = document.createElement("div");
        // divPtretraziSveFilmoveISerijeZaDatogRezisera.className = "DivPtretraziSveFilmoveISerijeZaDatogRezisera";
        // divPretraziFilmove.appendChild(divPtretraziSveFilmoveISerijeZaDatogRezisera);
        // let input5 = document.createElement("input");
        // input5.className = "InputPretraziSveFilmoveISerijeZaDatogRezisera";
        // divPtretraziSveFilmoveISerijeZaDatogRezisera.appendChild(input5);
        // let button5 = document.createElement("button");
        // button5.className = "ButtonPretraziSveFilmoveISerijeZaDatogRezisera";
        // button5.innerHTML = "Pretrazi sve filmove i serije za datog rezisera";
        // button5.onclick = (ev) => this.pretraziSveFilmoveISerijeZaDatogRezisera(input5.value);
        // divPtretraziSveFilmoveISerijeZaDatogRezisera.appendChild(button5);


        let divPretraziSerijuPoNazivu = document.createElement("div");
        divPretraziSerijuPoNazivu.className = "DivPretraziSerijuPoNazivu";
        divPretraziSerije.appendChild(divPretraziSerijuPoNazivu);
        let input7 = document.createElement("input");
        input7.className = "InputPretraziSerijuPoNazivu";
        divPretraziSerijuPoNazivu.appendChild(input7);
        let button7 = document.createElement("button");
        button7.className = "ButtonPretraziSerijuPoNazivu";
        button7.innerHTML = "Pretrazi seriju po nazivu";
        button7.onclick = (ev) => this.pretraziSerijuPoNazivu(input7.value);
        divPretraziSerijuPoNazivu.appendChild(button7);

        let divPretraziSerijeIstogRezisera = document.createElement("div");
        divPretraziSerijeIstogRezisera.className = "DivPretraziSerijeIstogRezisera";
        divPretraziSerije.appendChild(divPretraziSerijeIstogRezisera);
        let input8 = document.createElement("input");
        input8.className = "InputPretraziSerijuPoReziseru";
        divPretraziSerijeIstogRezisera.appendChild(input8);
        let button8 = document.createElement("button");
        button8.className = "ButtonPretraziSerijuPoReziseru";
        button8.innerHTML = "Pretrazi seriju po reziseru";
        button8.onclick = (ev) => this.pretraziSerijuPoReziseru(input8.value);
        divPretraziSerijeIstogRezisera.appendChild(button8);

        let divPtretraziSerijuPoCeni = document.createElement("div");
        divPtretraziSerijuPoCeni.className = "DivPtretraziSerijuPoCeni";
        divPretraziSerije.appendChild(divPtretraziSerijuPoCeni);
        let input9 = document.createElement("input");
        input9.className = "InputPretraziSerijuPoCeniOd";
        divPtretraziSerijuPoCeni.appendChild(input9);
        let inputDo1 = document.createElement("input");
        inputDo1.className = "InputPretraziSerijuPoCeniDo";
        divPtretraziSerijuPoCeni.appendChild(inputDo1);
        let button9 = document.createElement("button");
        button9.className = "ButtonPretraziSerijuPoCeni";
        button9.innerHTML = "Pretrazi seriju po ceni";
        button9.onclick = (ev) => this.pretraziSerijuPoCeni(input9.value, inputDo1.value);
        divPtretraziSerijuPoCeni.appendChild(button9);

        let divPretraziGlumceUSeriji = document.createElement("div");
        divPretraziGlumceUSeriji.className = "DivPretraziGlumceUSeriji";
        divPretraziSerije.appendChild(divPretraziGlumceUSeriji);
        let input10 = document.createElement("input");
        input10.className = "InputPretraziGlumceUSeriji";
        divPretraziGlumceUSeriji.appendChild(input10);
        let button10 = document.createElement("button");
        button10.className = "ButtonPretraziGlumceUSeriji";
        button10.innerHTML = "Pretrazi glumce u seriji";
        button10.onclick = (ev) => this.pretraziGlumceUSeriji(input10.value);
        divPretraziGlumceUSeriji.appendChild(button10);

        let divPretraziSveEpizodeSerije = document.createElement("div");
        divPretraziSveEpizodeSerije.className = "DivPretraziSveEpizodeSerije";
        divPretraziSerije.appendChild(divPretraziSveEpizodeSerije);
        let inputEpizode = document.createElement("input");
        inputEpizode.className = "InputPretraziSveEpizodeSerije";
        inputEpizode.placeholder = "Naziv serije";
        divPretraziSveEpizodeSerije.appendChild(inputEpizode);
        let buttonEpizode = document.createElement("button");
        buttonEpizode.className = "ButtonPretraziSveEpizodeSerije";
        buttonEpizode.innerHTML = "Pretrazi sve epizode u seriji";
        buttonEpizode.onclick = (ev) => this.pretraziSveEpizodeUSeriji(inputEpizode.value);
        divPretraziSveEpizodeSerije.appendChild(buttonEpizode);

        let divPretraziKnjiguPoAutoruINazivu = document.createElement("div");
        divPretraziKnjiguPoAutoruINazivu.className = "DivPretraziKnjiguPoAutoruINazivu";
        divPretraziKnjige.appendChild(divPretraziKnjiguPoAutoruINazivu);
        let input11Autor = document.createElement("input");
        input11Autor.placeholder = "Autor";
        input11Autor.className = "InputPretraziKnjiguPoAutoru";
        divPretraziKnjiguPoAutoruINazivu.appendChild(input11Autor);
        let input11Naziv = document.createElement("input");
        input11Naziv.className = "InputPretraziKnjiguPoNazivu";
        input11Naziv.placeholder = "Naziv";
        divPretraziKnjiguPoAutoruINazivu.appendChild(input11Naziv);
        let button11 = document.createElement("button");
        button11.className = "ButtonPretraziKnjiguPoAutoruINazivu";
        button11.innerHTML = "Pretrazi knjigu po autoru i nazivu";
        button11.onclick = (ev) => this.pretraziKnjiguPoAutoruINazivu(input11Autor.value, input11Naziv.value);
        divPretraziKnjiguPoAutoruINazivu.appendChild(button11);

        let divPretraziKnjiguPoPovezu = document.createElement("div");
        divPretraziKnjiguPoPovezu.className = "DivPretraziKnjiguPoPovezu";
        divPretraziKnjige.appendChild(divPretraziKnjiguPoPovezu);
        let input12 = document.createElement("input");
        input12.className = "InputPretraziKnjiguPoPovezu";
        divPretraziKnjiguPoPovezu.appendChild(input12);
        let button12 = document.createElement("button");
        button12.className = "ButtonPretraziKnjiguPoPovezu";
        button12.innerHTML = "Pretrazi knjigu po povezu";
        button12.onclick = (ev) => this.pretraziKnjiguPoPovezu(input12.value);
        divPretraziKnjiguPoPovezu.appendChild(button12);

        let divPretraziKnjiguPoJeziku = document.createElement("div");
        divPretraziKnjiguPoJeziku.className = "DivPretraziKnjiguPoJeziku";
        divPretraziKnjige.appendChild(divPretraziKnjiguPoJeziku);
        let input13 = document.createElement("input");
        input13.className = "InputPretraziKnjiguPoJeziku";
        divPretraziKnjiguPoJeziku.appendChild(input13);
        let button13 = document.createElement("button");
        button13.className = "ButtonPretraziKnjiguPoJeziku";
        button13.innerHTML = "Pretrazi knjigu po jeziku";
        button13.onclick = (ev) => this.pretraziKnjiguPoJeziku(input13.value);
        divPretraziKnjiguPoJeziku.appendChild(button13);

        let divPretraziKnjiguPoIzdavacu = document.createElement("div");
        divPretraziKnjiguPoIzdavacu.className = "DivPretraziKnjiguPoIzdavacu";
        divPretraziKnjige.appendChild(divPretraziKnjiguPoIzdavacu);
        let input14 = document.createElement("input");
        input14.className = "InputPretraziKnjiguPoIzdavacu";
        divPretraziKnjiguPoIzdavacu.appendChild(input14);
        let button14 = document.createElement("button");
        button14.className = "ButtonPretraziKnjiguPoIzdavacu";
        button14.innerHTML = "Pretrazi knjigu po izdavacu";
        button14.onclick = (ev) => this.pretraziKnjiguPoIzdavacu(input14.value);
        divPretraziKnjiguPoIzdavacu.appendChild(button14);

        let divPretraziKnjiguPoNazivu = document.createElement("div");
        divPretraziKnjiguPoNazivu.className = "DivPretraziKnjiguPoNazivu";
        divPretraziKnjige.appendChild(divPretraziKnjiguPoNazivu);
        let input15 = document.createElement("input");
        input15.className = "InputPretraziKnjiguPoNazivu";
        divPretraziKnjiguPoNazivu.appendChild(input15);
        let button15 = document.createElement("button");
        button15.className = "ButtonPretraziKnjiguPoNazivu";
        button15.innerHTML = "Pretrazi knjigu po nazivu";
        button15.onclick = (ev) => this.pretraziKnjiguPoNazivu(input15.value);
        divPretraziKnjiguPoNazivu.appendChild(button15);

        let divPretraziKnjiguPoGodini = document.createElement("div");
        divPretraziKnjiguPoGodini.className = "DivPretraziKnjiguPoGodini";
        divPretraziKnjige.appendChild(divPretraziKnjiguPoGodini);
        let input16 = document.createElement("input");
        input16.className = "InputPretraziKnjiguPoGodini";
        divPretraziKnjiguPoGodini.appendChild(input16);
        let button16 = document.createElement("button");
        button16.className = "ButtonPretraziKnjiguPoGodini";
        button16.innerHTML = "Pretrazi knjigu po godini";
        button16.onclick = (ev) => this.pretraziKnjiguPoGodini(input16.value);
        divPretraziKnjiguPoGodini.appendChild(button16);

        let divPretraziKnjigePoPiscu = document.createElement("div");
        divPretraziKnjigePoPiscu.className = "DivPretraziKnjigePoPiscu";
        divPretraziKnjige.appendChild(divPretraziKnjigePoPiscu);
        let input17 = document.createElement("input");
        input17.className = "InputPretraziKnjigePoPiscu";
        divPretraziKnjigePoPiscu.appendChild(input17);
        let button17 = document.createElement("button");
        button17.className = "ButtonPretraziKnjigePoPiscu";
        button17.innerHTML = "Pretrazi knjige po piscu";
        button17.onclick = (ev) => this.pretraziKnjigePoPiscu(input17.value);
        divPretraziKnjigePoPiscu.appendChild(button17);

        let divPretraziKnjigePoCeni = document.createElement("div");
        divPretraziKnjigePoCeni.className = "DivPretraziKnjigePoCeni";
        divPretraziKnjige.appendChild(divPretraziKnjigePoCeni);
        let input18CenaOd = document.createElement("input");
        input18CenaOd.className = "InputPretraziKnjigePoCeniOd";
        divPretraziKnjigePoCeni.appendChild(input18CenaOd);
        let input18CenaDo = document.createElement("input");
        input18CenaDo.className = "InputPretraziKnjigePoCeniDo";
        divPretraziKnjigePoCeni.appendChild(input18CenaDo);
        let button18 = document.createElement("button");
        button18.className = "ButtonPretraziKnjigePoCeni";
        button18.innerHTML = "Pretrazi knjige po ceni";
        button18.onclick = (ev) => this.pretraziKnjigePoCeni(input18CenaOd.value,input18CenaDo.value);
        divPretraziKnjigePoCeni.appendChild(button18);

        let divPretraziKnjigePoZanru = document.createElement("div");
        divPretraziKnjigePoZanru.className = "DivPretraziKnjigePoZanru";
        divPretraziKnjige.appendChild(divPretraziKnjigePoZanru);
        let input19= document.createElement("input");
        input19.className = "InputPretraziKnjigePoZanru";
        divPretraziKnjigePoZanru.appendChild(input19);
        let button19 = document.createElement("button");
        button19.className = "ButtonPretraziKnjigePoZanru";
        button19.innerHTML = "Pretrazi knjige po zanru";
        button19.onclick = (ev) => this.pretraziKnjigePoZanru(input19.value);
        divPretraziKnjigePoZanru.appendChild(button19);

        let divPretraziKnjigePoProsecnojOceni = document.createElement("div");
        divPretraziKnjigePoProsecnojOceni.className = "DivPretraziKnjigePoProsecnojOceni";
        divPretraziKnjige.appendChild(divPretraziKnjigePoProsecnojOceni);
        let input20= document.createElement("input");
        input20.className = "InputPretraziKnjigePoProsecnojOceni";
        divPretraziKnjigePoProsecnojOceni.appendChild(input20);
        let button20 = document.createElement("button");
        button20.className = "ButtonPretraziKnjigePoProsecnojOceni";
        button20.innerHTML = "Pretrazi knjige po prosecnoj oceni";
        button20.onclick = (ev) => this.pretraziKnjigePoProsecnojOceni(input20.value);
        divPretraziKnjigePoProsecnojOceni.appendChild(button20);

        let divPretraziFilmNaOsnovuKnjige = document.createElement("div");
        divPretraziFilmNaOsnovuKnjige.className = "DivPretraziFilmNaOsnovuKnjige";
        divPretraziKnjige.appendChild(divPretraziFilmNaOsnovuKnjige);
        let input21= document.createElement("input");
        input21.className = "InputPretraziFilmNaOsnovuKnjige";
        divPretraziFilmNaOsnovuKnjige.appendChild(input21);
        let button21 = document.createElement("button");
        button21.className = "ButtonPretraziFilmNaOsnovuKnjige";
        button21.innerHTML = "Pretrazi film na osnovu knjige";
        button21.onclick = (ev) => this.pretraziFilmNaOsnovuKnjige(input21.value);
        divPretraziFilmNaOsnovuKnjige.appendChild(button21);

        let divPretraziSveFilmoveISerijeRezisera = document.createElement("div");
        divPretraziSveFilmoveISerijeRezisera.className = "DivPretraziSveFilmoveISerijeRezisera";
        divPretraziFilmove.appendChild(divPretraziSveFilmoveISerijeRezisera);
        let input22= document.createElement("input");
        input22.className = "InputPretraziSveFilmoveISerijeRezisera";
        divPretraziSveFilmoveISerijeRezisera.appendChild(input22);
        let button22 = document.createElement("button");
        button22.className = "ButtonPretraziSveFilmoveISerijeRezisera";
        button22.innerHTML = "Pretrazi filmove i serije za datog rezisera";
        button22.onclick = (ev) => this.pretraziSveFilmoveISerijeZaDatogRezisera(input22.value);
        divPretraziSveFilmoveISerijeRezisera.appendChild(button22);

        let divPretraziSveFilmoveISerijeGlumca = document.createElement("div");
        divPretraziSveFilmoveISerijeGlumca.className = "DivPretraziSveFilmoveISerijeGlumca";
        divPretraziFilmove.appendChild(divPretraziSveFilmoveISerijeGlumca);
        let input23= document.createElement("input");
        input23.className = "InputPretraziSveFilmoveISerijeGlumca";
        divPretraziSveFilmoveISerijeGlumca.appendChild(input23);
        let button23 = document.createElement("button");
        button23.className = "ButtonPretraziSveFilmoveISerijeGlumca";
        button23.innerHTML = "Pretrazi filmove i serije za datog glumca";
        button23.onclick = (ev) => this.pretraziSveFilmoveISerijeZaDatogGlumca(input23.value);
        divPretraziSveFilmoveISerijeGlumca.appendChild(button23);


        let divPretraziKorisnikaPoImenuIPrezimenu=document.createElement("div");
        divPretraziKorisnikaPoImenuIPrezimenu.className="DivPretraziKorisnikaPoImenuIPrezimenu";
        divPretraziKorisnike.appendChild(divPretraziKorisnikaPoImenuIPrezimenu);

        let input24=document.createElement("input");
        input24.className="InputPretraziKorisnikePoImenu";
        divPretraziKorisnikaPoImenuIPrezimenu.appendChild(input24);

        let input25=document.createElement("input");
        input25.className="InputPretraziKorisnikePoPrezimenu";
        divPretraziKorisnikaPoImenuIPrezimenu.appendChild(input25);

        let button24 = document.createElement("button");
        button24.className = "ButtonPretraziKorisnikaPoImenuIPrezimenu";
        button24.innerHTML = "Pretrazi korisnika po imenu i prezimenu";
        button24.onclick=(ev)=>this.pretraziKorisnikaPoImenuIPrezimenu(input24.value,input25.value);
        divPretraziKorisnikaPoImenuIPrezimenu.appendChild(button24);


        let divPretraziKorisnikaPoJMBG=document.createElement("div");
        divPretraziKorisnikaPoJMBG.className="DivPretraziKorisnikaPoJMBG";
        divPretraziKorisnike.appendChild(divPretraziKorisnikaPoJMBG);

        let input26=document.createElement("input");
        input26.className="InputPretraziKorisnikePoJMBG";
        divPretraziKorisnikaPoJMBG.appendChild(input26);

        let button25 = document.createElement("button");
        button25.className = "ButtonPretraziKorisnikaPoJMBG";
        button25.innerHTML = "Pretrazi korisnika po JMBG";
        button25.onclick=(ev)=>this.pretraziKorisnikaPoJMBG(input26.value);
        divPretraziKorisnikaPoJMBG.appendChild(button25);


        let divPretraziKorisnikaPoEmailu=document.createElement("div");
        divPretraziKorisnikaPoEmailu.className="DivPretraziKorisnikaPoEmailu";
        divPretraziKorisnike.appendChild(divPretraziKorisnikaPoEmailu);

        let input27=document.createElement("input");
        input27.className="InputPretraziKorisnikePoEmailu";
        divPretraziKorisnikaPoEmailu.appendChild(input27);

        let button26 = document.createElement("button");
        button26.className = "ButtonPretraziKorisnikaPoEmailu";
        button26.innerHTML = "Pretrazi korisnika po Email-u";
        button26.onclick=(ev)=>this.pretraziKorisnikaPoEmailu(input27.value);
        divPretraziKorisnikaPoEmailu.appendChild(button26);
    }
    pretraziFilmPoNazivu(nazivFilma){
        console.log(nazivFilma)

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazFilmovaPoNazivu=document.createElement("div");
        divZaPrikazFilmovaPoNazivu.className="DivZaPrikazFilmovaPoNazivu";
        prikaz.appendChild(divZaPrikazFilmovaPoNazivu);


        let filmoviPoNazivu = [];

        fetch("https://localhost:44389/Film/PreuzmiFilmPoNazivu/"+nazivFilma,
        {
            method:"GET"
        }).then(data=>{
            data.json().then(filmovi=>{
                filmovi.forEach(f=>{

                    let film = new Film(f.id, f.naziv, f.reziser, f.zanr, f.glumci, f.godinaIzdanja, f.prosecnaOcena, f.kratakOpis, f.cena, f.korisnici, f.slika, f.triler);
                    filmoviPoNazivu.push(film);
                })
                filmoviPoNazivu.forEach(film=>{
                    film.crtajFilm(divZaPrikazFilmovaPoNazivu, prikaz)
                })

            })
        })
    }
    pretraziFilmPoReziseru(reziser){
        console.log(reziser)

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazFilmovaPoReziseru=document.createElement("div");
        divZaPrikazFilmovaPoReziseru.className="DivZaPrikazFilmovaPoReziseru";
        prikaz.appendChild(divZaPrikazFilmovaPoReziseru);


        let filmoviPoReziseru = [];

        fetch("https://localhost:44389/Film/PreuzmiFilmoveIstogRezisera/"+reziser,
        {
            method:"GET"
        }).then(data=>{
            data.json().then(filmovi=>{
                filmovi.forEach(f=>{
                    let film = new Film(f.id, f.naziv, f.reziser, f.zanr, f.glumci, f.godinaIzdanja, f.prosecnaOcena, f.kratakOpis, f.cena, f.korisnici, f.slika, f.triler);
                    filmoviPoReziseru.push(film);
                })
                filmoviPoReziseru.forEach(film=>{
                    film.crtajFilm(divZaPrikazFilmovaPoReziseru, prikaz)
                })

            })
        })
    }
    pretraziFilmPoCeni(cenaOd, cenaDo){
        console.log(cenaOd);
        console.log(cenaDo);

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazFilmovaPoCeni=document.createElement("div");
        divZaPrikazFilmovaPoCeni.className="DivZaPrikazFilmovaPoCeni";
        prikaz.appendChild(divZaPrikazFilmovaPoCeni);


        let filmoviPoCeni = [];

        fetch("https://localhost:44389/Film/PreuzmiFilmovePoCeni/"+cenaOd+"/"+cenaDo,
        {
            method:"GET"
        }).then(data=>{
            data.json().then(filmovi=>{
                filmovi.forEach(f=>{
                    let film = new Film(f.id, f.naziv, f.reziser, f.zanr, f.glumci, f.godinaIzdanja, f.prosecnaOcena, f.kratakOpis, f.cena, f.korisnici, f.slika, f.triler);
                    filmoviPoCeni.push(film);
                })
                filmoviPoCeni.forEach(film=>{
                    film.crtajFilm(divZaPrikazFilmovaPoCeni, prikaz)
                })

            })
        })
    }
    pretraziFilmPoProsecnojOceni(prosecnaOcena){
        console.log(prosecnaOcena);

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazFilmovaPoProsecnojOceni=document.createElement("div");
        divZaPrikazFilmovaPoProsecnojOceni.className="DivZaPrikazFilmovaPoProsecnojOceni";
        prikaz.appendChild(divZaPrikazFilmovaPoProsecnojOceni);


        let filmoviPoProsecnojOceni = [];

        fetch("https://localhost:44389/Film/PreuzmiFilmovePoProscnojOceni/"+prosecnaOcena,
        {
            method:"GET"
        }).then(data=>{
            data.json().then(filmovi=>{
                filmovi.forEach(f=>{
                    let film = new Film(f.id, f.naziv, f.reziser, f.zanr, f.glumci, f.godinaIzdanja, f.prosecnaOcena, f.kratakOpis, f.cena, f.korisnici, f.slika, f.triler);
                    filmoviPoProsecnojOceni.push(film);
                })
                filmoviPoProsecnojOceni.forEach(film=>{
                    film.crtajFilm(divZaPrikazFilmovaPoProsecnojOceni, prikaz)
                })

            })
        })
    }
    preuzmiProsecnuOcenuFilma(idFilma){
        

        fetch("https://localhost:44389/Film/PreuzmiProsecnuOcenuFilma/"+idFilma,
        {
            method:"GET"
        }).then(data=>{
            data.json().then(ocena=>{
                this.listaFilmova.forEach(f=>{
                    if(f.id == idFilma){
                        f.prosecnaOcena = ocena;
                    }
                })

                console.log(this.listaFilmova)
            })
        })
    }
    pretraziSveFilmoveISerijeZaDatogRezisera(reziser){
        console.log(reziser)

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazSvihFilmovaISerijaZaDatogRezisera=document.createElement("div");
        divZaPrikazSvihFilmovaISerijaZaDatogRezisera.className="DivZaPrikazSvihFilmovaISerijaZaDatogRezisera";
        prikaz.appendChild(divZaPrikazSvihFilmovaISerijaZaDatogRezisera);


        let sviFilmoviZaDatogRezisera = [];
        let sveSerijeZaDatogRezisera = [];

        fetch("https://localhost:44389/Film/PreuzmiSveFilmoveISerijeZaDatogRezisera/"+reziser,
        {
            method:"GET"
        }).then(data=>{
            data.json().then(info=>{
                console.log(info)
                info.filmovi.forEach(f=>{

                    let film1 = new Film(f.id, f.naziv, f.reziser, f.zanr, f.glumci, f.godinaIzdanja, f.prosecnaOcena, f.kratakOpis, f.cena, f.korisnici, f.slika, f.triler);
                
                    sviFilmoviZaDatogRezisera.push(film1);
                })

                info.serije.forEach(x=>{
                    console.log(x)
                    let serija=new Serija(x.id,x.naziv,x.reziser,x.glumci,x.kratakOpis,x.komentari,x.cena,x.slika,x.triler,x.korisnici);
                    x.sezone.forEach(s=>{
                        let sezona = new Sezona(s.id, s.naziv, s.epizode, s.prosecnaOcena, s.godinaIzdavanja, s.serija);
                        serija.sezone.push(sezona);
                    })
                    sveSerijeZaDatogRezisera.push(serija);

                })

                sviFilmoviZaDatogRezisera.forEach(film=>{
                    film.crtajFilm(divZaPrikazSvihFilmovaISerijaZaDatogRezisera, prikaz)
                })
                sveSerijeZaDatogRezisera.forEach(s=>{
                    s.iscrtajSeriju(divZaPrikazSvihFilmovaISerijaZaDatogRezisera, prikaz); 
                })

            })
        })
    }
    pretraziSveFilmoveISerijeZaDatogGlumca(glumac){
        console.log(glumac)

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazSvihFilmovaISerijaZaDatogGlumca=document.createElement("div");
        divZaPrikazSvihFilmovaISerijaZaDatogGlumca.className="DivZaPrikazSvihFilmovaISerijaZaDatogGlumca";
        prikaz.appendChild(divZaPrikazSvihFilmovaISerijaZaDatogGlumca);


        let sviFilmoviZaDatogGlumca = [];
        let sveSerijeZaDatogGlumca = [];

        fetch("https://localhost:44389/Film/PreuzmiFilmoveISerijeGdeJeZadatiGlumac/"+glumac,
        {
            method:"GET"
        }).then(data=>{
            data.json().then(info=>{
                console.log(info)
                info.filmovi.forEach(f=>{
                    let film1 = new Film(f.id, f.naziv, f.reziser, f.zanr, f.glumci, f.godinaIzdanja, f.prosecnaOcena, f.kratakOpis, f.cena, f.korisnici, f.slika, f.triler);
                    sviFilmoviZaDatogGlumca.push(film1);
                })

                info.serije.forEach(x=>{
                    console.log(x)
                    let serija=new Serija(x.id,x.naziv,x.reziser,x.glumci,x.kratakOpis,x.komentari,x.cena,x.slika,x.triler,x.korisnici);
                    x.sezone.forEach(s=>{
                        let sezona = new Sezona(s.id, s.naziv, s.epizode, s.prosecnaOcena, s.godinaIzdavanja, s.serija);
                        serija.sezone.push(sezona);
                    })
                    sveSerijeZaDatogGlumca.push(serija);

                })

                sviFilmoviZaDatogGlumca.forEach(film=>{
                    film.crtajFilm(divZaPrikazSvihFilmovaISerijaZaDatogGlumca, prikaz)
                })
                sveSerijeZaDatogGlumca.forEach(s=>{
                    s.iscrtajSeriju(divZaPrikazSvihFilmovaISerijaZaDatogGlumca, prikaz); 
                })

            })
        })
    }
    pretraziSerijuPoNazivu(naziv){
        console.log(naziv)

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazSerijaPoNazivu=document.createElement("div");
        divZaPrikazSerijaPoNazivu.className="DivZaPrikazSerijaPoNazivu";
        prikaz.appendChild(divZaPrikazSerijaPoNazivu);


        let serijePoNazivu = [];

        fetch("https://localhost:44389/Serija/PreuzmiSerijePoNazivu/"+naziv,
        {
            method:"GET"
        }).then(data=>{
            data.json().then(info=>{
                info.forEach(x=>{
                    console.log(x)
                    //Serija(x.id,x.naziv,x.reziser,x.glumci,x.prosecnaOcena,x.kratakOpis,x.cena,x.slika,x.triler,x.korisnici);
                    let serija=new Serija(x.id,x.naziv,x.reziser,x.glumci,x.prosecnaOcena,x.kratakOpis,x.cena,x.slika,x.triler,x.korisnici);
                    x.sezone.forEach(s=>{
                        let sezona = new Sezona(s.id, s.naziv, s.epizode, s.prosecnaOcena, s.godinaIzdavanja, s.serija);
                        serija.sezone.push(sezona);
                    })
                    serijePoNazivu.push(serija);

            })
            console.log(serijePoNazivu);
            serijePoNazivu.forEach(s=>{
                     s.iscrtajSeriju(divZaPrikazSerijaPoNazivu, prikaz); 
            })
            })
        })
    }
    pretraziSerijuPoReziseru(reziser){
        console.log(reziser)

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazSerijaPoReziseru=document.createElement("div");
        divZaPrikazSerijaPoReziseru.className="DivZaPrikazSerijaPoReziseru";
        prikaz.appendChild(divZaPrikazSerijaPoReziseru);


        let serijePoReziseru = [];

        fetch("https://localhost:44389/Serija/PreuzmiSerijeIstogRezisera/"+reziser,
        {
            method:"GET"
        }).then(data=>{
            data.json().then(info=>{
                info.forEach(x=>{
                    console.log(x)
                   // Serija(x.id,x.naziv,x.reziser,x.glumci,x.prosecnaOcena,x.kratakOpis,x.cena,x.slika,x.triler,x.korisnici);
                    let serija=new Serija(x.id,x.naziv,x.reziser,x.glumci,x.prosecnaOcena,x.kratakOpis,x.cena,x.slika,x.triler,x.korisnici);
                    x.sezone.forEach(s=>{
                        let sezona = new Sezona(s.id, s.naziv, s.epizode, s.prosecnaOcena, s.godinaIzdavanja, s.serija);
                        serija.sezone.push(sezona);
                    })
                    serijePoReziseru.push(serija);

            })
            console.log(serijePoReziseru);
            serijePoReziseru.forEach(s=>{
                     s.iscrtajSeriju(divZaPrikazSerijaPoReziseru, prikaz); 
            })
            })
        })
    }
    pretraziSerijuPoCeni(cenaOd, cenaDo){
        console.log(cenaOd);
        console.log(cenaDo);

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazSerijaPoCeni=document.createElement("div");
        divZaPrikazSerijaPoCeni.className="DivZaPrikazSerijaPoCeni";
        prikaz.appendChild(divZaPrikazSerijaPoCeni);


        let serijePoCeni = [];

        fetch("https://localhost:44389/Serija/PreuzmiSerijePoCeni/"+cenaOd+"/"+cenaDo,
        {
            method:"GET"
        }).then(data=>{
            data.json().then(info=>{
                info.forEach(x=>{
                    console.log(x)
                    let serija=new Serija(x.id,x.naziv,x.reziser,x.glumci,x.prosecnaOcena,x.kratakOpis,x.cena,x.slika,x.triler,x.korisnici);
                    x.sezone.forEach(s=>{
                        let sezona = new Sezona(s.id, s.naziv, s.epizode, s.prosecnaOcena, s.godinaIzdavanja, s.serija);
                        serija.sezone.push(sezona);
                    })
                    serijePoCeni.push(serija);

            })
            //console.log(serijePoCeni);
            serijePoCeni.forEach(s=>{
                     s.iscrtajSeriju(divZaPrikazSerijaPoCeni, prikaz); 
            })
            })
        })
    }

    //Kako ce da se prikazuju glumci????
    pretraziGlumceUSeriji(nazivSerije){
        console.log(nazivSerije);

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazGlumacaUSeriji=document.createElement("div");
        divZaPrikazGlumacaUSeriji.className="DivZaPrikazGlumacaUSeriji";
        prikaz.appendChild(divZaPrikazGlumacaUSeriji);

        let lbl1 = document.createElement("label");
        lbl1.innerHTML = "Glumci u serji \"" + nazivSerije + "\" su : ";
        divZaPrikazGlumacaUSeriji.appendChild(lbl1);


        let prikazGlumacaUSeriji = [];

        fetch("https://localhost:44389/Serija/PreuzmiGlumceUSeriji/"+nazivSerije,
        {
            method:"GET"
        }).then(data=>{
            data.json().then(info=>{
                console.log(info)
                let lbl2 = document.createElement("label");
                
                info.forEach(gl=>{
                    lbl1.innerHTML += gl + ", ";
                })

                divZaPrikazGlumacaUSeriji.appendChild(lbl2);
            })
        })

    }

    pretraziSveEpizodeUSeriji(nazivSerije){
        console.log(nazivSerije);

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazEpizodaUSeriji=document.createElement("div");
        divZaPrikazEpizodaUSeriji.className="DivZaPrikazEpizodaUSeriji";
        prikaz.appendChild(divZaPrikazEpizodaUSeriji);

        let prikazEpizodaUSeriji = [];

        fetch("https://localhost:44389/Serija/PreuzmiSveEpizodeSerijePoNazivu/"+nazivSerije,
        {
            method:"GET"
        }).then(data=>{
            data.json().then(info=>{
                console.log(info)
                info.forEach(s=>{
                    let sezona = new Sezona(s.id, s.naziv, s.epizode, s.prosecnaOcena, s.godinaIzdavanja, s.serija);
                        prikazEpizodaUSeriji.push(sezona);
                        console.log(sezona)
                })

                prikazEpizodaUSeriji.forEach(sezona=>{
                    sezona.prikaziSezonu(divZaPrikazEpizodaUSeriji);
                })
            })
        })
    }

    pretraziKnjiguPoAutoruINazivu(autor, naziv){
        console.log(autor);
        console.log(naziv);

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazKnjigaPoAutoruINazivu=document.createElement("div");
        divZaPrikazKnjigaPoAutoruINazivu.className="DivZaPrikazKnjigaPoAutoruINazivu";
        prikaz.appendChild(divZaPrikazKnjigaPoAutoruINazivu);


        let knjigePoAutoruINazivu = [];

        fetch("https://localhost:44389/Knjiga/PreuzmiKnjiguNaOsnovuAutoraINaziva/"+autor+"/"+naziv,
        {
            method:"GET"
        }).then(data=>{
        data.json().then(knjige=>{
            knjige.forEach(x=>{

                let knjiga=new Knjiga(x.id,x.naziv,x.autor,x.godina_izdavanja,x.kratak_opis,x.izdavac,x.zanr,x.broj_strana,x.povez,x.prosecna_ocena,x.cena,x.jezik,x.slika,x.korisnici);
                //console.log(knjiga)
                knjigePoAutoruINazivu.push(knjiga)
            } )
            //console.log(knjigePoAutoruINazivu)
            knjigePoAutoruINazivu.forEach(k=>{
                k.crtajKnjigu(divZaPrikazKnjigaPoAutoruINazivu, prikaz)
            })
            })
        })

    }
    pretraziKnjiguPoPovezu(povez){
        console.log(povez);

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazKnjigaPoPovezu=document.createElement("div");
        divZaPrikazKnjigaPoPovezu.className="DivZaPrikazKnjigaPoPovezu";
        prikaz.appendChild(divZaPrikazKnjigaPoPovezu);


        let knjigePoPovezu = [];

        fetch("https://localhost:44389/Knjiga/PreuzmiKnjiguPoPovezu/"+povez,
        {
            method:"GET"
        }).then(data=>{
        data.json().then(knjige=>{
            knjige.forEach(x=>{

                let knjiga=new Knjiga(x.id,x.naziv,x.autor,x.godina_izdavanja,x.kratak_opis,x.izdavac,x.zanr,x.broj_strana,x.povez,x.prosecna_ocena,x.cena,x.jezik,x.slika,x.korisnici);
                //console.log(knjiga)
                knjigePoPovezu.push(knjiga)
            } )
            //console.log(knjigePoAutoruINazivu)
            knjigePoPovezu.forEach(k=>{
                k.crtajKnjigu(divZaPrikazKnjigaPoPovezu, prikaz)
            })
            })
        })

    }

    pretraziKnjiguPoJeziku(jezik){
        console.log(jezik);

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazKnjigaPoJeziku=document.createElement("div");
        divZaPrikazKnjigaPoJeziku.className="DivZaPrikazKnjigaPoJeziku";
        prikaz.appendChild(divZaPrikazKnjigaPoJeziku);


        let knjigePoJeziku = [];

        fetch("https://localhost:44389/Knjiga/PreuzmiKnjiguPoJeziku/"+jezik,
        {
            method:"GET"
        }).then(data=>{
        data.json().then(knjige=>{
            knjige.forEach(x=>{

                let knjiga=new Knjiga(x.id,x.naziv,x.autor,x.godina_izdavanja,x.kratak_opis,x.izdavac,x.zanr,x.broj_strana,x.povez,x.prosecna_ocena,x.cena,x.jezik,x.slika,x.korisnici);
                //console.log(knjiga)
                knjigePoJeziku.push(knjiga)
            } )
            //console.log(knjigePoAutoruINazivu)
            knjigePoJeziku.forEach(k=>{
                k.crtajKnjigu(divZaPrikazKnjigaPoJeziku, prikaz)
            })
            })
        })
    }
    pretraziKnjiguPoIzdavacu(izdavac){
        console.log(izdavac);

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazKnjigaPoIzdavacu=document.createElement("div");
        divZaPrikazKnjigaPoIzdavacu.className="DivZaPrikazKnjigaPoIzdavacu";
        prikaz.appendChild(divZaPrikazKnjigaPoIzdavacu);


        let knjigePoIzdavacu = [];

        fetch("https://localhost:44389/Knjiga/PreuzmiKnjigeIstogIzdavaca/"+izdavac,
        {
            method:"GET"
        }).then(data=>{
        data.json().then(knjige=>{
            knjige.forEach(x=>{

                let knjiga=new Knjiga(x.id,x.naziv,x.autor,x.godina_izdavanja,x.kratak_opis,x.izdavac,x.zanr,x.broj_strana,x.povez,x.prosecna_ocena,x.cena,x.jezik,x.slika,x.korisnici);
                //console.log(knjiga)
                knjigePoIzdavacu.push(knjiga)
            } )
            //console.log(knjigePoAutoruINazivu)
            knjigePoIzdavacu.forEach(k=>{
                k.crtajKnjigu(divZaPrikazKnjigaPoIzdavacu, prikaz)
            })
            })
        })
    }
    pretraziKnjiguPoNazivu(naziv){

        console.log(naziv);

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazKnjigaPoNazivu=document.createElement("div");
        divZaPrikazKnjigaPoNazivu.className="DivZaPrikazKnjigaPoNazivu";
        prikaz.appendChild(divZaPrikazKnjigaPoNazivu);


        let knjigePoNazivu = [];

        fetch("https://localhost:44389/Knjiga/PreuzmiKnjiguPoNazivu/"+naziv,
        {
            method:"GET"
        }).then(data=>{
        data.json().then(knjige=>{
            knjige.forEach(x=>{

                let knjiga=new Knjiga(x.id,x.naziv,x.autor,x.godina_izdavanja,x.kratak_opis,x.izdavac,x.zanr,x.broj_strana,x.povez,x.prosecna_ocena,x.cena,x.jezik,x.slika,x.korisnici);
                //console.log(knjiga)
                knjigePoNazivu.push(knjiga)
            } )
            //console.log(knjigePoAutoruINazivu)
            knjigePoNazivu.forEach(k=>{
                k.crtajKnjigu(divZaPrikazKnjigaPoNazivu, prikaz)
            })
            })
        })
    }
    pretraziKnjiguPoGodini(godina){
        console.log(godina);

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazKnjigaPoGodini=document.createElement("div");
        divZaPrikazKnjigaPoGodini.className="DivZaPrikazKnjigaPoGodini";
        prikaz.appendChild(divZaPrikazKnjigaPoGodini);


        let knjigePoGodini = [];

        fetch("https://localhost:44389/Knjiga/PreuzmiKnjigePoGodini/"+godina,
        {
            method:"GET"
        }).then(data=>{
        data.json().then(knjige=>{
            knjige.forEach(x=>{

                let knjiga=new Knjiga(x.id,x.naziv,x.autor,x.godina_izdavanja,x.kratak_opis,x.izdavac,x.zanr,x.broj_strana,x.povez,x.prosecna_ocena,x.cena,x.jezik,x.slika,x.korisnici);
                //console.log(knjiga)
                knjigePoGodini.push(knjiga)
            } )
            //console.log(knjigePoAutoruINazivu)
            knjigePoGodini.forEach(k=>{
                k.crtajKnjigu(divZaPrikazKnjigaPoGodini, prikaz)
            })
            })
        })
    }
    pretraziKnjigePoPiscu(pisac){

        console.log(pisac);

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazKnjigePoPiscu=document.createElement("div");
        divZaPrikazKnjigePoPiscu.className="DivZaPrikazKnjigePoPiscu";
        prikaz.appendChild(divZaPrikazKnjigePoPiscu);


        let knjigePoPiscu = [];

        fetch("https://localhost:44389/Knjiga/PreuzmiKnjigeIstogPisca/"+pisac,
        {
            method:"GET"
        }).then(data=>{
        data.json().then(knjige=>{
            knjige.forEach(x=>{

                let knjiga=new Knjiga(x.id,x.naziv,x.autor,x.godina_izdavanja,x.kratak_opis,x.izdavac,x.zanr,x.broj_strana,x.povez,x.prosecna_ocena,x.cena,x.jezik,x.slika,x.korisnici);
                //console.log(knjiga)
                knjigePoPiscu.push(knjiga)
            } )
            //console.log(knjigePoAutoruINazivu)
            knjigePoPiscu.forEach(k=>{
                k.crtajKnjigu(divZaPrikazKnjigePoPiscu, prikaz)
            })
            })
        })
    }
    pretraziKnjigePoCeni(cenaOd, cenaDo){
        console.log(cenaOd);
        console.log(cenaDo);

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazKnjigePoCeni=document.createElement("div");
        divZaPrikazKnjigePoCeni.className="DivZaPrikazKnjigePoCeni";
        prikaz.appendChild(divZaPrikazKnjigePoCeni);


        let knjigePoCeni = [];

        fetch("https://localhost:44389/Knjiga/PreuzmiKnjigePoCeni/"+cenaOd+"/"+cenaDo,
        {
            method:"GET"
        }).then(data=>{
        data.json().then(knjige=>{
            knjige.forEach(x=>{

                let knjiga=new Knjiga(x.id,x.naziv,x.autor,x.godina_izdavanja,x.kratak_opis,x.izdavac,x.zanr,x.broj_strana,x.povez,x.prosecna_ocena,x.cena,x.jezik,x.slika,x.korisnici);
                //console.log(knjiga)
                knjigePoCeni.push(knjiga)
            } )
            //console.log(knjigePoAutoruINazivu)
            knjigePoCeni.forEach(k=>{
                k.crtajKnjigu(divZaPrikazKnjigePoCeni, prikaz)
            })
            })
        })

    }

    pretraziKnjigePoZanru(zanr){

        console.log(zanr);

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazKnjigePoZanru=document.createElement("div");
        divZaPrikazKnjigePoZanru.className="DivZaPrikazKnjigePoZanru";
        prikaz.appendChild(divZaPrikazKnjigePoZanru);


        let knjigePoZanru = [];

        fetch("https://localhost:44389/Knjiga/PreuzmiKnjigePoZanru/"+zanr,
        {
            method:"GET"
        }).then(data=>{
        data.json().then(knjige=>{
            knjige.forEach(x=>{

                let knjiga=new Knjiga(x.id,x.naziv,x.autor,x.godina_izdavanja,x.kratak_opis,x.izdavac,x.zanr,x.broj_strana,x.povez,x.prosecna_ocena,x.cena,x.jezik,x.slika,x.korisnici);
                //console.log(knjiga)
                knjigePoZanru.push(knjiga)
            } )
            console.log(knjigePoZanru)
            knjigePoZanru.forEach(k=>{
                k.crtajKnjigu(divZaPrikazKnjigePoZanru, prikaz)
            })
            })
        })

    }
    pretraziKnjigePoProsecnojOceni(ocena){

        console.log(ocena);

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazKnjigePoProsecnojOceni=document.createElement("div");
        divZaPrikazKnjigePoProsecnojOceni.className="DivZaPrikazKnjigePoProsecnojOceni";
        prikaz.appendChild(divZaPrikazKnjigePoProsecnojOceni);


        let knjigePoProsecnojOceni = [];

        fetch("https://localhost:44389/Knjiga/PreuzmiKnjigePoProscnojOceni/"+ocena,
        {
            method:"GET"
        }).then(data=>{
        data.json().then(knjige=>{
            knjige.forEach(x=>{

                let knjiga=new Knjiga(x.id,x.naziv,x.autor,x.godina_izdavanja,x.kratak_opis,x.izdavac,x.zanr,x.broj_strana,x.povez,x.prosecna_ocena,x.cena,x.jezik,x.slika,x.korisnici);
                //console.log(knjiga)
                knjigePoProsecnojOceni.push(knjiga)
            } )
            //console.log(knjigePoAutoruINazivu)
            knjigePoProsecnojOceni.forEach(k=>{
                k.crtajKnjigu(divZaPrikazKnjigePoProsecnojOceni, prikaz)
            })
            })
        })
    }
    pretraziFilmNaOsnovuKnjige(nazivKnjige){

        console.log(nazivKnjige);

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazFilmaNaOsnovuKnjige=document.createElement("div");
        divZaPrikazFilmaNaOsnovuKnjige.className="DivZaPrikazFilmaNaOsnovuKnjige";
        prikaz.appendChild(divZaPrikazFilmaNaOsnovuKnjige);


        let prikazFilmaNaOsnovuKnjige = [];

        fetch("https://localhost:44389/Knjiga/NaOsnovuKnjigeNadjiFilm/"+nazivKnjige,
        {
            method:"GET"
        }).then(data=>{
        data.json().then(filmovi=>{
            filmovi.forEach(f=>{
                let film = new Film(f.id, f.naziv, f.reziser, f.zanr, f.glumci, f.godinaIzdanja, f.prosecnaOcena, f.kratakOpis, f.cena, f.korisnici, f.slika, f.triler);
                prikazFilmaNaOsnovuKnjige.push(film);
            })
            prikazFilmaNaOsnovuKnjige.forEach(film=>{
                film.crtajFilm(divZaPrikazFilmaNaOsnovuKnjige, prikaz)
            })
            })
        })
    }

    pretraziKorisnikaPoImenuIPrezimenu(ime,prezime){
        console.log(ime)
        console.log(prezime)
        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazKorisnika=document.createElement("div");
        divZaPrikazKorisnika.className="DivZaPrikazKorisnika";
        prikaz.appendChild(divZaPrikazKorisnika);

        
       

        fetch("https://localhost:44389/Korisnik/PreuzmiKorisnikaPoImenuIPrezimenu/"+ime+"/"+prezime,{
            method:"GET"
        }).then(data=>{
            data.json().then(korisnici=>{
                //console.log(korisnici)
               //console.log(korisnici)
               let korisnik=new Korisnik(korisnici.id,korisnici.ime,korisnici.prezime,korisnici.jmbg,korisnici.email,korisnici.sifra);
               console.log(korisnik)
                //console.log(korisniciLista)
                korisnik.crtajKorisnika(divZaPrikazKorisnika)
            })
        })

    }

    pretraziKorisnikaPoJMBG(jmbg){

        console.log(jmbg);
        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazKorisnika=document.createElement("div");
        divZaPrikazKorisnika.className="DivZaPrikazKorisnika";
        prikaz.appendChild(divZaPrikazKorisnika);

        fetch("https://localhost:44389/Korisnik/PreuzmiKorisnikaPoJMBG/"+jmbg,{
            method:"GET"
        }).then(data=>{
            data.json().then(kor=>{
               let korisnik=new Korisnik(kor.id,kor.ime,kor.prezime,kor.jmbg,kor.email,kor.sifra);
               console.log(korisnik)
               korisnik.crtajKorisnika(divZaPrikazKorisnika)
            })
        })

    }
   
    pretraziKorisnikaPoEmailu(email){
        console.log(email)
        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divZaPrikazKorisnika=document.createElement("div");
        divZaPrikazKorisnika.className="DivZaPrikazKorisnika";
        prikaz.appendChild(divZaPrikazKorisnika);

        fetch("https://localhost:44389/Korisnik/PreuzmiKorisnikaPoEmailu/"+email,{
            method:"GET"
        }).then(data=>{
            data.json().then(kor=>{
               let korisnik=new Korisnik(kor.id,kor.ime,kor.prezime,kor.jmbg,kor.email,kor.sifra);
               console.log(korisnik)
               korisnik.crtajKorisnika(divZaPrikazKorisnika)
            })
        })
    }
    
    iscrtajKorisnike(){


        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let label=document.createElement("label");
        label.className="label";
        label.innerText="*Klikni na korisnika da ga izmenis ili obrises*";
        prikaz.appendChild(label);

        let divDodajKorisnika = document.createElement("div");
        divDodajKorisnika.className = "DivDodajKorisnika";
        prikaz.appendChild(divDodajKorisnika);
        let btnDodajKorisnika = document.createElement("button");
        btnDodajKorisnika.className = "btnDodajKorisnika";
        btnDodajKorisnika.innerHTML = "Dodaj korisnika";
        btnDodajKorisnika.onclick = (ev) => this.dodajKorisnika();
        divDodajKorisnika.appendChild(btnDodajKorisnika);

        let divZaPrikazKorisnika=document.createElement("div");
        divZaPrikazKorisnika.className="divZaPrikazKorisnika";
        prikaz.appendChild(divZaPrikazKorisnika);

        fetch("https://localhost:44389/Korisnik/PreuzmiKorisnike",{

        method:"GET"
        }).then(data=>{
        data.json().then(korisnici=>{
            korisnici.forEach(x=>{
                let korisnik=new Korisnik(x.id,x.ime,x.prezime,x.jmbg,x.email,x.sifra);
                //console.log(korisnik)
                this.listaKorisnika.push(korisnik)
            })
            
        this.listaKorisnika.forEach(korisnik=>{
            korisnik.crtajKorisnika(divZaPrikazKorisnika,prikaz)
        })
            console.log(this.listaKorisnika)
        })
        })

       

    }

    dodajKorisnika(){

        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divId = document.createElement("div");
        divId.className = "DivID";
        prikaz.appendChild(divId);

        let inputID = document.createElement("input");
        inputID.className = "InputID";
        inputID.placeholder = "ID";
        divId.appendChild(inputID);

        let divIme = document.createElement("div");
        divIme.className = "DivIme";
        prikaz.appendChild(divIme);

        let inputIme = document.createElement("input");
        inputIme.className = "InputIme";
        inputIme.placeholder = "Ime";
        divIme.appendChild(inputIme);

        let divPrezime = document.createElement("div");
        divPrezime.className = "DivPrezime";
        prikaz.appendChild(divPrezime);

        let inputPrezime = document.createElement("input");
        inputPrezime.className = "InputPrezime";
        inputPrezime.placeholder = "Prezime";
        divPrezime.appendChild(inputPrezime);
        
        let divJMBG = document.createElement("div");
        divJMBG.className = "DivJMBG";
        prikaz.appendChild(divJMBG);

        let inputJMBG = document.createElement("input");
        inputJMBG.className = "InputJMBG";
        inputJMBG.placeholder = "JMBG";
        divJMBG.appendChild(inputJMBG);

        let divEmail = document.createElement("div");
        divEmail.className = "DivEmail";
        prikaz.appendChild(divEmail);

        let inputEmail = document.createElement("input");
        inputEmail.className = "InputEmail";
        inputEmail.placeholder = "Email";
        divEmail.appendChild(inputEmail);

        let divSifra = document.createElement("div");
        divSifra.className = "DivSifra";
        prikaz.appendChild(divSifra);

        let inputSifra = document.createElement("input");
        inputSifra.className = "InputSifra";
        inputSifra.placeholder = "Sifra";
        divSifra.appendChild(inputSifra);

      
        let labela=document.createElement("label");
        labela.innerHTML="Unesi sifru(pod sifrom se podrazumeva id u bazi) serije,filma i knjige, ako korisniku zelis da dodelis seriju,film i knjigu";
        prikaz.appendChild(labela);

        let divIdSerije = document.createElement("div");
        divIdSerije.className = "DivIdSerije";
        prikaz.appendChild(divIdSerije);

        let inputIdSerije = document.createElement("input");
        inputIdSerije.className = "InputIdSerije";
        inputIdSerije.placeholder = "Sifra serije";
        divIdSerije.appendChild(inputIdSerije);

        let divIdFilma = document.createElement("div");
        divIdFilma.className = "DivIdFilma";
        prikaz.appendChild(divIdFilma);

        let inputIdFilma = document.createElement("input");
        inputIdFilma.className = "InputIdFilma";
        inputIdFilma.placeholder = "Sifra filma";
        divIdFilma.appendChild(inputIdFilma);

        let divIdKnjige = document.createElement("div");
        divIdKnjige.className = "DivIdKnjige";
        prikaz.appendChild(divIdKnjige);

        let inputIdKnjige = document.createElement("input");
        inputIdKnjige.className = "InputIdKnjige";
        inputIdKnjige.placeholder = "Sifra knjige";
        divIdKnjige.appendChild(inputIdKnjige);

        let btnDodaj = document.createElement("button");
        btnDodaj.className = "DodajKorisnika";
        btnDodaj.innerHTML = "Dodaj korisnika";
        btnDodaj.onclick = (ev) => this.kreirajKorisnika(inputID.value, inputIme.value, inputPrezime.value, inputJMBG.value,inputEmail.value,inputSifra.value,inputIdSerije.value,inputIdFilma.value,inputIdKnjige.value);
        prikaz.appendChild(btnDodaj);
    }

    kreirajKorisnika(id,ime,prezime,jmbg,email,sifra,idSerije,idFilma,idKnjige){
        var korisnik=new Korisnik(id,ime,prezime,jmbg,email,sifra);
        if(idSerije=="" && idFilma==""  && idKnjige==""){
        fetch("https://localhost:44389/Korisnik/DodajKorisnika",{

        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(korisnik)
        }).then(s=>{
            if(s.ok){
                alert("Korisnik je dodat!");
            }
        })}
        else{
            fetch("https://localhost:44389/Korisnik/DodajKorisnika/"+idSerije+"/"+idFilma+"/"+idKnjige,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(korisnik)

            }).then(S=>{
                if(S.ok){
                    alert("Korisnik je dodat");
                }
            })
        }
    }

    dodajFilm(){
        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divId = document.createElement("div");
        divId.className = "DivID";
        prikaz.appendChild(divId);
        let lblID = document.createElement("label");
        lblID.className = "LblID";
        divId.appendChild(lblID);
        let inputID = document.createElement("input");
        inputID.className = "InputID";
        inputID.placeholder = "Sifra";
        divId.appendChild(inputID);

        let divNaziv = document.createElement("div");
        divNaziv.className = "DivNaziv";
        prikaz.appendChild(divNaziv);
        let lblNaziv = document.createElement("label");
        lblNaziv.className = "LblNaziv";
        divNaziv.appendChild(lblNaziv);
        let inputNaziv = document.createElement("input");
        inputNaziv.className = "InputNaziv";
        inputNaziv.placeholder = "Naziv";
        divNaziv.appendChild(inputNaziv);

        let divReziser = document.createElement("div");
        divReziser.className = "DivReziser";
        prikaz.appendChild(divReziser);
        let lblReziser = document.createElement("label");
        lblReziser.className = "LblReziser";
        divReziser.appendChild(lblReziser);
        let inputReziser = document.createElement("input");
        inputReziser.className = "InputReziser";
        inputReziser.placeholder = "Reziser";
        divReziser.appendChild(inputReziser);

        let divZanr = document.createElement("div");
        divZanr.className = "DivZanr";
        prikaz.appendChild(divZanr);
        let lblZanr = document.createElement("label");
        lblZanr.className = "LblZanr";
        divZanr.appendChild(lblZanr);
        let inputZanr = document.createElement("input");
        inputZanr.className = "InputZanr";
        inputZanr.placeholder = "Zanr";
        divZanr.appendChild(inputZanr);

        let divGlumac = document.createElement("div");
        divGlumac.className = "DivGlumac";
        prikaz.appendChild(divGlumac);
        let lblGlumac = document.createElement("label");
        lblGlumac.className = "LblGlumac";
        divGlumac.appendChild(lblGlumac);
        let inputGlumac = document.createElement("input");
        inputGlumac.className = "InputGlumac";
        inputGlumac.placeholder = "Glumac";
        divGlumac.appendChild(inputGlumac);

        let divGodinaIzdanja = document.createElement("div");
        divGodinaIzdanja.className = "DivGodinaIzdanja";
        prikaz.appendChild(divGodinaIzdanja);
        let lblGodinaIzdanja = document.createElement("label");
        lblGodinaIzdanja.className = "LblGodinaIzdanja";
        divGodinaIzdanja.appendChild(lblGodinaIzdanja);
        let inputGodinaIzdanja = document.createElement("input");
        inputGodinaIzdanja.className = "InputGodinaIzdanja";
        inputGodinaIzdanja.placeholder = "GodinaIzdanja";
        divGodinaIzdanja.appendChild(inputGodinaIzdanja);

        let divKratakOpis = document.createElement("div");
        divKratakOpis.className = "DivKratakOpis";
        prikaz.appendChild(divKratakOpis);
        let lblKratakOpis = document.createElement("label");
        lblKratakOpis.className = "LblKratakOpis";
        divKratakOpis.appendChild(lblKratakOpis);
        let inputKratakOpis = document.createElement("input");
        inputKratakOpis.className = "InputKratakOpis";
        inputKratakOpis.placeholder = "KratakOpis";
        divKratakOpis.appendChild(inputKratakOpis);

        

        let divCena = document.createElement("div");
        divCena.className = "DivCena";
        prikaz.appendChild(divCena);
        let lblCena = document.createElement("label");
        lblCena.className = "LblCena";
        divCena.appendChild(lblCena);
        let inputCena = document.createElement("input");
        inputCena.className = "InputCena";
        inputCena.placeholder = "Cena";
        divCena.appendChild(inputCena);

        let divSlika = document.createElement("div");
        divSlika.className = "DivSlika1";
        prikaz.appendChild(divSlika);
        let lblSlika = document.createElement("label");
        lblSlika.className = "LblSlika";
        divSlika.appendChild(lblSlika);
        let inputSlika = document.createElement("input");
        inputSlika.className = "InputSlika";
        inputSlika.placeholder = "Slika";
        divSlika.appendChild(inputSlika);

        let divTriler = document.createElement("div");
        divTriler.className = "DivTriler";
        prikaz.appendChild(divTriler);
        let lblTriler = document.createElement("label");
        lblTriler.className = "LblTriler";
        divTriler.appendChild(lblTriler);
        let inputTriler = document.createElement("input");
        inputTriler.className = "InputTriler";
        inputTriler.placeholder = "Triler";
        divTriler.appendChild(inputTriler);

        let btnDodaj = document.createElement("button");
        btnDodaj.className = "DodajFilm";
        btnDodaj.innerHTML = "Dodaj";
        btnDodaj.onclick = (ev) => this.kreirajFilm(inputID.value, inputNaziv.value, inputReziser.value, inputZanr.value,inputGlumac.value,inputGodinaIzdanja.value, inputKratakOpis.value,  inputCena.value, inputSlika.value, inputTriler.value);
        prikaz.appendChild(btnDodaj);
    }
    kreirajFilm(id, naziv, reziser, zanr, glumac ,godinaIzdanja, kratakOpis,  cena, slika, triler){
        var glumci =[]
        glumci = glumac.split(",");
        //glumci.push(glumac);
      
      
        var film = new Film(id, naziv, reziser, zanr, glumci, godinaIzdanja, 0, kratakOpis, cena,null, slika, triler);
     
        console.log(film);

        fetch("https://localhost:44389/Film/DodajFilm",{

        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(film)
        }).then(s=>{
            if(s.ok){
                alert("Film je dodat!");
            }
        })
        
    }
    dodajSeriju(){
        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divId = document.createElement("div");
        divId.className = "DivID";
        prikaz.appendChild(divId);
        let lblID = document.createElement("label");
        lblID.className = "LblID";
        divId.appendChild(lblID);
        let inputID = document.createElement("input");
        inputID.className = "InputID";
        inputID.placeholder = "Sifra";
        divId.appendChild(inputID);

        let divNaziv = document.createElement("div");
        divNaziv.className = "DivNaziv";
        prikaz.appendChild(divNaziv);
        let lblNaziv = document.createElement("label");
        lblNaziv.className = "LblNaziv";
        divNaziv.appendChild(lblNaziv);
        let inputNaziv = document.createElement("input");
        inputNaziv.className = "InputNaziv";
        inputNaziv.placeholder = "Naziv";
        divNaziv.appendChild(inputNaziv);

        let divReziser = document.createElement("div");
        divReziser.className = "DivReziser";
        prikaz.appendChild(divReziser);
        let lblReziser = document.createElement("label");
        lblReziser.className = "LblReziser";
        divReziser.appendChild(lblReziser);
        let inputReziser = document.createElement("input");
        inputReziser.className = "InputReziser";
        inputReziser.placeholder = "Reziser";
        divReziser.appendChild(inputReziser);

        let divGlumac = document.createElement("div");
        divGlumac.className = "DivGlumac";
        prikaz.appendChild(divGlumac);
        let lblGlumac = document.createElement("label");
        lblGlumac.className = "LblGlumac";
        divGlumac.appendChild(lblGlumac);
        let inputGlumac = document.createElement("input");
        inputGlumac.className = "InputGlumac";
        inputGlumac.placeholder = "Glumac";
        divGlumac.appendChild(inputGlumac);

        let divKratakOpis = document.createElement("div");
        divKratakOpis.className = "DivKratakOpis";
        prikaz.appendChild(divKratakOpis);
        let lblKratakOpis = document.createElement("label");
        lblKratakOpis.className = "LblKratakOpis";
        divKratakOpis.appendChild(lblKratakOpis);
        let inputKratakOpis = document.createElement("input");
        inputKratakOpis.className = "InputKratakOpis";
        inputKratakOpis.placeholder = "KratakOpis";
        divKratakOpis.appendChild(inputKratakOpis);

        let divCena = document.createElement("div");
        divCena.className = "DivCena";
        prikaz.appendChild(divCena);
        let lblCena = document.createElement("label");
        lblCena.className = "LblCena";
        divCena.appendChild(lblCena);
        let inputCena = document.createElement("input");
        inputCena.className = "InputCena";
        inputCena.placeholder = "Cena";
        divCena.appendChild(inputCena);

        let divSlika = document.createElement("div");
        divSlika.className = "DivSlika1";
        prikaz.appendChild(divSlika);
        let lblSlika = document.createElement("label");
        lblSlika.className = "LblSlika";
        divSlika.appendChild(lblSlika);
        let inputSlika = document.createElement("input");
        inputSlika.className = "InputSlika";
        inputSlika.placeholder = "Slika";
        divSlika.appendChild(inputSlika);

        let divTriler = document.createElement("div");
        divTriler.className = "DivTriler";
        prikaz.appendChild(divTriler);
        let lblTriler = document.createElement("label");
        lblTriler.className = "LblTriler";
        divTriler.appendChild(lblTriler);
        let inputTriler = document.createElement("input");
        inputTriler.className = "InputTriler";
        inputTriler.placeholder = "Triler";
        divTriler.appendChild(inputTriler);

        let lblSezona = document.createElement("label");
        lblSezona.innerHTML = "Dodaj sezonu serije: ";
        prikaz.appendChild(lblSezona);

        let divIdSezone = document.createElement("div");
        divIdSezone.className = "DivIdSezone";
        prikaz.appendChild(divIdSezone);
        let lblIdSezone = document.createElement("label");
        lblIdSezone.className = "LblIdSezone";
        divIdSezone.appendChild(lblIdSezone);
        let inputIdSezone = document.createElement("input");
        inputIdSezone.className = "InputIdSezone";
        inputIdSezone.placeholder = "Sifra sezone";
        divIdSezone.appendChild(inputIdSezone);

        let divNazivSezone = document.createElement("div");
        divNazivSezone.className = "DivNazivSezone";
        prikaz.appendChild(divNazivSezone);
        let lblNazivSezone = document.createElement("label");
        lblNazivSezone.className = "LblNazivSezone";
        divNazivSezone.appendChild(lblNazivSezone);
        let inputNazivSezone = document.createElement("input");
        inputNazivSezone.className = "InputNazivSezone";
        inputNazivSezone.placeholder = "Naziv sezone";
        divNazivSezone.appendChild(inputNazivSezone);

        let divEpizodaSezone = document.createElement("div");
        divEpizodaSezone.className = "DivEpizodaSezone";
        prikaz.appendChild(divEpizodaSezone);
        let lblEpizodaSezone = document.createElement("label");
        lblEpizodaSezone.className = "LblEpizodaSezone";
        divEpizodaSezone.appendChild(lblEpizodaSezone);
        let inputEpizodaSezone = document.createElement("input");
        inputEpizodaSezone.className = "InputEpizodaSezone";
        inputEpizodaSezone.placeholder = "Epizoda sezone";
        divEpizodaSezone.appendChild(inputEpizodaSezone);

        // let divProsecnaOcenaSezone = document.createElement("div");
        // divProsecnaOcenaSezone.className = "DivProsecnaOcenaSezone";
        // prikaz.appendChild(divProsecnaOcenaSezone);
        // let lblProsecnaOcenaSezone = document.createElement("label");
        // lblProsecnaOcenaSezone.className = "LblProsecnaOcenaSezone";
        // divProsecnaOcenaSezone.appendChild(lblProsecnaOcenaSezone);
        // let inputProsecnaOcenaSezone = document.createElement("input");
        // inputProsecnaOcenaSezone.className = "InputProsecnaOcenaSezone";
        // inputProsecnaOcenaSezone.placeholder = "Prosecna ocena sezone";
        // divProsecnaOcenaSezone.appendChild(inputProsecnaOcenaSezone);

        let divGodinaIzdavanjaSezone = document.createElement("div");
        divGodinaIzdavanjaSezone.className = "DivGodinaIzdavanjaSezone";
        prikaz.appendChild(divGodinaIzdavanjaSezone);
        let lblGodinaIzdavanjaSezone = document.createElement("label");
        lblGodinaIzdavanjaSezone.className = "LblGodinaIzdavanjaSezone";
        divGodinaIzdavanjaSezone.appendChild(lblGodinaIzdavanjaSezone);
        let inputGodinaIzdavanjaSezone = document.createElement("input");
        inputGodinaIzdavanjaSezone.className = "InputGodinaIzdavanjaSezone";
        inputGodinaIzdavanjaSezone.placeholder = "Godina izlaska sezone";
        divGodinaIzdavanjaSezone.appendChild(inputGodinaIzdavanjaSezone);

        let btnDodaj = document.createElement("button");
        btnDodaj.className = "DodajSeriju";
        btnDodaj.innerHTML = "Dodaj";
        btnDodaj.onclick = (ev) => this.kreirajSeriju(inputID.value, inputNaziv.value, inputReziser.value, inputGlumac.value,inputKratakOpis.value,  inputCena.value, inputSlika.value, inputTriler.value, inputIdSezone.value, inputNazivSezone.value, inputEpizodaSezone.value,  inputGodinaIzdavanjaSezone.value);
        prikaz.appendChild(btnDodaj);
    }
    kreirajSeriju(id, naziv, reziser, glumac, kratakOpis,  cena, slika, triler, idSezone, nazivSezone, epizodaSezone,  godinaIzlaskaSezone){
        var glumci =[]
        glumci = glumac.split(",");
        //glumci.push(glumac);
        // var kom = []
        // kom = komentari.split(",");
        //kom.push(komentari)
        var serija = new Serija(id,naziv,reziser, glumci,0,kratakOpis, cena,slika,triler, null);
        console.log(serija);

        var epizode = [];
        epizode = epizodaSezone.split(",");
        //epizode.push(epizodaSezone);
        var sezona = new Sezona(idSezone, nazivSezone, epizode,  godinaIzlaskaSezone, null);
        

        fetch("https://localhost:44389/Serija/DodajSeriju",{

        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(serija)
        }).then(s=>{
            if(s.ok){
                //alert("Serija je dodata!");
                //console.log(s);
                this.dodajSezonu(id, sezona);
            }
        })

    }
    dodajSezonu(id, sezona){
        console.log(id);
        console.log(sezona);
        fetch("https://localhost:44389/Sezona/DodajSezonu/"+id,{

        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(sezona)
         }).then(p=>{
             console.log(p)
             if(p.ok){
                alert("Serija sa sezonom je dodata!");

        
             }
            })

    }
    dodajKnjigu(){
        var prikaz = this.kontejner.querySelector(".PrikazDiv");
        var roditelj = prikaz.parentNode;
        roditelj.removeChild(prikaz);

        prikaz = document.createElement("div");
        prikaz.className = "PrikazDiv";
        roditelj.appendChild(prikaz);

        let divId = document.createElement("div");
        divId.className = "DivID";
        prikaz.appendChild(divId);
        let lblID = document.createElement("label");
        lblID.className = "LblID";
        divId.appendChild(lblID);
        let inputID = document.createElement("input");
        inputID.className = "InputID";
        inputID.placeholder = "Sifra";
        divId.appendChild(inputID);

        let divNaziv = document.createElement("div");
        divNaziv.className = "DivNaziv";
        prikaz.appendChild(divNaziv);
        let lblNaziv = document.createElement("label");
        lblNaziv.className = "LblNaziv";
        divNaziv.appendChild(lblNaziv);
        let inputNaziv = document.createElement("input");
        inputNaziv.className = "InputNaziv";
        inputNaziv.placeholder = "Naziv";
        divNaziv.appendChild(inputNaziv);

        let divAutor = document.createElement("div");
        divAutor.className = "DivAutor";
        prikaz.appendChild(divAutor);
        let lblAutor = document.createElement("label");
        lblAutor.className = "LblAutor";
        divAutor.appendChild(lblAutor);
        let inputAutor = document.createElement("input");
        inputAutor.className = "InputAutor";
        inputAutor.placeholder = "Autor";
        divAutor.appendChild(inputAutor);

        let divGodinaIzdavanja = document.createElement("div");
        divGodinaIzdavanja.className = "DivGodinaIzdavanja";
        prikaz.appendChild(divGodinaIzdavanja);
        let lblGodinaIzdavanja = document.createElement("label");
        lblGodinaIzdavanja.className = "LblGodinaIzdavanja";
        divGodinaIzdavanja.appendChild(lblGodinaIzdavanja);
        let inputGodinaIzdavanja = document.createElement("input");
        inputGodinaIzdavanja.className = "InputGodinaIzdavanja";
        inputGodinaIzdavanja.placeholder = "GodinaIzdavanja";
        divGodinaIzdavanja.appendChild(inputGodinaIzdavanja);

        let divKratakOpis = document.createElement("div");
        divKratakOpis.className = "DivKratakOpis";
        prikaz.appendChild(divKratakOpis);
        let lblKratakOpis = document.createElement("label");
        lblKratakOpis.className = "LblKratakOpis";
        divKratakOpis.appendChild(lblKratakOpis);
        let inputKratakOpis = document.createElement("input");
        inputKratakOpis.className = "InputKratakOpis";
        inputKratakOpis.placeholder = "KratakOpis";
        divKratakOpis.appendChild(inputKratakOpis);

        let divIzdavac = document.createElement("div");
        divIzdavac.className = "DivIzdavac";
        prikaz.appendChild(divIzdavac);
        let lblIzdavac = document.createElement("label");
        lblIzdavac.className = "LblIzdavac";
        divIzdavac.appendChild(lblIzdavac);
        let inputIzdavac = document.createElement("input");
        inputIzdavac.className = "InputIzdavac";
        inputIzdavac.placeholder = "Izdavac";
        divIzdavac.appendChild(inputIzdavac);

        let divZanr = document.createElement("div");
        divZanr.className = "DivZanr";
        prikaz.appendChild(divZanr);
        let lblZanr = document.createElement("label");
        lblZanr.className = "LblZanr";
        divZanr.appendChild(lblZanr);
        let inputZanr = document.createElement("input");
        inputZanr.className = "InputZanr";
        inputZanr.placeholder = "Zanr";
        divZanr.appendChild(inputZanr);

        let divBrojStrana = document.createElement("div");
        divBrojStrana.className = "DivBrojStrana";
        prikaz.appendChild(divBrojStrana);
        let lblBrojStrana = document.createElement("label");
        lblBrojStrana.className = "LblBrojStrana";
        divBrojStrana.appendChild(lblBrojStrana);
        let inputBrojStrana = document.createElement("input");
        inputBrojStrana.className = "InputBrojStrana";
        inputBrojStrana.placeholder = "BrojStrana";
        divBrojStrana.appendChild(inputBrojStrana);

        let divPovez = document.createElement("div");
        divPovez.className = "DivPovez";
        prikaz.appendChild(divPovez);
        let lblPovez = document.createElement("label");
        lblPovez.className = "LblPovez";
        divPovez.appendChild(lblPovez);
        let inputPovez = document.createElement("input");
        inputPovez.className = "InputPovez";
        inputPovez.placeholder = "Povez";
        divPovez.appendChild(inputPovez);

        let divCena = document.createElement("div");
        divCena.className = "DivCena";
        prikaz.appendChild(divCena);
        let lblCena = document.createElement("label");
        lblCena.className = "LblCena";
        divCena.appendChild(lblCena);
        let inputCena = document.createElement("input");
        inputCena.className = "InputCena";
        inputCena.placeholder = "Cena";
        divCena.appendChild(inputCena);

        let divJezik = document.createElement("div");
        divJezik.className = "DivJezik";
        prikaz.appendChild(divJezik);
        let lblJezik = document.createElement("label");
        lblJezik.className = "LblJezik";
        divJezik.appendChild(lblJezik);
        let inputJezik = document.createElement("input");
        inputJezik.className = "InputJezik";
        inputJezik.placeholder = "Jezik";
        divJezik.appendChild(inputJezik);

        let divSlika = document.createElement("div");
        divSlika.className = "DivSlika1";
        prikaz.appendChild(divSlika);
        let lblSlika = document.createElement("label");
        lblSlika.className = "LblSlika";
        divSlika.appendChild(lblSlika);
        let inputSlika = document.createElement("input");
        inputSlika.className = "InputSlika";
        inputSlika.placeholder = "Slika";
        divSlika.appendChild(inputSlika);

        let btnDodaj = document.createElement("button");
        btnDodaj.className = "DodajKnjigu";
        btnDodaj.innerHTML = "Dodaj";
        btnDodaj.onclick = (ev) => this.kreirajKnjigu(inputID.value, inputNaziv.value, inputAutor.value, inputGodinaIzdavanja.value,inputKratakOpis.value,inputIzdavac.value, inputZanr.value,inputBrojStrana.value, inputPovez.value,   inputCena.value, inputJezik.value, inputSlika.value);
        prikaz.appendChild(btnDodaj);
    }
    kreirajKnjigu(id, naziv, autor, godinaIzdavanja, kratakOpis,izdavac, zanr, brojStrana, povez,   cena, jezik, slika){

        // var kom = []
        // kom = komentari.split(",")

        // var listaKom = []
        // kom.forEach(k=>{
        //     let komentar = new Komentar(k);
        //     listaKom.push(komentar)
        // })
        ///kom.push(komentari)
        var knjiga = new Knjiga(id, naziv, autor, godinaIzdavanja, kratakOpis, izdavac, zanr, brojStrana, povez,0,  cena,jezik,slika,null);
        console.log(knjiga);

        fetch("https://localhost:44389/Knjiga/DodajKnjigu",{

        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(knjiga)
        }).then(s=>{
            if(s.ok){
                alert("Knjiga je dodata!");
            }
        })
    }
}