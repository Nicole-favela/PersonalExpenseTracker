import { Navigate } from 'react-router-dom'; //moves user to different route
import Cookies from "js-cookie"

export default function VerifyAuth({children}){
    const token = Cookies.get("token");
    return token ? children : <Navigate to= "/login" replace={true}/>

}