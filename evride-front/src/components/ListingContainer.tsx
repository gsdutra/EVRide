import Link from 'next/link';

export default function ListingContainer(props: any) {
	const price = props.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
	const mileage = props.mileage.toLocaleString().replace(/,/g, '.');

	return (
	<Link href={`/anuncio/${props.id}`}>
		<div className="bg-seclight dark:bg-secdark w-[363px] h-[305px] rounded-[20px] m-4 button">
			<div className="flex flex-col">
				<div className="flex flex-row justify-center">
					<img alt="img" className="object-cover w-[340px] h-[200px] mt-3 rounded-[20px]" src={props.images[0].url} />
				</div>
				<div className="flex flex-row justify-between mt-2">
					<div className="flex flex-col ml-3">
						<p className="text-lg font-bold">{props.brand} {props.model}</p>
						<p className="text-base">{price}</p>
						<p className="text-sm">{props.city}, {props.state}</p>
					</div>
					<div className="flex flex-col mr-3 text-right">
						<p className="text-base">{mileage} km</p>
						<p className="text-base">{props.year}</p>
					</div>
				</div>
			</div>
		</div>
	</Link>)
}