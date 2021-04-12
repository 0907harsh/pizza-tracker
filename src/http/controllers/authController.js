function loginController(){
    var locals_login = {
        title: 'Login Page',
        active_login:'active',
        description: 'this is the homepage',
    };
    var locals_register = {
        title: 'Register Page',
        active_register:'active',
        description: 'this is the homepage',
    };
    return {
        login(req,res){
            res.render('auth/login',{locals:locals_login})
        },
        register(req,res){
            res.render('auth/register',{locals:locals_register})
        }
    }
}

module.exports = loginController