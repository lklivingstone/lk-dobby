import { publicRequest } from "../API/RequestMethods"
import { loginFailure, loginStart, loginSuccess } from "./UserRedux"
import axios from "axios"

export const login = async (dispatch, user) => {
    dispatch(loginStart())

    try{
        const res= await publicRequest.post("/api/auth/login", user)
        dispatch(loginSuccess(res.data))
    }catch(err) {
        dispatch(loginFailure())
    }
}

export const register = async (user) => {
    try{
        user= {
            username: user['username'],
            email: user['email'],
            password: user['password'],
            firstname: user['firstname'],
            lastname: user['lastname'],
        }
        
        const response= await publicRequest.post("/api/auth/register", user)

        return {
            status: 200,
            message: response.data
        }
    }catch(err) {

        return {
            status: 400,
            message: err['response']['data']
        }
    }
}

