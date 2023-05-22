/////////////CLASES/
class planta {
    constructor(nombre, tipo, riego, cultivo, dias, img) {
        this.nombre = nombre.toUpperCase();
        this.tipo = tipo.toUpperCase();
        this.riego = riego.toUpperCase();
        this.cultivo = cultivo.toUpperCase();
        this.dias = dias;
        this.img = img;
    }
}

class nuevaplanta {
    constructor(nombre, tipo, riego, cultivo, dias, img) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.riego = riego;
        this.cultivo = cultivo;
        this.dias = dias;
        this.img = img;
    }
}
///////////DECLARACIONES/
let catalogoplantas = [
    new planta("Cacao", "interior", "fertilizante", "sustrato", 7, 'cacao.jpg'),
    new planta("Menta", "interior", "fertilizante", "hidro", 10, 'menta.png'),
    new planta("Tulipan", "exterior", "agua", "tierra", 5, 'tulipan.jfif'),
    new planta("Girasol", "interior", "fertilizante", "sustrato", 7 , 'girasol.jfif'),
    new planta("Rosa", "exterior", "agua", "tierra", 5, 'rosa.jfif'),
    new planta("Margarita", "exterior", "agua", "tierra", 5, 'margarita.jfif'),
]

const catalogoLS = JSON.parse(localStorage.getItem('catalogoplantas'));
if (catalogoLS) {
    catalogoplantas = catalogoLS;
};
////////FUNCIONES/

function calculadora(dia, plantausuario) {
    const date = new Date();
    let hoy = parseInt(date.getDate());
    let resultado = 0;
    if (dia == hoy) {
        // return(plantausuario.dias);
        resultado = plantausuario.dias;
    } else if (dia < hoy) {
        resultado = hoy - dia;
        if (resultado == plantausuario.dias) {
            resultado = 0;
                
        } else if (resultado < plantausuario.dias) {
            resultado = plantausuario.dias - resultado;
        } else if (resultado > plantausuario.dias) {
            resultado = plantausuario.dias - resultado;
        } else if (dia > hoy) {
            resultado = (31 - dia) + hoy - plantausuario.dias;
            resultado = resultado * (-1);
        }
    }
            
        let parrafo = document.getElementById("parrafo");
        if (parrafo != null) {
            parrafo.remove();
        };

            // Esto sera un alert luego 
        const modalConteiner = document.getElementById("modalConteiner");
        modalConteiner.innerHTML="";
        modalConteiner.style.display = "flex";
        const modalPlanta = document.createElement("div");
        modalPlanta.className = "modal-carrito";
        if (resultado == 0) {
            modalPlanta.innerHTML = `<p id="parrafo">  Debe regar ${plantausuario.nombre} hoy. </p>`;
        } else if (resultado < 0) {
            resultado = resultado * (-1);
            modalPlanta.innerHTML = `<p id="parrafo">  Debió regar ${plantausuario.nombre} hace ${resultado} días. </p>`;
        } else if (resultado > 0) {
            modalPlanta.innerHTML = `<p id="parrafo">  Debe regar ${plantausuario.nombre} en ${resultado} días. </p>`;
        }
        modalConteiner.append(modalPlanta);

    //////// booton
        const boton = document.createElement("h1");
        boton.innerText = "X";
        boton.className = "boton-x";
        boton.addEventListener ("click", () =>{
            modalConteiner.style.display= "none";
        })
        modalPlanta.append(boton);
    }
    


function filter(e) {

    let sectioncrear = document.getElementById('sectioncrear');
    sectioncrear.classList.add('no-display');
    let filterlog;
    let botonriego = {};            
    let tipoPlanta = sessionStorage.getItem('tipoPlanta');
    const catalogoLS = JSON.parse(localStorage.getItem('catalogoplantas'));
    if (catalogoLS) {
        catalogoplantas = catalogoLS;
    }
    let plantafilter = [];

    if (tipoPlanta == null) {
        tipoPlanta = "INTERIOR";
    };
        plantafilter = catalogoplantas.filter((p) => p.tipo === tipoPlanta);
    
    let catalogo = document.getElementById("catalogo");
    let img = document.getElementsByClassName("img");
    if (img.length == 0 || tipoPlanta != filterlog) {
        filterlog = tipoPlanta;
        if (img.length != 0) {
            let sectionriegoini = document.getElementById('riego');
            sectionriegoini.classList.add('no-display');
            let divdelete = document.getElementsByClassName("filter");
            const divlenght = divdelete.length;
            for (let i = 0; i < divlenght; i++) {
                divdelete[0].remove();
            }
        }
        for (const planta of plantafilter) {
            let div = document.createElement("div");
            div.id = planta.nombre + "id";
            div.innerHTML = `<img class="img tamaño" src="./assets/img/${planta.img}" alt="${planta.nombre}">
                    <p>  Planta: ${planta.nombre}   </p>
                    <button id="${planta.nombre}">Calcular Riego</button>
                    <button id="${planta.nombre}del">Eliminar del catálogo</button>`
                ;

            div.className = "px-2  d-flex flex-column justify-content-center align-items-center filter";
            catalogo.appendChild(div);
            const boton = document.getElementById(planta.nombre + "del")
            boton.addEventListener("click", (event) => {
                if (event.target.tagName.toLowerCase() === 'button') {
                    const deleteplanta = document.getElementById(planta.nombre + "id");
                    deleteplanta.remove();
                    const catalogoLS = JSON.parse(localStorage.getItem('catalogoplantas'));
                    catalogoLS.splice(catalogoLS.findIndex(a => a.nombre === planta.nombre) , 1)
                    localStorage.setItem('catalogoplantas', JSON.stringify(catalogoLS));
                    catalogo = catalogoLS;
                    const riego = document.getElementById("riego");
                    riego.classList.add("no-display");
                }
            });
            botonriego[planta.nombre.toUpperCase()] = document.getElementById(planta.nombre.toUpperCase());
            botonriego[planta.nombre.toUpperCase()].addEventListener('click', function (event){
                if (event.target.tagName.toLowerCase() === 'button') {
                    let parrafo = document.getElementById("parrafo");
                    if (parrafo != null) {
                        parrafo.remove();
                    };
                    const planta = catalogoplantas.find((p) => p.nombre === event.target.id)
                    let riegonombre = document.getElementById('riegonombre');
                    riegonombre.innerHTML = `${planta.nombre}`;
                    let riegoriego = document.getElementById('riegoriego');
                    riegoriego.innerHTML = `${planta.riego}`;
                    let riegodias = document.getElementById('riegodias');
                    riegodias.innerHTML = `Se riega cada ${planta.dias} días`;
                    let sectionriego = document.getElementById('riego');
                    sectionriego.classList.remove('no-display')
                    sessionStorage.setItem("CalculoPlanta",event.target.id )
                }
            },true);
        }
        

    } else {
        e.preventDefault()
        }
}

///////////EVENTOS/
const inputplanta     = document.getElementById("tipoPlanta")
    inputplanta.addEventListener("input", () => {
        sessionStorage.setItem("tipoPlanta", inputplanta.value)
    
    });

const botonfilter = document.getElementById('filter');

botonfilter.addEventListener('click', filter);

const botonriego = document.getElementById('btnriego');
botonriego.addEventListener('click', function (event) {
        let sectioncrear = document.getElementById('sectioncrear');
        sectioncrear.classList.add('no-display');
        let nombrePlanta = sessionStorage.getItem('CalculoPlanta');
        let dia = document.getElementById('riegoinput');
        const plantausuario = catalogoplantas.find((p) => p.nombre === nombrePlanta);
        calculadora(dia.value, plantausuario);

    });

    const botoncrear = document.getElementById('crear');
    
    botoncrear.addEventListener('click', function (event) {
    let sectioncrear = document.getElementById('sectioncrear');
    sectioncrear.classList.remove('no-display');
    let sectionriegoini = document.getElementById('riego');
    sectionriegoini.classList.add('no-display');
    let divdelete = document.getElementsByClassName("filter");
    const divlenght = divdelete.length;
    for (let i = 0; i < divlenght; i++) {
        divdelete[0].remove();
    }
    let creartipo = document.getElementById('crearPlanta');
    localStorage.setItem('crearPlanta', creartipo.value);
});

const botonconfirmar = document.getElementById('confirmarcrear');

botonconfirmar.addEventListener('click', function (event) {
    if (event.target.tagName.toLowerCase() === 'button') {
        let tipo = localStorage.getItem('crearPlanta');
        let nombre = document.getElementById('crearnombre');
        let riego = document.getElementById('crearriego');
        let cultivo = document.getElementById('crearcultivo');
        let dias = document.getElementById('creardias');
        let img = document.getElementById('crearimg');
        const form = document.getElementById('sectioncrear');
        form.className = "no-display";
        const plantans = new planta(nombre.value,tipo,riego.value,cultivo.value,dias.value,img.value);
        
        const catalogoLS = JSON.parse(localStorage.getItem('catalogoplantas'));
        catalogoLS.push(plantans);
        localStorage.setItem('catalogoplantas', JSON.stringify(catalogoLS));

        // Esto sera un alert luego 
        const modalConteiner = document.getElementById("modalConteiner");
        modalConteiner.innerHTML="";
        modalConteiner.style.display = "flex";
        const modalPlanta = document.createElement("div");
        modalPlanta.className = "modal-carrito";
        modalPlanta.innerHTML =`<h2 class="modal-carrito-text">Su planta se ha creado exitosamente</h2>`
        modalConteiner.append(modalPlanta);

    //////// booton
        const boton = document.createElement("h1");
        boton.innerText = "X";
        boton.className = "boton-x";
        boton.addEventListener ("click", () =>{
            modalConteiner.style.display= "none";
        })
        modalPlanta.append(boton);
    }
} );
