import axios from "axios";
axios.defaults.timeout = 5000;
axios.defaults.baseURL = "/api";
/* 
    封装一个get方法
*/

function get(url, params = {}) {
  let token = sessionStorage.getItem("token")
    ? sessionStorage.getItem("token")
    : "";
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: "get",
      baseURL: axios.defaults.baseURL,
      params,
      header: {
        'Authorization': token
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/* 使用axios封装post请求 */

function post(url,data = {}){
    let token = sessionStorage.getItem('token')?sessionStorage.getItem('token'):'';
    return new Promise((resolve,reject)=>{
        axios({
            url,
            method:'post',
            baseURL:axios.defaults.baseURL,
            data,
            header:{
                'Authorization':token
            }
        }).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export {
    get,
    post,
}