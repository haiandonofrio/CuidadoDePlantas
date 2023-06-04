/////////////CLASES/
class planta {
    constructor(nombre, tipo, riego, cultivo, dias, img) {
        this.nombre = nombre.toLowerCase();
        this.tipo = tipo.toLowerCase();
        this.riego = riego.toLowerCase();
        this.cultivo = cultivo.toLowerCase();
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
var DateTime = luxon.DateTime;


let catalogoplantas = [];
//Si existe catalogo guardado utilizo ese sino lo obtengo del archivo json
const catalogoLS = JSON.parse(localStorage.getItem('catalogoplantas'));
if (catalogoLS) {
    catalogoplantas = catalogoLS;
} else {

    
        const url = "./js/plantas.json";
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                catalogoplantas = [...data];      
                localStorage.setItem('catalogoplantas', JSON.stringify(catalogoplantas));
            })
            .catch((error) => {
                console.error('Error fetching the JSON file:', error);
            });
}
;
////////FUNCIONES/

function calculadora(dia, plantausuario) {
    // const date = new Date();
    // let hoy = parseInt(date.getDate());
    const hoy = DateTime.now();
    hoy.toLocaleString();
    const Interval = luxon.Interval
    var dateParts = dia.split("/");

    var day = dateParts[0];    // "dia"
    var month = dateParts[1];  // mes"
    var year = dateParts[2];   // "año"
    var dt = DateTime.fromObject({
    day: day,
    month: month,
    year: year
    });
    const i = Interval.fromDateTimes(dt,hoy)
    console.log(parseInt(i.length('days')));
    let diff = parseInt(i.length('days'));
    if (Number.isNaN(diff)) {
        Swal.fire({
        title: 'Cuidado de Plantas',
        text: 'Debe ingresar una fecha anterior',
        icon: 'error',
        confirmButtonText: 'Confirmar'
        
        })
        e.preventDefault()
    }
    let resultado = 0;
    if (diff == 0) {
        // return(plantausuario.dias);
        resultado = plantausuario.dias;
    } else {

         resultado = plantausuario.dias - diff;
        // if (resultado == plantausuario.dias) {
        //     resultado = 0;
                
        // } else if (resultado < plantausuario.dias) {
        //     resultado = plantausuario.dias - resultado;
        // } else if (resultado > plantausuario.dias) {
        //     resultado = plantausuario.dias - resultado;
        // } else if (dia > hoy) {
        //     resultado = (31 - dia) + hoy - plantausuario.dias;
        //     resultado = resultado * (-1);
        // }

    }
            
        // let parrafo = document.getElementById("parrafo");
        // if (parrafo != null) {
        //     parrafo.remove();
        // };
    if ($("#parrafo")) {
        $("#parrafo").remove();
        }

            // Esto sera un alert luego
        // const modalConteiner = document.getElementById("modalConteiner");
        // $("#modalConteiner").html("");
        // $("#modalConteiner").css("style" ,"flex");
        // const modalPlanta = document.createElement("div");
        // modalPlanta.className = "modal-carrito";}
    let riego;
        if (resultado == 0) {
            riego = `Debe regar ${plantausuario.nombre} hoy.`;
        } else if (resultado < 0) {
            resultado = resultado * (-1);
           riego = `Debió regar ${plantausuario.nombre} hace ${resultado} días.`;
        } else if (resultado > 0) {
            riego = `Debe regar ${plantausuario.nombre} en ${resultado} días.`;
        }
    // $("#modalConteiner").append(modalPlanta);

            Swal.fire({
        title: 'Cuidado de Plantas',
        text: riego,
        icon: 'info',
        confirmButtonText: 'Confirmar'
        })
    

    //////// booton
        // const boton = document.createElement("h1");
        // boton.innerText = "X";
        // boton.className = "boton-p";
        // boton.addEventListener ("click", () =>{
        //     modalConteiner.style.display= "none";
        // })
        // modalPlanta.append(boton);
    }
    


function filter(e) {
    // let sectioncrear = document.getElementById('sectioncrear');
    // sectioncrear.classList.add('no-display');
    $("#sectioncrear").addClass("no-display");
    let filterlog;
    let botonriego = {};            
    let tipoPlanta = $("#tipoPlanta").val();
    const catalogoLS = JSON.parse(localStorage.getItem('catalogoplantas'));
    if (catalogoLS) {
        catalogoplantas = catalogoLS;
    }
    let plantafilter = [];

    if (tipoPlanta == null) {
        tipoPlanta = "interior";
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
                    <button class="button-p py-2" id="${planta.nombre}">Calcular Riego</button>
                    <button class="button-p py-2" id="${planta.nombre}del">Eliminar</button>`
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
            botonriego[planta.nombre.toLowerCase()] = document.getElementById(planta.nombre.toLowerCase());
            botonriego[planta.nombre.toLowerCase()].addEventListener('click', function (event){
                if (event.target.tagName.toLowerCase() === 'button') {

                    // let parrafo = document.getElementById("parrafo");
                    // if (parrafo != null) {
                    //     parrafo.remove();
                    // };
                    if ($("#parrafo")) {
                    $("#parrafo").remove();
                    }
                    const planta = catalogoplantas.find((p) => p.nombre === event.target.id)
                    let riegonombre = document.getElementById('riegonombre');
                    riegonombre.innerHTML = `${planta.nombre}`;
                    let riegoriego = document.getElementById('riegoriego');
                    riegoriego.innerHTML = `${planta.riego}`;
                    let riegodias = document.getElementById('riegodias');
                    riegodias.innerHTML = `Se riega cada ${planta.dias} días`;
                    let sectionriego = document.getElementById('riego');
                    sectionriego.classList.remove('no-display')
                    sessionStorage.setItem("CalculoPlanta", event.target.id)
                    let posicion2 = $("#riegonombre").offset().top;
                    jSuites.calendar(document.getElementById('riegoinput'),{
                    format: 'DD/MM/YYYY',
                        time: true,
                    
                    });
                    // $("#riegoinput").val() = calendar.getValue();
                    $("#riegoinput").on('onchange', function(e) {
                        console.log('New value: ' + e.target.value);
                        $("#riegoinput").val() = e.target.value;
                    });
                    $("html, body").animate({ scrollTop: posicion2 }, 100);
                }
            },true);
        }
    let posicion = $(`#${plantafilter[0].nombre}id`).offset().top;
    $("html, body").animate({ scrollTop: posicion }, 100);

    } else {
        e.preventDefault()
        }
}

///////////EVENTOS/
const inputplanta     =     document.getElementById("tipoPlanta")
    inputplanta.addEventListener("input", () => {
        sessionStorage.setItem("tipoPlanta", inputplanta.value)
    
    });

const botonfilter = document.getElementById('filter');

botonfilter.addEventListener('click', filter);

const botonriego = document.getElementById('btnriego');
botonriego.addEventListener('click', function (event) {
        // let sectioncrear = document.getElementById('sectioncrear');
        // sectioncrear.classList.add('no-display');
        $("#sectioncrear").addClass("no-display");
        let nombrePlanta = sessionStorage.getItem('CalculoPlanta');
        // let dia = document.getElementById('riegoinput');
        const plantausuario = catalogoplantas.find((p) => p.nombre === nombrePlanta);
        // calculadora(dia.value, plantausuario);
    calculadora($("#riegoinput").val(), plantausuario);

    });

    const botoncrear = document.getElementById('crear');
    
    botoncrear.addEventListener('click', function (event) {
    // let sectioncrear = document.getElementById('sectioncrear');
    // sectioncrear.classList.remove('no-display');
    $("#sectioncrear").removeClass("no-display");
    // let sectionriegoini = document.getElementById('riego');
    // sectionriegoini.classList.add('no-display');
    $("#riego").addClass("no-display");
    let posicion = $("#sectioncrear").offset().top;
    $("html, body").animate({ scrollTop: posicion }, 100);
    // let divdelete = document.getElementsByClassName("filter");
    // const divlenght = divdelete.length;
    // for (let i = 0; i < divlenght; i++) {
    //     divdelete[0].remove();
    // }
    $("#catalogo").empty();
    // let creartipo = document.getElementById('crearPlanta');
    // localStorage.setItem('crearPlanta', creartipo.value);
    localStorage.setItem('crearPlanta', $("#crearPlanta").val());
});

const botonconfirmar = document.getElementById('confirmarcrear');

botonconfirmar.addEventListener('click', function (event) {
    if (event.target.tagName.toLowerCase() === 'button') {
        let tipo = localStorage.getItem('crearPlanta');
        // let nombre = document.getElementById('crearnombre');
        // let riego = document.getElementById('crearriego');
        // let cultivo = document.getElementById('crearcultivo');
        // let dias = document.getElementById('creardias');
        // let img = document.getElementById('crearimg');
        const imgbase = "plantbase.png";
        // const form = document.getElementById('sectioncrear');
        // form.className = "no-display";
        $("#sectioncrear").addClass("no-display");
        // const plantans = new planta(nombre.value,tipo,riego.value,cultivo.value,dias.value,imgbase);
        const plantans = new planta($("#crearnombre").val(),tipo,$("#crearriego").val(),$("#crearcultivo").val(),$("#creardias").val(),imgbase);
        
        const catalogoLS = JSON.parse(localStorage.getItem('catalogoplantas'));
        catalogoLS.push(plantans);
        localStorage.setItem('catalogoplantas', JSON.stringify(catalogoLS));

    //     // Esto sera un alert luego
    //     const modalConteiner = document.getElementById("modalConteiner");
    //     modalConteiner.innerHTML="";
    //     modalConteiner.style.display = "flex";
    //     const modalPlanta = document.createElement("div");
    //     modalPlanta.className = "modal-carrito";
    //     modalPlanta.innerHTML =`<h2 class="modal-carrito-text">Su planta se ha creado exitosamente</h2>`
    //     modalConteiner.append(modalPlanta);

    // //////// booton
    //     const boton = document.createElement("h1");
    //     boton.innerText = "X";
    //     boton.className = "boton-x";
    //     boton.addEventListener ("click", () =>{
    //         modalConteiner.style.display= "none";
    //     })
    //     modalPlanta.append(boton);
            Swal.fire({
                text: 'Su planta se ha creado exitosamente',
                icon: 'success',
                confirmButtonText: 'Confirmar',
                toast: true,
    })
    }
} );
