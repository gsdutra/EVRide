import useApi from "@/hooks/useApi"
import { useEffect, useState } from "react"

export default function User() {
	const [userData, setUserData] = useState();

	useEffect(() => {
		const token = localStorage.getItem("token") || "";
		const prom = useApi.get('/user', token)
		.then((e) => setUserData(e.data))
		.catch((e) => console.log(e))
	}, [])
	console.log('userData: '+userData)
	return (<div className="flex flex-col items-center pt-[2rem] text-3xl">
		Dados do usuário: <br />
		<p className="break-all">{JSON.stringify(userData)}</p>
	</div>)
}