import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from '../api'
import { REFRESH_TOKEN,ACCESS_TOKEN } from "../constants"
import { useState } from "react"

function ProtectedRoute({children}){
    const [isAutherised,setIsAutherised]=useState(null)

    const refreshToken =async ()=>{
        const refreshToken =localStorage.getItem(REFRESH_TOKEN)
        try{
            const res=await api.post("/api/token/refresh",{refresh:refreshToken});
            if(res.status==200){
                localStorage.setItem(ACCESS_TOKEN,res.data.access)
                setIsAutherised(True)
            }
            else{
                setIsAutherised(False)
            }

        } catch (error){
            console.log(error)
            setIsAutherised(false)
        }


    }

    const auth =async ()=>{
        const token =localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsAutherised(false)
            return
        }
        const  decoded=jwtDecode(token)
        const tokenExpiration=decoded.exp 
        const now=Date.now()/1000

        
    }

    if (isAutherised==null){
        return <div>Loading...</div>
    }

    return isAutherised ? children:<Navigate to="/login"/>
}

export default ProtectedRoute