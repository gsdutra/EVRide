import { useState, FormEvent, ChangeEvent, useRef } from 'react';
import useApi from '../hooks/useApi';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Link from 'next/link'
import { Uploader } from 'uploader';
import { UploadButton } from "react-uploader";
import Loading from '@/components/Loading';

export default function Signup() {
	const router = useRouter();

	const [email, setEmail] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [type, setType] = useState<string>('personal');
	const [password, setPassword] = useState<string>('');
	const [passwordRepeat, setPasswordRepeat] = useState<string>('');
	const [pictureUrl, setPictureUrl] = useState<string>('');

	const [loading, setLoading] = useState(false);

	const apiKey: string = process.env.IMAGE_UPLOADER_API_KEY as string;

	const uploader = Uploader({ apiKey: apiKey });

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
		if (pictureUrl === '') {
			setLoading(true);
			const prom = useApi.post('/auth/signup', { email, name, type, password })
				.then(r => {
					toast('Registro efetuado com sucesso!', { type: 'success' })
					setTimeout(() => router.push('/signin'), 1000)
				})
				.catch(e =>toast('Algo deu errado! Por favor, revise seus dados.', { type: 'error' }))
				.finally(()=>setLoading(false))
		} else {
			setLoading(true);
			const prom = useApi.post('/auth/signup', { email, name, type, password, pictureUrl })
				.then(r => {
					toast('Registro efetuado com sucesso!', { type: 'success' })
					setTimeout(() => router.push('/signin'), 1000)
					setLoading(false)
				})
				.catch(e => {
					toast('Algo deu errado! Por favor, revise seus dados.', { type: 'error' })
					setLoading(false)
				})
		}

	};

	return (<>
		<Loading loading={loading}/>
		<div className="mt-[50px] flex flex-col justify-center items-center">
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

				<div className="bg-seclight dark:bg-[#626262] w-[90%] mb-1 button p-3 pb-1 rounded-sm">
					<UploadButton
						uploader={uploader}
						options={{ multi: true }}
						onComplete={files => {
							files[0] ?
								setPictureUrl(files[0].fileUrl.replace(/\s/g, ''))
								: () => { }
						}}>
						{({ onClick }) =>
							<button onClick={onClick}>
								<div className="flex">
									<img className="w-5 mr-3" src='upload_light.svg'></img>
									<a>Escolha sua foto de perfil</a>
								</div>
							</button>
						}
					</UploadButton>
				</div>

				{pictureUrl !== '' ?
					<div className="mb-2 text-green-500">✓ Imagem selecionada</div>
					: ''}

				<select value={type} onChange={e => setType(e.target.value)}
					className="mb-3">
					<option value="personal">Pessoa física</option>
					<option value="store">Loja</option>
				</select>

				<button className="button bt bg-blue mt-2 w-[341px]" type="submit">REGISTRAR</button>
			</form>

			<Link href='/signin'>
				<button className="button bt bg-gray w-[341px]" >Já tem conta? Faça login</button>
			</Link>
		</div>
	</>)
}