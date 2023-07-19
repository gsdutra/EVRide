import ThemeSwitch from "./ThemeSwitch"
import Link from 'next/link';

export default function Menu(props: any){
	return (<div className="relative">
	<div className={`z-10 h-screen w-[100%] bg-black absolute top-0 left-0 hidebg ${props.show?"show":""}`} onClick={()=>props.hide(false)}/>
	<div className={`h-screen w-[60%] max-w-[350px] bg-light dark:bg-dark absolute top-0 left-0 z-20 p-14 ${props.show?"menu":"menuhidden"}`}>
			<Link href='/chats'>
				<button className="text-left" onClick={()=>props.hide(false)}>Chats</button>
			</Link> <br/><br/>
			<Link href='/anunciar'>
				<button className="text-left" onClick={()=>props.hide(false)}>Anunciar veículo</button>
			</Link> <br/><br/>
			<Link href='/anuncios'>
				<button className="text-left" onClick={()=>props.hide(false)}>Procurar veículos</button>
			</Link> <br/><br/>
			<Link href='/perfil/anuncios'>
			<button className="text-left" onClick={()=>props.hide(false)}>Meus anúncios</button>
			</Link> <br/><br/>
			Esquema de cores: <br/>
			<ThemeSwitch/>
		</div>
	</div>)
}