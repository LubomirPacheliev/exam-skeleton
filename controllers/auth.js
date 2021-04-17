export default {
    saveUserInfo: function(userData) {
        sessionStorage.setItem('user', userData);
    },
    setHeader: function(ctx) {
        ctx.isAuth = sessionStorage.getItem('user') !== null;
        ctx.user = sessionStorage.getItem('user');
    }
}