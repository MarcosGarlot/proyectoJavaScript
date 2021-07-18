let entradaNombre = prompt ("Ingresar nombre");
let entradaApellido = prompt ("Ingresar apellido");
let entradaEdad= prompt("Ingresar edad");

if (((entradaNombre!="")&&(entradaNombre!=parseInt(entradaNombre)))&&((entradaApellido!="")&&(entradaApellido!=parseInt(entradaApellido)))&&((entradaEdad!="")&&(entradaEdad==parseInt(entradaEdad)))){
    alert("Nombre: "+entradaNombre+"\nApellido: "+entradaApellido+"\nEdad: "+entradaEdad)
}
else{
    alert("Un dato no ha sido ingresado correctamente")
}