class User{
    static async consultar(){
        const URL_AUTH = 'user/authenticated';
        const user = await Http.get(URL_AUTH);
       
        if(user.id){
            const login = document.querySelector('.login')
            login.innerText = user.name;
            login.removeAttribute('id');
            login.setAttribute('id','logout-header');
        }else{
            document.querySelector('.login').innerText = 'Login';
        }
        
    }
}