class Auth {

    setStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getStorage = (key) => {
        return JSON.parse(localStorage.getItem(key));
    }

    isLoggedIn = () => {
        const token = this.getStorage('token');
        return token ? true : false;
    }

    getBaseURL = () => {
        return 'http://localhost:1000/api'
    }

    getToken = () => {
        return this.getStorage('token');
    }

    getUsername = () => {
        const user = this.getStorage('user');
        return user.username;
    }

    logout = (cb) => {
        localStorage.clear();
        cb();
    }

}

export default new Auth();