import { useEffect, useState, ChangeEvent, use } from 'react';
import useApi from '@/hooks/useApi';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import axios from 'axios';
import ListingContainer from '@/components/ListingContainer';
import Loading from '@/components/Loading';

export default function Anuncios() {
	const [listings, setListings] = useState<object[]>([]);
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		const getListings = useApi.get('/listing/')
			.then((e) => setListings(e.data))
			.catch((e) => console.log(e))
			.finally(()=>setLoading(false))
	}, [])

	return (<>
		<Loading loading={loading} />
		<div className="w-max">
			<div className="mt-[50px] flex flex-col justify-center items-center text-xl">
				<h1 className='w-max text-center font-bold'>{listings.length} {listings.length === 1 ? 'veículo encontrado' : 'veículos encontrados'}</h1>
			</div>
			<div className="flex w-[100vw] flex-row justify-center flex-wrap">
				{listings.map((listing: any, i: number) => (
					<ListingContainer
						key={i}
						id={listing.id}
						images={listing.images}
						brand={listing.brand.name}
						model={listing.model.name}
						city={listing.city}
						state={listing.state}
						price={listing.price}
						year={listing.year}
						mileage={listing.mileage}
					/>
				))}
			</div>
		</div>
	</>)
}