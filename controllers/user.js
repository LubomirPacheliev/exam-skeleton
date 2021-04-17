import { login, logout, registerUser } from '../models/user.js';
import commonPartial from './partials.js';
import auth from './auth.js';

export default {
    getRegister: function(ctx) {
        ctx.loadPartials(commonPartial).partial('./view/user/register.hbs');
    },
    postRegister: function(ctx) {
        const {email, password, repeatPassword} = ctx.params;
        console.log(password, email);
        if (password !== repeatPassword) throw new Error('YOUR PASS DONT MATCH THE REPASS, DUMMIE');
        registerUser(email, password)
        .then(res => {
            auth.saveUserInfo(res.user.email);
            ctx.redirect('#/home');
        })
        .catch(e => console.log(e));
    },
    getLogout: function(ctx) {
        logout()
        .then(() => {
            sessionStorage.clear();
            ctx.redirect('#/home');
        })
        .catch(e => console.log(e));
    },
    getLogin: function(ctx) {
        ctx.loadPartials(commonPartial).partial('./view/user/login.hbs');
    },
    postLogin: function(ctx) {
        const {email, password} = ctx.params;
        login(email, password)
        .then(res => {
            auth.saveUserInfo(res.user.email);
            ctx.redirect('#/home');
        })
        .catch(e => console.log(e));
    }
}