function calculadora (dia , ope){
    const date = new Date();
    let hoy = parseInt(date.getDate());
    let resultado = 0;
    switch(ope){
    case "AGUA":
        if(dia == hoy){
            return(4);
        }else if (dia < hoy){
            resultado = hoy - dia;
            if(resultado == 4){
                return 0;
            }else if (resultado < 4){
                return(7 - resultado);
            }else if (resultado > 4){
                return(7 - resultado);}
        }else if (dia > hoy){
            resultado = (31 - dia) + hoy - 4;
            return(resultado);
        }

    case "FERTILIZANTE":
        if(dia == hoy){
            return(7);
        }else if (dia < hoy){
            resultado = hoy - dia;
            if(resultado == 7){
                return 0;
            }else if (resultado < 7){
                return(7 - resultado);
            }else if (resultado > 7){
                return(7 - resultado);}
        }else if (dia > date){
            resultado = (31 - dia) + hoy - 7;
            return(resultado);
        }

    default:
        return (console.log("No ingresó un tipo de riego admitido"));
}
}

var cant = parseInt(prompt("¿Cuantos plantas posee?"));

for (let i = 1; i <= cant; i++){
    var dia = parseInt(prompt("¿Que número de día del mes regó la planta" + i + "?"));
    let tipo = prompt("Agua o fertilizante");
    tipo = tipo.toUpperCase;

    while (tipo != "AGUA" && tipo != "FERTILIZANTE"){
        tipo = prompt("Ingrese Agua o fertilizante");   
        tipo = tipo.toUpperCase();
    }

    regado = parseInt(calculadora(dia,tipo.toUpperCase()));
    if (regado == 0){
        alert("Debe regar la planta " + i + " hoy");
    }else if (regado < 0){
        regado = regado * (-1);
        alert("Debió regar la planta " + i + " hace " + regado + " días.");
    }else if (regado > 0){
        alert("Debe regar la planta " + i + " en " + regado + " días.");
    }
}







