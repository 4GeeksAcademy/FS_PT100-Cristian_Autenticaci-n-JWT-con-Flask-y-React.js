import { useState } from "react"
import userServices from "../services/userServices"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useNavigate } from "react-router-dom"

export const Register = () => {
    const { store, dispatch } = useGlobalReducer()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(formData)
        userServices.register(formData).then(data => data.success && navigate('/login'))
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input placeholder="email" name="email" value={formData.email} onChange={handleChange} type="email" />
            <input placeholder="password" name="password" value={formData.password} onChange={handleChange} type="password" />
            <input type="submit" />
        </form>

    )
}