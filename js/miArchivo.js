let promo1= "Hamburguesa + papas + bebida";
let promo2= "Hamburguesa de lentejas + papas + bebida";
let promo3= "Hamburguesa triple + papas grandes + bebida grande";
let precio1= 500;
let precio2= 600;
let precio3= 700;
let precioTotal = 0;

const suma=(a,b)=>a+b;  

function promocion() {
    alert("Promoción 1: " +promo1+"\nPrecio: $"+precio1+"\nPromoción 2: " +promo2+"\nPrecio: $"+precio2+"\nPromoción 3: " +promo3+"\nPrecio: $"+precio3)
}

function solicitud() {
    let promoPedida =prompt("Qué promoción desea ordenar?"+"\n(Ingrese solamente el número)")
    if (promoPedida ==1){
        precioTotal = suma(parseInt(precioTotal),parseInt(precio1)) ;
        alert("El precio total a pagar es: $" + parseInt(precioTotal));
    }
    else if (promoPedida==2){
        precioTotal = suma(parseInt(precioTotal),parseInt(precio2));
        alert("El precio total a pagar es: $" + parseInt(precioTotal));
    }
    else if( promoPedida==3 ){
        precioTotal = suma(parseInt(precioTotal),parseInt(precio3));
        alert("El precio total a pagar es: $" + parseInt(precioTotal));
    }
}

function agregar() {
    let agregar=prompt("Desea hacer otro pedido?"+"\nsi o no");
    while(agregar=="si"){
        solicitud();
    agregar =prompt("Desea hacer otro pedido?"+"\nsi o no");
    }
    alert("Acerquese a la caja para abonar un total de : "+"\n$ "+precioTotal)
}

promocion();
solicitud();
agregar();