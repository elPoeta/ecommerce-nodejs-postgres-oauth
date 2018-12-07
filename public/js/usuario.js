class Usuario{
    static async consultar(){
        const URL_AUTH = 'user/authenticated';
        const user = await Http.get(URL_AUTH);
       
        if(user.id){
            const login = document.querySelector('.login')
            login.innerText = user.name;
            login.removeAttribute('id');
            login.setAttribute('id','logout-header');
            login.setAttribute('href','#');
        }else{
            document.querySelector('.login').innerText = 'Login';
        }
        
    }
    
    static panelUser(){
       
        const div = document.createElement('div');
        const ul = document.createElement('ul');
        const liCuenta = document.createElement('li');
        const liLogout = document.createElement('li');
        const linkCuenta = document.createElement('a');
        const linkLogout = document.createElement('a');
        
        div.className= 'panel-usuario hide-panel-usuario';
        let t = document.createTextNode("Mi cuenta"); 
        linkCuenta.setAttribute('href','#');
        linkCuenta.appendChild(t);
        linkCuenta.className = "menu-usuario";
        linkCuenta.setAttribute('id', `miCuenta`);
        linkCuenta.setAttribute("onclick", "MiCuenta.verMenu();");
        liCuenta.appendChild(linkCuenta);
        t = document.createTextNode("Cerrar sesion"); 
    
        linkLogout.setAttribute('href','/user/logout');
        linkLogout.className = "menu-usuario";
        linkLogout.setAttribute('id', `logout`);
        linkLogout.appendChild(t);
        liLogout.appendChild(linkLogout);
    
        ul.appendChild(liCuenta);
        ul.appendChild(liLogout);
    
        div.appendChild(ul);
        
        document.querySelector('.header').appendChild(div);
}
  
}

 Usuario.consultar();

