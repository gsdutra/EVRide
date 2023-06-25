import Link from "next/link";

export default function UserNotLogged() {
	return(
		<div className="mt-[50px] flex flex-col justify-center items-center text-xl">
		<a>Ops! Parece que você não está logado.</a>
		<a className='mb-12'>Crie uma conta ou inicie uma sessão para continuar.</a>

		<Link href='/signup'>
			<button className='button bt bg-blue w-[341px]'>
				CRIAR CONTA
			</button>
		</Link>

		<Link href='/signin'>
			<button className='button bt bg-gray w-[341px]'>
				FAZER LOGIN
			</button>
		</Link>
	</div>
	)
}