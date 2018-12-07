class Checkout{
     static async verCompra(){
 
        const URL_CARRITO = 'api/CarritoServer';
      try{
        const data = await Http.get(URL_CARRITO);
            
            let template= 
                    `<section class="seccion-compras">
                      <ul>
                     ${Object.keys(data.items).map( clave => 
                         `<li class="lista-compras"><img src="${data.items[clave].producto.imagen}"/>
                            <h2>${data.items[clave].producto.nombre}</h2>
                            <p>$ ${data.items[clave].producto.precio} x ${data.items[clave].cantidad} &nbsp; <span class="subtotal">subtotal $${data.items[clave].subtotal}</span></p>
                        </li><hr/>`
                    ).join('')}
                        </ul>
                       <div class="contenedor-total-btn">
                             <h2>Total Compra $ ${data.total} / U$$ ${Number(data.total/40)}</h2>  
                         </div>
                     </section>`;
            
            document.querySelector('#panel-central').innerHTML = template;         
            document.querySelector('#paypal-button').style.display="inline-block";
        }             
        catch(error){  
          console.log(error); 
        }
    }
    
    static CompraConfirmada(){
           const template =
                   `</section>
                        <div class="modal-finCompra">
                            <div class="modal-contenido">
                                <div class="modal-titulo">
                                    <h2>Gracias por su compra</h2>
                                </div>
                                <div class="modal-cuerpo">
                                    <p>Compra finalizada con exito.</p>
                                    <p>Disfrute de su elección</p>
                                    <p>Gracias por elegirnos!!</p>
                                </div>
                              <div class="modal-pie">
                                <a href="index.html"><h3>Continuar Comprando</h3></a>
                              </div>
                            </div>
                        </div>
                    </section>`;
            Checkout.vaciarCarrito();        
            document.querySelector('#paypal-button').style.display="none";
            document.querySelector('#panel-central').innerHTML = template;
       }
       
    static async finalizarCompra(){
       const URL_FINALIZAR_COMPRA_SERVER_PRIVADO = 'api/privado/FinalizarCompraServer'; 
        try{
            const compra = await Http.get(URL_FINALIZAR_COMPRA_SERVER_PRIVADO);
      
             if(compra !== null && compra !=='error'){
                Checkout.verCompra();
             }else{
                  const urlHistory={"url":"FinalizarCompra"};
                   sessionStorage.setItem("history", JSON.stringify(urlHistory));
                   window.location.replace("login.html");
        }
        }catch(error){
              console.log(error);
              window.location.replace("login.html");

        }
                    
    }    

          
   static async vaciarCarrito(){
      const URL_FINALIZAR_COMPRA_SERVER_PRIVADO = 'api/privado/FinalizarCompraServer'; 
       await  Http.post(URL_FINALIZAR_COMPRA_SERVER_PRIVADO);  
    }   
}

