import axiosInstance from "../AxiosInstance";


export const loginUser = async(payload:any)=>{

    try {
          const res = await axiosInstance.post("/auth/login", payload);
          return res.data;
        }catch(err){
            console.log(err);
        }
        
    
}

export const adduser = async(payload:any)=>{

    try{
       const res = await axiosInstance.post("/auth/addUser", payload);
      
       return res.data;
    }catch(err){
        console.log(err)
    }
}

export const addbook = async(payload:any)=>{
    try{
       const res = await axiosInstance.post("books/addbook",payload);
       return res.data;
    }catch(err){
        console.log(err);
    }
}

export const updatebook = async(id:any,payload:any)=>{

    try{
        const res = await axiosInstance.put(`/books/update/${id}`,payload);
        return res.data;
    }catch(err){
        console.log(err);
    }
}

export const deletebook = async(id:any)=>{

try{
       const res = await axiosInstance.delete(`books/deletebook/${id}`);
       return res.data;
    }catch(err){
        console.log(err);
    }
}
export const updateStatus = async(payload:any)=>{
    const {id} = payload;
    try{
        const res = await axiosInstance.patch(`book/updatestatus/${id}`,payload);
        return res.data

    }catch(err){
        console.log(err);
    }
}
export const getbooks = async()=>{
    try{
        const res = await axiosInstance.get('/books/mybook');
       return res.data;    
    }catch(err){
        console.log(err);
    }
}

export const getallbooks = async()=>{
    try{
      const res = await axiosInstance.get('/books/allbooks');
      return res.data;
    }catch(err){
        console.log(err);
    }
}