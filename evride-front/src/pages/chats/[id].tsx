import useApi from '@/hooks/useApi';
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react';
import UserNotLogged from '@/components/UserNotLogged';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from '@/components/Loading';

export default function Chat() {
	const router = useRouter()
    const [loading, setLoading] = useState(false);

	const bottomRef = useRef<HTMLDivElement>(null);

	const [userLogged, setUserLogged] = useState(true);
	const [update, setUpdate] = useState(false);
	const [chatData, setChatData] = useState<any>({
		messages: [],
		seller: { imageUrl: '' },
		buyer: { imageUrl: '' },
		listing: { brand: { name: '' }, model: { name: '' } }
	});
	const [as, setAs] = useState<string>('buyer');
	const [userId, setUserId] = useState<number>(0);
	const [inputMessage, setInputMessage] = useState<string>('');
	const [chatLength, setChatLength] = useState<number>(0);

	const id = router.query.id;

	setInterval(() => {
		setUpdate(!update)
	}, 5000)

	useEffect(() => {
		//setLoading(true)
		const token = localStorage.getItem("token") || "";
		const checkUser = useApi.get('/user', token)
			.then((e) => {
				setUserLogged(true)
				setUserId(e.data.id)
			})
			.catch((e) => setUserLogged(false))
            .finally(()=>setLoading(false))
	}, []);

	useEffect(() => {
		if (!userLogged) return;
		//setLoading(true)
		const token = localStorage.getItem("token") || "";
		const getMessages = useApi.get('/chat/' + id, token)
			.then((e) => {
				setChatData(e.data.chat)
				setAs(e.data.as)
			})
			.catch((e) => console.log(e))
            .finally(()=>setLoading(false))
	}, [userLogged, update, id]);

	useEffect(() => {
		const bottomElement = bottomRef.current;
		if (bottomElement && chatLength < chatData.messages.length) {
			setChatLength(chatData.messages.length);
			setTimeout(() => { bottomElement.scrollIntoView({ behavior: 'smooth' }) }, 100);
		}
	}, [chatLength, chatData.messages]);

	const handleSendMessage = () => {
		const token = localStorage.getItem("token") || "";
		if (inputMessage === '' || !inputMessage) return;
		//setLoading(true)
		const sendMessage = useApi.post('/chat/message', { message: inputMessage, chatId: id }, token)
			.then((e) => {
				setInputMessage('')
				setUpdate(!update)
			})
			.catch((e) => toast.error('Erro ao enviar mensagem, verifique sua conexão.'))
            .finally(()=>setLoading(false))
	}

	return (<>
		<Loading loading={loading} />
		{userLogged ?
			<div className="mt-[50px] flex flex-col justify-center items-center text-xl">
				<ToastContainer />
				<div className="bg-seclight dark:bg-secdark max-w-[600px] h-24 w-full flex items-center pl-4 pr-4 rounded-3xl mb-2 fixed top-24 z-20">
					{as === 'buyer' ?
						<>
							<img src={chatData.seller.imageUrl} className="h-20 w-20 object-cover rounded-full mr-7" />
							<div>
								<p className="text-sm">{chatData.seller.name}</p>
								<p>{chatData.listing.brand.name + ' ' + chatData.listing.model.name}</p>
							</div>
						</>
						:
						<>
							<img src={chatData.buyer.imageUrl} className="h-20 w-20 object-cover rounded-full mr-7" />
							<div>
								<p className="text-sm">{chatData.buyer.name}</p>
								<p>{chatData.listing.brand.name + ' ' + chatData.listing.model.name}</p>
							</div>

						</>
					}
				</div>

				<div className='max-w-[600px] w-full flex flex-col mt-28 h-[64vh] overflow-y-scroll'>
					{chatData.messages.map((message: any, i: number) => {
						return (
							<>
								{
									message.senderId == userId ?
										<div className="bg-blue max-w-[500px] text-black m-2 p-3 text-right self-end rounded-full rounded-br-lg" key={i}>
											{message.message}
										</div>
										:
										<div className="bg-seclight max-w-[500px] dark:bg-secdark m-2 p-3 text-right self-start rounded-full rounded-bl-lg" key={i}>
											{message.message}
										</div>
								}
							</>
						)
					})}
					<div ref={bottomRef}></div>
				</div>

				<div className='flex fixed bottom-4 z-20'>
					<input type="text"
					placeholder="Digite uma mensagem"
					className="bg-seclight dark:bg-secdark max-w-[600px] h-24 w-full flex items-center pl-4 pr-4 rounded-l-full mb-2"
					value={inputMessage}
					onChange={(e) => setInputMessage(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							handleSendMessage()
						}
					}} />
					<button className="text-black button bg-blue h-24 w-32 flex items-center justify-center rounded-r-full" onClick={handleSendMessage}>Enviar</button>

				</div>

				{/* <div className="fixed z-10 w-full h-[120px] bg-light dark:bg-dark top-20"></div> */}
				{/* <div className="fixed z-10 w-full h-[125px] bg-light dark:bg-dark bottom-0"></div> */}

			</div>
			:
			<UserNotLogged />}
	</>)
}