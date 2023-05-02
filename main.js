function calculadora(dia,plantausuario){
    const date = new Date();
    let hoy = parseInt(date.getDate());
    let resultado = 0;
    // switch(ope){
    // case "AGUA":
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


// let tipo = ["interior", "exterior"];

// let riego = ["sustrato", "tierra", "hidroponia"];

// let dias = [12,33,44,65];


class planta {
    constructor(nombre, tipo, riego, cultivo, dias) {
        this.nombre = nombre.toUpperCase();
        this.tipo = tipo.toUpperCase();
        this.riego = riego.toUpperCase();
        this.cultivo = cultivo.toUpperCase();
        this.dias = dias;
    }
}

const catalogoplantas = [
    new planta("Cacao", "interior", "fertilizante", "sustrato", 7),
    new planta("Menta", "interior", "fertilizante", "hidro", 10),
    new planta("Tulipan", "exterior", "agua", "tierra", 5),
    new planta("Girasol", "interior", "fertilizante", "sustrato", 7),
    new planta("Rosa", "exterior", "agua", "tierra", 5),
    new planta("Margarita", "exterior", "agua", "tierra", 5),
]

console.log(catalogoplantas);

var cant = Number(prompt("¿Cuantas plantas posee?"));
        while (isNaN(cant)){
        cant = prompt("Ingrese un número de plantas válido");   
    }
const listadoplantasusuario = [];

for (let i = 1; i <= cant; i++){
    var dia = parseInt(prompt("¿Que número de día del mes regó la planta" + i + "?"));

        while (dia < 1 || dia > 31 || isNaN(dia)){
        dia= prompt("Ingrese un día del mes valido");   
    }

    let nombrePlanta = prompt("¿Cual es la planta" + i + " de acuerdo a nuestro catálogo?");
    nombrePlanta = nombrePlanta.toUpperCase();

    const plantausuario = catalogoplantas.find((p) => p.nombre === nombrePlanta)

    if (typeof plantausuario === "undefined") {
        // Aqui la idea seria que si la planta no esta en el catalogo que el usuario la pueda agregar
        nombrePlanta = prompt("La planta ingresada no existe en nuestro catálogo, ingrese el nombre para crearla");
        nombrePlanta = nombrePlanta.toUpperCase();
        let tipo = prompt("Que tipo de cultivo tiene(Interior o Exterior)");
        tipo = tipo.toUpperCase();
        let modoRiego = prompt("Que tipo de riego usa(Agua o Fertilizante)");
        modoRiego = modoRiego.toUpperCase();
        let cultivo = prompt("Que tipo de cultivo usa(tierra, hidro o sustrato)");
        cultivo = cultivo.toUpperCase();
        

        const buscoPlanta = catalogoplantas.find((p) => p.riego === modoRiego && p.cultivo === cultivo)
        if (typeof buscoPlanta === "undefined") {
            let diasRiego = prompt("¿Cada cuantos días riega su planta?")
            nuevaplanta = new planta(nombrePlanta, tipo, modoRiego, cultivo, diasRiego)
        } else {
            nuevaplanta = new planta(nombrePlanta, tipo, modoRiego, cultivo, buscoPlanta.dias)
        }

        catalogoplantas.push(nuevaplanta);
        regado = parseInt(calculadora(dia, nuevaplanta));

            if (regado == 0) {
        let seRiega = "Debe regar la planta " + nombrePlanta + " hoy";
        alert(seRiega);
    }else if (regado < 0){
        regado = regado * (-1);
        seRiega = "Debió regar la planta " + nombrePlanta + " hace " + regado + " días.";
        alert(seRiega);
    } else if (regado > 0) {
        seRiega = "Debe regar la planta " + nombrePlanta + " en " + regado + " días."
        alert(seRiega);
    }

    const plantaUsuarioObjeto = new planta(nuevaplanta.nombre,nuevaplanta.tipo,nuevaplanta.riego,nuevaplanta.cultivo, seRiega )    
    listadoplantasusuario.push(plantaUsuarioObjeto);
    } else {
        regado = parseInt(calculadora(dia, plantausuario));

            if (regado == 0) {
        let seRiega = "Debe regar la planta " + nombrePlanta + " hoy";
        alert(seRiega);
    }else if (regado < 0){
        regado = regado * (-1);
        seRiega = "Debió regar la planta " + nombrePlanta + " hace " + regado + " días.";
        alert(seRiega);
    } else if (regado > 0) {
        seRiega = "Debe regar la planta " + nombrePlanta + " en " + regado + " días."
        alert(seRiega);
    }

    const plantaUsuarioObjeto = new planta(plantausuario.nombre,plantausuario.tipo,plantausuario.riego,plantausuario.cultivo, seRiega )    
    listadoplantasusuario.push(plantaUsuarioObjeto);
    }
    

}

listadoplantasusuario.sort((a, b) => {
    if (a.name > b.name) {
        return 1;
    }
    if (a.name < b.name) {
        return -1;
    }

    return 0;
})

console.log(listadoplantasusuario)







