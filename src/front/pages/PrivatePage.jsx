import { Link } from "react-router-dom"
import { Login } from "../components/login"

export const LoginPage = () => {

    return (
        <>
        <Login/>
        <Link to='/register'>Need an account?</Link>
        </>
    )
}