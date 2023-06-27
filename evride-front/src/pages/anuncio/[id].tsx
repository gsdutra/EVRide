import { useEffect, useState, ChangeEvent, use } from 'react';
import useApi from '@/hooks/useApi';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Anuncio(props: any) {
	const router = useRouter()

	const [listing, setListing] = useState<any>();
	const [notFound, setNotFound] = useState<boolean>(false);

	const [price, setPrice] = useState<string>('');
	const [mileage, setMileage] = useState<string>('');

	const id = router.query.id;

	useEffect(() => {

		const getListings = useApi.get('/listing/get/' + router.query.id)
			.then((e) => {
				setListing(e.data)
				setNotFound(false)
			})
			.catch((e) => setNotFound(true))

	}, [id])

	useEffect(() => {
		if (!listing) return;
		setPrice(listing.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }));
		setMileage(listing.mileage.toLocaleString().replace(/,/g, '.'));
	}, [listing])

	const startChat = () => {
		const token = localStorage.getItem("token") || "";
		const checkUser = useApi.get('/user', token)
			.then((e) => {
				const listingId = listing.id;
				const sellerId = listing.sellerId;
				useApi.post('/chat', {listingId, sellerId}, token)
					.then((e) => {
						router.push('/chats/' + e.data.chatId)
					})
					.catch((e) => toast.error("Erro ao iniciar conversa."))
			})
			.catch((e) => toast.error("Você precisa estar logado para iniciar uma conversa."))
	}

	return (
		<div className="flex flex-col justify-center items-center text-xl">
			<ToastContainer />
			{
				notFound ?
					<a>Erro: anúncio não encontrado.</a>
					:
					!listing ?
						<div>
							<h1>Carregando...</h1>
						</div>
						:
						<div className="w-[100vw] flex flex-col justify-center items-center">
							<img src={listing.images[0].url} alt="" className="object-cover w-auto h-[400px]" />
							<div className="flex flex-row justify-between mt-2 w-[95vw] bg-seclight dark:bg-secdark p-4 rounded-xl">
								<div className="flex flex-col ml-3">
									<p className="text-2xl">{listing.brand.name} {listing.model.name}</p>
									<p className="text-xl">{price}</p>
								</div>
							</div>
							<button className="button bt bg-blue w-[300px]" onClick={startChat}>
								<div className="flex pl-3 pr-3 box-border items-center">
									<a className="mr-3">INICIAR CHAT COM O ANUNCIANTE</a>
									<img src="/chat.svg" className="h-[2.5rem]"></img>
								</div>
							</button>
							<div className="w-[95vw] text-left">
								<p className=" mt-4 mb-2">INFORMAÇÕES DO VEÍCULO:</p>
								<span className="text-slate-700 dark:text-slate-400">
									<p className="text-base"> Localização: {listing.city}, {listing.state}</p>
									<p className="text-base">Ano: {listing.year}</p>
									<p className="text-base">Quilometragem: {listing.mileage}</p>
									<p className="text-base">Final da placa: {listing.plateEnding}</p>
									<p className="text-base">Aceita troca: {listing.acceptsTrade ? 'Sim' : 'Não'}</p>
									<p className="text-base">Quilometragem: {mileage} km</p>
									<p className="text-base">Tipo de combustível: {
										listing.fuel === 'ELECTRIC' ? 'Elétrico' : 'Híbrido'
									}</p>
								</span>
								<p className=" mt-4 mb-2">DESCRIÇÃO:</p>
								<span className="text-slate-700 dark:text-slate-400">
									<p className="text-base mb-12">{listing.description}</p>
								</span>
							</div>
						</div>
			}
		</div>
	)
}