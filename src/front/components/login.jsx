import { useState } from "react"
import userServices from "../services/userServices"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useNavigate } from "react-router-dom"

export const Login = () => {

    const { store, dispatch } = useGlobalReducer()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefauld();
        console.log(formData);
        userServices.login(formData).then(data => data.success && navigate('/private'))
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input placeholder="email" name="email" value={formData.email} onChange={handleChange} type="email" />
            <input placeholder="password" name="password" value={formData.password} onChange={handleChange} type="password" />
            <input type="submit" />
        </form>
    )
}