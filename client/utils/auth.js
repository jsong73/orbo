class AuthService {
    login(idToken){
        localStorage.setItem("id_token", idToken);
        // console.log("id token:", idToken);
        window.location.assign("/tasks")
    }
    logout(){
        localStorage.removeItem("id_token")
        window.location.assign("/")
    }
    getToken(){
        return localStorage.getItem("id_token")
    }
    loggedIn(){
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }
}

export default new AuthService();
