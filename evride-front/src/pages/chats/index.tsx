import useApi from '@/hooks/useApi';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import UserNotLogged from '@/components/UserNotLogged';
import Link from 'next/link';
import Loading from '@/components/Loading';

export default function Chats() {
    const [loading, setLoading] = useState(false);

	const [userLogged, setUserLogged] = useState(true);
	const [chats, setChats] = useState<any[]>([]);

	const router = useRouter()

	useEffect(() => {
		setLoading(true)
		const token = localStorage.getItem("token") || "";
		const checkUser = useApi.get('/user', token)
			.then((e) => setUserLogged(true))
			.catch((e) => setUserLogged(false))
            .finally(()=>setLoading(false))
	}, [])

	useEffect(() => {
		if (!userLogged) return;
		setLoading(true)
		const token = localStorage.getItem("token") || "";
		const getChats = useApi.get('/chat', token)
			.then((e) => setChats(e.data))
			.catch((e) => console.log(e))
            .finally(()=>setLoading(false))
	}, [userLogged])


	return (<>
		<Loading loading={loading} />
		{userLogged ?
			<div className="w-full mt-[50px] flex flex-col justify-center items-center text-xl">
				<h1 className='w-max text-center font-bold mb-10'>Seus chats</h1>
				{chats.map((chat, i) => {
					return (<>
						<Link href={'/chats/'+chat.id} className="flex max-w-[25rem] w-full justify-start">
							<img src={chat.userImage} className="h-20 w-20 object-cover rounded-full mr-7" />
							<div>
								<a className="text-sm">{chat.userName}</a> <br />
								{chat.name}
							</div>
						</Link>
						{i === chats.length - 1 ? null :
							<div className="relative z-0 w-[60vw] h-[1px] mt-3 mb-3 bg-slate-600 opacity-50 z-10" />
						}

					</>)
				})}
			</div>
			:
			<UserNotLogged />
		}
	</>)
}