import { Link } from "react-router-dom"
import { Register } from "../components/register"

export const RegisterPage = () => {


    return (
        <>
            <Register />
            <Link to='/login'>Registered?</Link>
        </>
    )
} 