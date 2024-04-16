import { jwtDecode } from "jwt-decode";

class AuthService {
    login(idToken){
        localStorage.setItem("id_token", idToken);
        console.log("id token:", idToken);
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
    isTokenExpired(){
        try{
            const decoded = jwtDecode(token);
            if(decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (error){
            return false;
        }
    }
    getProfile() {
        const token = this.getToken();
        return jwtDecode(token); 
    }
}

export default new AuthService();
