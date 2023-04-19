import { Ocena } from "./Ocena.js";
import{Komentar} from "./Komentar.js";
export class Serija{

    constructor(id,naziv,reziser,glumci, prosecnaOcena,kratakOpis,cena,slika,triler,korisnici)
    {
        this.id=id;
        this.naziv=naziv;
        this.reziser=reziser;
        this.glumci=glumci;
        this.kratakOpis=kratakOpis;
        this.komentari=[];
        this.cena=cena;
        this.slika=slika;
        this.triler=triler;
        this.sezone=[];
        this.korisnici=korisnici;
        this.prosecnaOcena = prosecnaOcena;
        this.kontejner=null;
    }

    iscrtajSeriju(host, prikaz){

        this.kontejner=document.createElement("div");
        this.kontejner.className="DivSerija";
        host.appendChild(this.kontejner);

        let divSlika=document.createElement("img");
        divSlika.className="DivSlika";
        divSlika.src = this.slika;
        this.kontejner.onclick = (ev) =>  this.prikaziSeriju(host, prikaz);
        this.kontejner.appendChild(divSlika);

        let divNaziv=document.createElement("div");
        divNaziv.className="DivNaziv";
        divNaziv.innerHTML = this.naziv;
        this.kontejner.appendChild(divNaziv);

        let br = 0;
       this.sezone.forEach(s=>{
           br+=1
       })

        let divBrojSezona=document.createElement("div");
        divBrojSezona.className="DivBrojSezona";
        divBrojSezona.innerHTML ="Broj sezona: "+ br;
        this.kontejner.appendChild(divBrojSezona);
        
        let divProsecnaOcena = document.createElement("div");
        divProsecnaOcena.className = "DivProsecnaOcena";
        
        divProsecnaOcena.innerHTML ="Prosecna ocena: "+ this.prosecnaOcena+ "/10";
        this.kontejner.appendChild(divProsecnaOcena);


   
    }
    prikaziSeriju(host, prikaz){
        console.log("PRIKAZ")
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
        divNaziv.innerHTML ="Naziv serije: "+ this.naziv;
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

        let divBrojSezona = document.createElement("div");
        divBrojSezona.className = "DivBrojSezona";
        divBrojSezona.innerHTML ="Broj sezona: "+ this.sezone.length;
        divInfo.appendChild(divBrojSezona);

        let divOpisS = document.createElement("div");
        divOpisS.className = "divOpisS";
        divOpisS.innerHTML ="Kratak opis: "+ this.kratakOpis;
        divInfo.appendChild(divOpisS);


        let btnIzmeniSeriju = document.createElement("button");
        btnIzmeniSeriju.className = "btnIzmeniSeriju";
        btnIzmeniSeriju.innerHTML = "Izmeni seriju";
        btnIzmeniSeriju.onclick = (ev) => this.izmeniSeriju(divForme,host,  prikaz);
        divForme.appendChild(btnIzmeniSeriju);


        let btnObrisiSeriju = document.createElement("button");
        btnObrisiSeriju.className = "btnObrisiSeriju";
        btnObrisiSeriju.innerHTML = "Obrisi seriju";
        btnObrisiSeriju.onclick = (ev) => this.obrisiSeriju(divForme,host,  prikaz);
        divForme.appendChild(btnObrisiSeriju);

        let btnOceniSeriju = document.createElement("button");
        btnOceniSeriju.className = "btnOceniSeriju";
        btnOceniSeriju.innerHTML = "Oceni seriju";
        btnOceniSeriju.onclick = (ev) => this.oceniSeriju(divForme,host,  prikaz);
        divForme.appendChild(btnOceniSeriju);


        
        let btnKomentrisiSeriju = document.createElement("button");
        btnKomentrisiSeriju.className = "btnKomentrisiSeriju";
        btnKomentrisiSeriju.innerHTML = "Komentarisi seriju";
        btnKomentrisiSeriju.onclick = (ev) => this.komentarisiSeriju(divForme,host,  prikaz);
        divForme.appendChild(btnKomentrisiSeriju);

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
    izmeniSeriju(divForme,host,  prikaz){
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
        let btnIzmeniSeriju = document.createElement("button");
        btnIzmeniSeriju.className = "btnIzmeniSeriju";
        btnIzmeniSeriju.innerHTML = "Izmeni naziv";
        btnIzmeniSeriju.onclick = (ev) => this.izmeniNaziv(inputNaziv.value,host,  prikaz);
        divForme.appendChild(btnIzmeniSeriju);

        let inputCena = document.createElement("input");
        inputCena.className = "InputCena";
        inputCena.placeholder = "Cena";
        divForme.appendChild(inputCena);
        let btnIzmeniCenu = document.createElement("button");
        btnIzmeniCenu.className = "btnIzmeniCenu";
        btnIzmeniCenu.innerHTML = "Izmeni cenu";
        btnIzmeniCenu.onclick = (ev) => this.izmeniCenu(inputCena.value,host,  prikaz);
        divForme.appendChild(btnIzmeniCenu);
    }
    oceniSeriju(divForme,host,  prikaz){
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
    komentarisiSeriju(divForme,host,  prikaz){
        
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
    izmeniNaziv(naziv,host,  prikaz){
        console.log(naziv);

        fetch("https://localhost:44389/Serija/IzmeniSeriju/"+this.id + "/"+naziv,
        {
           method:"PUT"
        }).then(s=>{
            if(s.ok){
                s.json().then(serija=>{
                    console.log(serija);
                    this.naziv =serija.naziv;
                    alert("Serija je izmenjena!");
                    //this.crtajFilm(host,prikaz);
                })
            }
        })
    }
    izmeniCenu(cena,host,  prikaz){
        console.log(cena);

        fetch("https://localhost:44389/Serija/IzmeniCenuSerije/"+this.id + "/"+cena,
        {
           method:"PUT"
        }).then(s=>{
            if(s.ok){
                s.json().then(serija=>{
                    console.log(serija);
                    //this.cena =serija.cena;
                    alert("Cena serije je izmenjena!");
                    //this.crtajFilm(host,prikaz);
                })
            }
        })
    }
    obrisiSeriju(divForme,host,  prikaz){
        fetch("https://localhost:44389/Serija/ObrisiSeriju/"+this.id,
        {
           method:"DELETE"
        }).then(s=>{
            if(s.ok){
               
                alert("Serija je obrisana!");
                
            }
        })

    }
    oceni(ocena,email){
        let o = new Ocena(ocena);
        fetch("https://localhost:44389/Serija/DodajOcenu/"+email+"/"+this.id,
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
                   
                    alert("Serija je ocenjena!");
                    //this.crtajFilm(host,prikaz);
                })
            }
        })
    }


    komentarisi(komentar,email){
        let k = new Komentar(komentar);
        fetch("https://localhost:44389/Serija/DodajKomentar/"+email+"/"+this.id,
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