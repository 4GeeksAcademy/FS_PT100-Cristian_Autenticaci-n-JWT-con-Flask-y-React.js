import { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import userServices from "../services/userServices"
import { useNavigate } from "react-router-dom"


export const Private = () => {

    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()
    //traernos la info del usuario sin necesidad de hacer click en el boton de home
    // teniendo el token en el localStorage

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            return navigate('/login')
        }
        userServices.getUserInfo().then(data => {
            console.log(data)
            localStorage.setItem('user', JSON.stringify(data))
            dispatch({ type: 'get_user_info', payload: data })
        })

    }, [])


    const handleLogout = () => {
        dispatch({ type: 'logout' })
        navigate('/')
    }

    return (
        <>
            <h2>this is private!!!!</h2>
            <h3>only for the eyes of: {store.user?.email}</h3>

            <button onClick={handleLogout}>logout</button>
        </>
    )
}