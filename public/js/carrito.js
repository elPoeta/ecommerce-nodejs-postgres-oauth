class Carrito{
    static mostrarCompras(){
      document.querySelector('.card-cart').classList.toggle('show-cart');
    }
    
     static async consultarCarrito(){
        const URL_CARRITO = 'api/CarritoServer';
        const carrito = await Http.get(URL_CARRITO);
            
           if(carrito.cantidadItems != 0){
              document.querySelector('#totalItems-carrito-header').innerText = carrito.cantidadItems;
              Carrito.panelCarritoConProductos(carrito);
                }                     

    }
    static async agregarProducto(id){
        const URL_CARRITO = 'api/CarritoServer';
       let carritoItem ={};
        carritoItem.producto = {};
        carritoItem.producto.id = id;
     
         if(document.querySelector('#select-'+id)){
           carritoItem.cantidad = Number(document.querySelector('#select-'+id).value) + Number(1);
        }else{
           carritoItem.cantidad = 1;
        } 
       
        const agregar = await Http.put(URL_CARRITO, carritoItem); 
        
        Carrito.consultarCarrito();
    
      
    }
    
    
    static panelCarritoConProductos(carroCompras){
        let template = ``;
        const cantidad = [1,2,3,4,5,6,7,8,9,10];
    template = 
    `<ul class="shopping-cart-items">
         ${Object.keys(carroCompras.items).map( key => 
              `<li class="item-list">
               <img src="${carroCompras.items[key].producto.imagen}" alt="item"/>
                <div class="items-desc">
                <p class="item-name">${carroCompras.items[key].producto.nombre}</p >
          <span class="item-price">$${carroCompras.items[key].producto.precio}</span>
          <span class="item-quantity">Cantidad: 
           <select id="select-${carroCompras.items[key].producto.id}" onchange="Carrito.actualizarCantidad(${carroCompras.items[key].producto.id}, value);">
                 ${cantidad.map(cant => 
                  `<option value="${cant}" ${cant == carroCompras.items[key].cantidad ? "selected" : ""}>${cant}</option>`)}         
                 </select>
          </span>
          </div>
          
          <i id="delcart-${carroCompras.items[key].producto.id}" class="fas fa-trash-alt" onclick="Carrito.quitarProducto(event,${carroCompras.items[key].producto.id})"></i>
        </li>`).join('')}
        </ul> <a href="#" class="btn-finalizarCompra" onclick="Checkout.finalizarCompra();">Finalizar Compra</a>`;
  
         document.querySelector('#totalItems-carrito-panel').innerText = carroCompras.cantidadItems;
         document.querySelector('#totalPrecio-carrito').innerText = carroCompras.total;
         document.querySelector('#panel-cart').innerHTML = template;
    
  }

static async actualizarCantidad(id, cantidad){
  
    const URL_CARRITO = 'api/CarritoServer';
     let carritoItem ={};
        carritoItem.producto = {}
        carritoItem.producto.id = id;
        carritoItem.cantidad = cantidad;
        
        const actualizar = await Http.put(URL_CARRITO, carritoItem); 
        Carrito.consultarCarrito();    
}

 static async quitarProducto(event,id){
        const URL_CARRITO = 'api/CarritoServer?&q=';
        const param = {"id": "" + id};
        
         const quitar = await Http.delete(URL_CARRITO + JSON.stringify(param)); 
      
                if (event.target.className ==='fas fa-trash-alt') {
                   
                      event.target.parentElement.remove();
            
                   let carroCompras = await quitar;
                   carroCompras.cantidadItems = (carroCompras.cantidadItems == undefined) ? 0 : carroCompras.cantidadItems; 
                  
                  if(carroCompras.cantidadItems == 0){
                        
                     Carrito.panelCarritoVacio();
                   }
              
                   Carrito.consultarCarrito();
            }
      
     
   
    }

    static panelCarritoVacio(){
    document.querySelector('#totalPrecio-carrito').innerText = "0,00";
    document.querySelector('#totalItems-carrito-panel').innerText = "0";
    document.querySelector('#totalItems-carrito-header').innerText = "0";
    document.querySelector('#panel-cart').innerHTML  = "";
   
    }
}

Carrito.consultarCarrito();


        /*
        for (let clave in  carroCompras.items){
       if (carroCompras.items.hasOwnProperty(clave)) {
            template += 
                  `
                     <ul class="shopping-cart-items">
                    <li class="item-list">
                      <img src="${carroCompras.items[clave].producto.imagen}" alt="item" />
                      <div class="items-desc">
                      <p class="item-name">${carroCompras.items[clave].producto.nombre}</p >
                      <span class="item-price">$${carroCompras.items[clave].producto.precio}</span>
                      <span class="item-quantity">Cantidad: <select id="select-${carroCompras.items[clave].producto.id}" onchange="Carrito.actualizarCantidad(${carroCompras.items[clave].producto.id}, value)">`;
                             cantidad.map(cant => {
                                template += `<option value="${cant}" ${cant == carroCompras.items[clave].cantidad ? "selected" : ""}>${cant}</option>`;
                                   });         
                             template += `</select></span>
                      </div>
                      
                      <i id="delcart-${carroCompras.items[clave].producto.id}" class="fas fa-trash-alt" onclick="Carrito.quitarProducto(event,${carroCompras.items[clave].producto.id})"></i>
                    </li>`;
            }
        }   
        
        template += `</ul> <a href="#" class="btn-finalizarCompra" onclick="Checkout.finalizarCompra();">Finalizar Compra</a>`; */
       