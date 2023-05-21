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

/////////////DECLARACIONES/
const catalogoplantas = [
    new planta("Cacao", "interior", "fertilizante", "sustrato", 7, 'cacao.jpg'),
    new planta("Menta", "interior", "fertilizante", "hidro", 10, 'menta.png'),
    new planta("Tulipan", "exterior", "agua", "tierra", 5, 'tulipan.jfif'),
    new planta("Girasol", "interior", "fertilizante", "sustrato", 7 , 'girasol.jfif'),
    new planta("Rosa", "exterior", "agua", "tierra", 5, 'rosa.jfif'),
    new planta("Margarita", "exterior", "agua", "tierra", 5, 'margarita.jfif'),
]

////////FUNCIONES/

function calculadora(dia, plantausuario) {
    const date = new Date();
    let hoy = parseInt(date.getDate());
    let resultado = 0;
        if(dia == hoy){
            return(plantausuario.dias);
        }else if (dia < hoy){
            resultado = hoy - dia;
            if(resultado == plantausuario.dias){
                return 0;
            }else if (resultado < plantausuario.dias){
                return(plantausuario.dias - resultado);
            }else if (resultado > plantausuario.dias){
                return(plantausuario.dias - resultado);}
        }else if (dia > hoy){
            resultado = (31 - dia) + hoy - plantausuario.dias;
            return(resultado*(-1));
        }
}

// function riego(e,nombrePlanta) {
//     const target = e.target.closest(`#${nombrePlanta}`); 

//     if (target) {
//         const planta = catalogoplantas.find((p) => p.nombre === nombrePlanta)
//         let riegonombre = document.getElementById('riegonombre');
//         riegonombre.innerHTML = `${planta.nombre}`;
//         let riegoriego = document.getElementById('riegoriego');
//         riegoriego.innerHTML = `${planta.riego}`;
//         let riegodias = document.getElementById('riegodias');
//         riegodias.innerHTML = `Se riega cada ${planta.dias} días`;
//         let sectionriego = document.getElementById('riego');
//         sectionriego.classList.remove('no-display')
//     }
// }
function filter(e) {


    let input     = document.getElementById("tipoPlanta")
    input.addEventListener("input", () => {
    localStorage.setItem("tipoPlanta", input.value)
    
})

    let filterlog;
    let botonriego = {};
    let tipoPlanta = localStorage.getItem('tipoPlanta');
    const plantafilter = catalogoplantas.filter((p) => p.tipo === tipoPlanta);
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
            div.innerHTML = `<img class="img tamaño" src="./assets/img/${planta.img}" alt="${planta.nombre}">
                    <p>  Planta: ${planta.nombre}   </p>
                    <button id="${planta.nombre}">Calcular Riego</button>`
                    ;
            div.className = "px-2  d-flex flex-column justify-content-center align-items-center filter";
            catalogo.appendChild(div);
            botonriego[planta.nombre.toUpperCase()] = document.getElementById(planta.nombre.toUpperCase());
            // if (botonriego[planta.nombre.toUpperCase()] != null) {
            botonriego[planta.nombre.toUpperCase()].addEventListener('click', function (event){
                if (event.target.tagName.toLowerCase() === 'button') {
                    // alert(event.target.id);
                    const planta = catalogoplantas.find((p) => p.nombre === event.target.id)
                    let riegonombre = document.getElementById('riegonombre');
                    riegonombre.innerHTML = `${planta.nombre}`;
                    let riegoriego = document.getElementById('riegoriego');
                    riegoriego.innerHTML = `${planta.riego}`;
                    let riegodias = document.getElementById('riegodias');
                    riegodias.innerHTML = `Se riega cada ${planta.dias} días`;
                    let sectionriego = document.getElementById('riego');
                    sectionriego.classList.remove('no-display')
                }
            },true);
            // }
        }
        

        // for (const planta2 of catalogoplantas){
        //     botonriego[planta2.nombre.toUpperCase()] = document.getElementById(planta2.nombre.toUpperCase());
        //     if (botonriego[planta2.nombre.toUpperCase()] != null) {
        //         botonriego[planta2.nombre.toUpperCase()].addEventListener('click', riego(e,planta2.nombre.toUpperCase()));
        //     }
        // }


    } else {
        e.preventDefault()
        }
}

    // let botonriegocacao = document.getElementById('CACAO');
    // if (botonriegocacao != null){
    //     botonriegocacao.addEventListener('click', riego("CACAO"));
    // }
    // let botonriegomenta = document.getElementById('MENTA');
    // if (botonriegomenta != null) {
    //     botonriegomenta.addEventListener('click', riego);
    // }
    // let botonriegotuli = document.getElementById('TULIPAN');
    // if (botonriegotuli != null) {
    //     botonriegotuli.addEventListener('click', riego);
    // }
    // let botonriegogirasol = document.getElementById('GIRASOL');
    // if (botonriegogirasol != null) {
    //     botonriegogirasol.addEventListener('click', riego);
    // }
    // let botonriegorosa = document.getElementById('ROSA');
    // if (botonriegorosa != null) {
    //     botonriegorosa.addEventListener('click', riego);
    // }
    // let botonriegomarga = document.getElementById('MARGARITA');
    // if (botonriegomarga != null) {
    //     botonriegomarga.addEventListener('click', riego);
    // }
/////////////CLASES/

///////////EVENTOS/

let botonfilter = document.getElementById('filter');

botonfilter.addEventListener('click', filter);

let botonriego = document.getElementById('btnriego');
botonriego.addEventListener('click', calculadora);
// // Esto seria para que pueda ver las plantas en la pantalla y elegir
// console.log(catalogoplantas);

// // var cant = Number(prompt("¿Cuantas plantas posee?"));
// //         while (isNaN(cant)){
// //         cant = prompt("Ingrese un número de plantas válido");
// //     }
// const listadoplantasusuario = [];

// for (let i = 1; i <= cant; i++){
//     // var dia = parseInt(prompt("¿Que número de día del mes regó la planta" + i + "?"));

//     //Valido que el dia del mes sea correcto
//         while (dia < 1 || dia > 31 || isNaN(dia)){
//         // dia= prompt("Ingrese un día del mes valido");
//     }

//     // let nombrePlanta = prompt("¿Cual es la planta" + i + " de acuerdo a nuestro catálogo?");
//     nombrePlanta = nombrePlanta.toUpperCase();

//     const plantausuario = catalogoplantas.find((p) => p.nombre === nombrePlanta)

//     if (typeof plantausuario === "undefined") {
//         // Aqui la idea seria que si la planta no esta en el catalogo que el usuario la pueda agregar
//         // nombrePlanta = prompt("La planta ingresada no existe en nuestro catálogo, ingrese el nombre para crearla");
//         nombrePlanta = nombrePlanta.toUpperCase();
//         // let tipo = prompt("Que tipo de cultivo tiene(Interior o Exterior)");
//         tipo = tipo.toUpperCase();
//         // let modoRiego = prompt("Que tipo de riego usa(Agua o Fertilizante)");
//         modoRiego = modoRiego.toUpperCase();
//         // let cultivo = prompt("Que tipo de cultivo usa(tierra, hidro o sustrato)");
//         cultivo = cultivo.toUpperCase();
        

//         const buscoPlanta = catalogoplantas.find((p) => p.riego === modoRiego && p.cultivo === cultivo)
//         if (typeof buscoPlanta === "undefined") {
//             // let diasRiego = prompt("¿Cada cuantos días riega su planta?")
//             nuevaplanta = new planta(nombrePlanta, tipo, modoRiego, cultivo, diasRiego)
//         } else {
//             nuevaplanta = new planta(nombrePlanta, tipo, modoRiego, cultivo, buscoPlanta.dias)
//         }
// //Añado la nueva planta al array
//         catalogoplantas.push(nuevaplanta);
//         regado = parseInt(calculadora(dia, nuevaplanta));

//             if (regado == 0) {
//         let seRiega = "Debe regar la planta " + nombrePlanta + " hoy";
//         // alert(seRiega);
//     }else if (regado < 0){
//         regado = regado * (-1);
//         seRiega = "Debió regar la planta " + nombrePlanta + " hace " + regado + " días.";
//         // alert(seRiega);
//     } else if (regado > 0) {
//         seRiega = "Debe regar la planta " + nombrePlanta + " en " + regado + " días."
//         // alert(seRiega);
//     }

//     const plantaUsuarioObjeto = new planta(nuevaplanta.nombre,nuevaplanta.tipo,nuevaplanta.riego,nuevaplanta.cultivo, seRiega )
//     listadoplantasusuario.push(plantaUsuarioObjeto);
//     } else {
//         regado = parseInt(calculadora(dia, plantausuario));

//             if (regado == 0) {
//         let seRiega = "Debe regar la planta " + nombrePlanta + " hoy";
//         // alert(seRiega);
//     }else if (regado < 0){
//         regado = regado * (-1);
//         seRiega = "Debió regar la planta " + nombrePlanta + " hace " + regado + " días.";
//         // alert(seRiega);
//     } else if (regado > 0) {
//         seRiega = "Debe regar la planta " + nombrePlanta + " en " + regado + " días."
//         // alert(seRiega);
//     }

//     const plantaUsuarioObjeto = new planta(plantausuario.nombre,plantausuario.tipo,plantausuario.riego,plantausuario.cultivo, seRiega )
//     listadoplantasusuario.push(plantaUsuarioObjeto);
//     }
    

// }

// listadoplantasusuario.sort((a, b) => {
//     if (a.name > b.name) {
//         return 1;
//     }
//     if (a.name < b.name) {
//         return -1;
//     }

//     return 0;
// })

// //Muestro un detalle final con toda la informacion
// console.log(listadoplantasusuario)

// for (const planta of catalogoplantas) {
//     let contenedor = document.createElement("div");
//     //Definimos el innerHTML del elemento con una plantilla de texto
//     contenedor.innerHTML = `<h3> ID: ${planta.nombre}</h3>
//                             <img src= "${planta.img}" alt="catálogo"`;
//     document.body.appendChild(contenedor);
// }


// let paginas = document.getElementById('titulo');

// paginas.innerText = 'Calculadora de Riego Profesional';
// paginas.className = 'textocentrado text-danger';



// console.log(paginas.innerHTML);

// for (const pagina of paginas) {
//     pagina.className = "textocentrado"
// }
// const content = element.innerHTML;






