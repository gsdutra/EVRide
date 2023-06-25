import { useState, FormEvent, ChangeEvent, useRef } from 'react';
import useApi from '../hooks/useApi';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Link from 'next/link'

export default function Signup() {
	const router = useRouter();

	const [email, setEmail] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [type, setType] = useState<string>('personal');
	const [password, setPassword] = useState<string>('');
	const [passwordRepeat, setPasswordRepeat] = useState<string>('');
	const [picture, setPicture] = useState<File>();
	const [pictureUrl, setPictureUrl] = useState<string>('');

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (password !== passwordRepeat) {
			toast('As senhas não coincidem', { type: 'error' })
			return;
		}
		if (password.length < 5) {
			toast('A senha deve ter ao menos 5 caracteres', { type: 'error' })
			return;
		}
		const prom = useApi.post('/auth/signup', { email, name, type, password, pictureUrl })
			.then(r => {
				toast('Registro efetuado com sucesso!', { type: 'success' })
				setTimeout(() => router.push('/signin'), 1000)
			})
			.catch(e => toast('Algo deu errado! Por favor, revise seus dados.', { type: 'error' }))

	};

	const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setPicture(e.target.files[0]);
		}
	};

	const hiddenFileInput: any = useRef(null);

	const handleClick = () => {
		hiddenFileInput.current.click();
	  };

	return (<div className="mt-[50px] flex flex-col justify-center items-center">
		<a className="text-xl">Insira seus dados para criar sua conta:</a>
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
				placeholder='nome de usuário'
				type="text"
				id="name"
				value={name}
				onChange={e => setName(e.target.value)}
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
			<input
				required
				className="mb-3"
				placeholder='repetir senha'
				type="password"
				id="passwordRepeat"
				value={passwordRepeat}
				onChange={e => setPasswordRepeat(e.target.value)}
			/>

			<input
				className="mb-3"
				placeholder='URL da imagem de perfil'
				type="url"
				id="passwordRepeat"
				value={pictureUrl}
				onChange={e => setPictureUrl(e.target.value)}
			/>

			<select value={type} onChange={e => setType(e.target.value)}
				className="mb-3">
				<option value="personal">Pessoa física</option>
				<option value="store">Loja</option>
			</select>

			{/* <input
				type="file"
				className="hidden"
				onChange={handlePictureChange}
				ref={hiddenFileInput}
			/>
			<button className="button w-[320px] h-[50px] mb-3 border-solid border-2 border-blue"
			onClick={handleClick}>Selecionar foto de perfil</button>

			{picture? 
			<p className="mb-3 text-green-500">
				✓ Foto selecionada com sucesso
			</p>
			:''} */}

			<button className="button bt bg-blue mt-2 w-[341px]" type="submit">REGISTRAR</button>
		</form>

		<Link href='/signin'>
			<button className="button bt bg-gray w-[341px]" >Já tem conta? Faça login</button>
		</Link>


	</div>)
}