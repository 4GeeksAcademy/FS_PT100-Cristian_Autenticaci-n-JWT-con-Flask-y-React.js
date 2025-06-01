import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Register } from "../components/register.jsx";
import { Login } from "../components/login.jsx";
import { Private } from "../components/private.jsx";
import userServices from "../services/userServices.js";

export const Home = () => {

	const navigate = useNavigate()

	const handleProfile = () => {
		console.log('click')
		localStorage.getItem('token')? navigate('/private') : navigate('/login')
	}

	return (
		<div className="text-center mt-5">
			<h2>Welcome, go to <Link to={'/register'}>Register</Link> if you are new, else <Link to={'/login'}>Login</Link>
			Or you can go to your <span className="nav nav-link pointer" onClick={handleProfile}>Profile!</span>
			</h2>
		</div>
	);
}; 