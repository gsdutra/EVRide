import { useEffect, useState, ChangeEvent, use, FormEvent } from 'react';
import useApi from '@/hooks/useApi';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import axios from 'axios';
import ListingContainer from '@/components/ListingContainer';
import Loading from '@/components/Loading';
import Image from 'next/image';

export default function Anuncios() {
	const [listings, setListings] = useState<object[]>([]);
	const [loading, setLoading] = useState(false)

	const [brand, setBrand] = useState<string>('');
	const [model, setModel] = useState<string>('');

	const [searchQueryString, setSearchQueryString] = useState<string>('');

	useEffect(() => {
		setLoading(true)
		const getListings = useApi.get('/listing' + searchQueryString)
			.then((e) => setListings(e.data))
			.catch((e) => console.log(e))
			.finally(() => setLoading(false))
	}, [searchQueryString])

	const handleSearch = (e: FormEvent) => {
		e.preventDefault();
		setSearchQueryString(`?brand=${brand}&model=${model}`)
	}

	return (<>
		<Loading loading={loading} />
		<div className="w-max">
			<div className="mt-[50px] flex flex-col justify-center items-center text-xl">
				<form className='bg-white border-black flex w-[90vw] h-[40px] rounded-[20px] mb-3' onSubmit={handleSearch}>
					<input
						className="mb-3 w-[40vw] h-[40px] bg-transparent active:bg-transparent focus:text-black text-black"
						placeholder='Marca'
						type="text"
						id="brand"
						value={brand}
						onChange={e => setBrand(e.target.value)}
					/>
					<input
						className="mb-3 w-[40vw] h-[40px] bg-transparent active:transparent focus:transparent text-black"
						placeholder='Modelo'
						type="text"
						id="model"
						value={model}
						onChange={e => setModel(e.target.value)}
					/>
					<button className="button" type="submit">
						<Image src='/search.svg' alt='pesquisar' width={30} height={30}/>
					</button>

				</form>
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