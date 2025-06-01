import React from "react";
import { useNavigate, Link } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Register } from "../components/register.jsx";
import { Login } from "../components/login.jsx";
import { Private } from "../components/private.jsx";
import userServices from "../services/userServices.js";

export const Home = () => {
	const navigate = useNavigate();

	const handleProfile = () => {
		localStorage.getItem("token") ? navigate("/private") : navigate("/login");
	};

	return (
		<div className="text-center mt-5">
			<h1>Bienvenido</h1>
			<h2>Para poder registrarte pulse aquí:</h2>
			<Link className="fs-2 fw-bold" to="/register">Registro</Link>
			<h2>Para poder logearte pulse aquí:</h2>
			<Link className="fs-2 fw-bold" to="/login">Login</Link>
			<h2>O puedes ir a tu perfil pulsando aquí:
			<span className="nav nav-link pointer text-primary" onClick={handleProfile}>Profile!</span>
			</h2>
		</div>
	);
};