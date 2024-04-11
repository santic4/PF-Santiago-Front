export const getHeaders = () =>{
    return {
        headers:{
            'Content-Type':'application/json',
            Accept:'application/json'
        },
        withCredentials:true,
        credentials: 'include',
        mode: 'cors', 
    }
}