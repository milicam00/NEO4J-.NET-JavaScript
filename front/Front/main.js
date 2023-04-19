import { Film } from "./Film.js";
import { Filmovizija } from "./Filmovizija.js";
import { Komentar } from "./Komentar.js";

let listaFilmova = [];

fetch("https://localhost:44389/Film/PreuzmiFilmove",{
    method:"GET"
}).then(data=>{
    data.json().then(filmovi=>{
        console.log(filmovi)
        filmovi.forEach(f=>{
            console.log(f)
            let film = new Film(f.id, f.naziv, f.reziser, f.zanr, f.glumci, f.godinaIzdanja,f.prosecnaOcena,  f.kratakOpis,  f.cena, f.korisnici, f.slika, f.triler);
            listaFilmova.push(film);
            f.komentari.forEach(k=>{
                let komentar = new Komentar(k.sadrzaj)
                film.komentari.push(komentar)
            })
        })
        console.log(listaFilmova);
        let filmovizija = new Filmovizija(listaFilmova);
        // listaFilmova.forEach(f=>{
        //     filmovizija.preuzmiKomentareFilma(f.id);
        //     //filmovizija.preuzmiProsecnuOcenuFilma(f.id);
        // })
        filmovizija.crtajFilmove(document.body)
    })
})