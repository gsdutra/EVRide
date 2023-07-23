'use client'
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import useApi from '../hooks/useApi';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Link from 'next/link'
import Loading from '@/components/Loading';

export default function Signin() {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setLoading(true)
		const prom = useApi.post('/auth/signin', { email, password })
			.then(resp => {
				toast('Login efetuado com sucesso!', { type: 'success' })
				setTimeout(() => router.push('/'), 1500)
				localStorage.setItem('token', resp.data.token)
			})
			.catch(error => toast('Email ou senha incorretos! Por favor, revise seus dados.', { type: 'error' }))
			.finally(()=>setLoading(false))

	};

	return (<>
		<Loading loading={loading}/>
		<div className="mt-[50px] flex flex-col justify-center items-center">
			<a className="text-xl">Faça login na sua conta:</a>
			<ToastContainer />

			<form onSubmit={handleSubmit} className="mt-[50px] flex flex-col justify-center items-center">
				<input
					required
					className="mb-3"
					placeholder='email'
					type="email"
					id="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>

				<input
					required
					className="mb-3"
					placeholder='senha'
					type="password"
					id="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>

				<button className="button bt bg-blue w-[341px]" type="submit">LOGIN</button>
			</form>

			<Link href='/signup'>
				<button className="button bt bg-gray w-[341px]" >Não tem uma conta? Registre-se</button>
			</Link>
		</div>
	</>)
}