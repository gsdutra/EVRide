import Link from 'next/link';
import { useEffect, useState } from 'react';
import useApi from '@/hooks/useApi';
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from 'next/router';

export default function Menu(props: any) {
	const router = useRouter();

	const [userData, setUserData] = useState<any>();

	useEffect(() => {
		const token = localStorage.getItem("token") || "";
		const prom = useApi.get('/user', token)
			.then((e) => setUserData(e.data))
			.catch((e) => console.log(e))
	}, [props.show])

	const logout = () => {
		localStorage.setItem('token', '');
		toast('Sessão encerrada com sucesso!');
		setTimeout(() => router.push('/'), 1400);
		setTimeout(() => router.reload(), 1500);
	}

	return (<div className="relative">
		<div className={`z-10 h-screen w-[100%] bg-black absolute top-0 left-0 hidebg ${props.show ? "show" : ""}`} onClick={() => props.hide(false)} />
		<div className={`h-screen w-[60%] max-w-[350px] bg-light dark:bg-dark absolute top-0 right-0 z-20 p-14 ${props.show ? "usermenu" : "usermenuhidden"}`}>

			{userData ?
				<div className="flex flex-col justify-center items-center p-1 text-xl">

					<img src={
						userData.imageUrl || '/no_image.jpg'
					}
						className="rounded-full object-cover min-w-[220px] h-[220px] "></img>
					<p className="mt-5 text-center">Bem vindo(a), <br /></p>
					<p className="mb-16 text-center">{userData.name}</p>

					<Link href="/perfil">
						<button onClick={() => 0} className='button bt bg-blue w-[200px]'>
							EDITAR PERFIL
						</button>
					</Link>
					<button onClick={logout} className='button bt bg-gray w-[200px]'>
						ENCERRAR SESSÃO
					</button>
					<ToastContainer />
				</div>
				:
				<div className="flex flex-col justify-center items-center">
					<Link href='/signup'>
						<button onClick={() => props.hide(false)} className='button bt bg-blue w-[200px]'>
							CRIAR CONTA
						</button>
					</Link>

					<div className="mt-5" />

					<Link href='/signin'>
						<button onClick={() => props.hide(false)} className='button bt bg-gray min-w-[200px]'>
							FAZER LOGIN
						</button>
					</Link>
				</div>
			}
		</div>
	</div>)
}