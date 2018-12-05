class Category{
    static async consultar(){
        const URL_CATEGORIA_SERVER = 'api/categories';
        try{
            const categories = await Http.get(URL_CATEGORIA_SERVER);
            console.log(categories);
            return categories;
        }catch (err){
           console.log(`Error: ${err}`); 
        }
    }
    
    static async cargarDropMenu(){
        try{
            const categorias = await Category.consultar();
            let template =
                       ` <div class="column">
                            <h3>Todos</h3>
                            <hr/>
                         <a href="#" onclick=Producto.buscarPorCategoria(0);>Ver Todos</a> 
                        </div>
                           ${categorias.map( categoria =>
                   ` <div class="column">
                               <h3>${categoria.name}</h3>
                                <hr/>
                          <a href="#" onclick=Producto.buscarPorCategoria(${categoria.id});>Todos</a>
                          ${categoria.subCat.map( sub =>
                          `<a href="#" onclick=Producto.buscarPorSubCategoria(${sub.id});>${sub.name}</a>`
                        ).join('')}</div>`
                     ).join('')}`;
           document.querySelector('#panel-dropMenu').innerHTML = template;
  
        }catch(err){
                console.log(`Error: ${err}`);
           
        }
    }
   
   static dropMenu(ev) {
    if(!ev.classList.contains("change")){
        document.querySelector('.dropdown-content').style.display='grid';
    
    }else{
        document.querySelector('.dropdown-content').style.display='none';
       
    }
    ev.classList.toggle("change"); 
}
}

Category.cargarDropMenu();