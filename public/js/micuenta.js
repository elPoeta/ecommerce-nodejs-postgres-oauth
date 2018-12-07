class MiCuenta{
    static async consultarCompras(){
        const URL_MIS_COMPRAS_SERVER = 'api/privado/MisCompras';
        
        const misCompras = await Http.get(URL_MIS_COMPRAS_SERVER);
        console.log('compras>> ',misCompras);
       
        let template = 
                ` <div class="timeline">
                    <div class="timeline-body">
                         ${misCompras.map(mc => 
                            `<div class="timeline-item">
                                <p class="time">${mc.fechaCreacion.month}/${mc.fechaCreacion.year}</p>
                                    <div class="content">
                                        <h2 class="title">Mi compra el ${mc.fechaCreacion.day}/${mc.fechaCreacion.month}/${mc.fechaCreacion.year}</h2>
                                        <ul class="shopping-cart-items">
                                        ${Object.keys(mc.items).map( key =>
                                           `                    
                                            <li class="item-list">
                                            <img src="${mc.items[key].producto.imagen}" alt="item" />
                                        <div class="items-desc">
                                        <span class="item-quantity">${mc.items[key].producto.nombre}</span>
                                         <span class="item-quantity">Cantidad: ${mc.items[key].cantidad}</span>
                              </div>
                                 <i id="add-${mc.items[key].producto.id}" class="fas fa-cart-plus" onclick="Carrito.agregarProducto(${mc.items[key].producto.id})"></i>
                                              </li>       
                                            `).join('')}
                                       </ul>         
                            </div>`).join('')}
                    </div>
                 </div>`;  
        
        document.querySelector('#panel-micuenta').innerHTML = template;
    }
    
    static verMenu(){
        document.querySelector('.panel-usuario').classList.toggle('hide-panel-usuario');
        document.querySelector('#paypal-button').style.display="none";
        let template =
                `<div id="tab-micuenta" class="tabcontent">
                    <h2>Mi Cuenta</h2>
                    <p>Consultar o actualizar mis datos.</p>
                </div>

                <div id="tab-miscompras" class="tabcontent">
                     <h2>Mis Compras</h2>
                     <p>Historial de compras.</p> 
                </div>

                <div id="tab-sugerencias" class="tabcontent">
                    <h2>Sugerencias</h2>
                    <p>Envianos tus sugerencias.</p>
                </div>

                <div id="tab-novedades" class="tabcontent">
                    <h2>Novedades</h2>
                    <p>Novedades, promos, notificaciones, informacion.</p>
                    </div>

            <button class="tablink" onclick="MiCuenta.abrirPanelCuenta('tab-micuenta', this, '#933157')" id="defaultOpen">Mi Cuenta</button>
            <button class="tablink" onclick="MiCuenta.abrirPanelCuenta('tab-miscompras', this, '#BA5D7E')">Mis Compras</button>
            <button class="tablink" onclick="MiCuenta.abrirPanelCuenta('tab-sugerencias', this, '#DC93AF')">Sugerencias</button>
            <button class="tablink" onclick="MiCuenta.abrirPanelCuenta('tab-novedades', this, '#AB5586')">Novedades</button>

            <div id="panel-micuenta"></div>`;
      
        document.querySelector('#panel-central').innerHTML = template;
        document.querySelector("#defaultOpen").click();
    }
    
   static abrirPanelCuenta(btnTabid, elmnt, color) {
  
    let i, tabcontent, tablinks;
    tabcontent = document.querySelectorAll(".tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.querySelectorAll(".tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

   
    document.querySelector('#'+btnTabid).style.display = "block";
            if(btnTabid == 'tab-micuenta'){
                document.querySelector('#panel-micuenta').innerHTML = "Mi Cuenta !!!";
            }
             if(btnTabid == 'tab-miscompras'){
                MiCuenta.consultarCompras();
            }
             if(btnTabid == 'tab-sugerencias'){
                document.querySelector('#panel-micuenta').innerHTML = "Sugerencias !!!";
            }
             if(btnTabid == 'tab-novedades'){
                document.querySelector('#panel-micuenta').innerHTML = "Novedades !!!";
            }

    elmnt.style.backgroundColor = color;
}
}
