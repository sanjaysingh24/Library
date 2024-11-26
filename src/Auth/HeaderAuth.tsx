import { Navigate,Outlet } from "react-router-dom";
const HEadersAuth = () => {
   let token = localStorage.getItem('token');
    
      return token?<Outlet></Outlet>:<Navigate to="/"/>
    }
    
    export default HEadersAuth