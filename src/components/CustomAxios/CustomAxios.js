import axios from "axios";

axios.interceptors.request.use(
  
    req=>{
        if(localStorage.getItem("accessToken")){
        const AuthStr = 'Bearer '.concat(localStorage.getItem("accessToken"))
        req.headers['Authorization']=AuthStr;}
        return req
} ,err=>{
    return Promise.reject(err);
}
);

axios.interceptors.response.use(
    res=>{
        return res;
} ,err=>{
    const originalReq = err.config
    // console.log(originalReq)
    const status = err.response.status ? err.response.status : null;
    if(status === 401){
       return axios.post(`${process.env.REACT_APP_URL}/accounts/refresh-token`,{token: localStorage.getItem('refreshToken')})
        .then((response)=>{
          (localStorage.setItem("accessToken",response.data.access))
            return  axios(originalReq)
           }
          ).catch(()=>(
            localStorage.clear(),
            window.location.replace('/')
          
          )
          )
    }
    return Promise.resolve(err);
}
)

