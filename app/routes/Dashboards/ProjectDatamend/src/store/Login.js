
import DataStore from './DataStore';

const isMock = true;
const isFail = false;

var username = null;
var jwtToken = null;
var isLoggedIn = false;


const Login = {
  setJWTToken: (xusername, xtoken) => {
    username = xusername;
    jwtToken = xtoken;
    isLoggedIn = true;
  },
  setLoggedOut: () => {
    isLoggedIn = false;
  },
  isLoggedIn: () => {
    return isLoggedIn;
  },
  getUserName: () => {
    return username;
  },
  postLogin: (obj) => {
    if (isMock) {
      var promise = new Promise((resolve,reject) => {
        if (isFail) {
          reject(Error("mock xnotes failed"));
        } else {
          resolve({ token: "jjwwtt"});
        }
      });
      return promise;
    } else {
      let url = "http://localhost:8080/api/login";
      return DataStore.innerPost(url, obj);
    }
  },
  postLogout: () => {
    let obj = {
      username: username,
      token: jwtToken
    };
    if (isMock) {
      var promise = new Promise((resolve,reject) => {
        if (isFail) {
          reject(Error("mock xnotes failed"));
        } else {
          resolve({ token: ""});
        }
      });
      return promise;
    } else {
      let url = "http://localhost:8080/api/logout";
      return DataStore.innerPost(url, obj);
    }
  }
}

Object.freeze(Login);
export default Login;
