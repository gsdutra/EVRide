import useApi from "@/hooks/useApi"
import { useEffect, useState } from "react"
import Loading from '@/components/Loading';

export default function Perfil() {
    const [loading, setLoading] = useState(false);

	const [userData, setUserData] = useState<any>();

	useEffect(() => {
		setLoading(true)
		const token = localStorage.getItem("token") || "";
		const prom = useApi.get('/user', token)
			.then((e) => setUserData(e.data))
			.catch((e) => console.log(e))
            .finally(()=>setLoading(false))
	}, [])
	console.log('userData: ' + userData)
	return (<>
		<Loading loading={loading} />
		<div className="flex flex-col items-center pt-[2rem] text-3xl">
			Dados do usuário: <br />
			<p className="break-all">{userData}</p>
		</div>
	</>)
}