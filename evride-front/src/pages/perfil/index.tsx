import useApi from "@/hooks/useApi"
import { useEffect, useState } from "react"

export default function Perfil() {
	const [userData, setUserData] = useState<any>();

	useEffect(() => {
		const token = localStorage.getItem("token") || "";
		const prom = useApi.get('/user', token)
		.then((e) => setUserData(e.data))
		.catch((e) => console.log(e))
	}, [])
	console.log('userData: '+userData)
	return (<div className="flex flex-col items-center pt-[2rem] text-3xl">
		Dados do usuário: <br />
		<p className="break-all">{userData.email}</p>
	</div>)
}