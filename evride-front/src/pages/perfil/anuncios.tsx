import { useEffect, useState, ChangeEvent, use } from 'react';
import useApi from '@/hooks/useApi';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import ListingContainer from '@/components/ListingContainer';
import UserNotLogged from '@/components/UserNotLogged';
import Loading from '@/components/Loading';

export default function Anuncios() {
    const [loading, setLoading] = useState(false);

    const [listings, setListings] = useState<object[]>([]);
    const [userData, setUserData] = useState<any>({});
    const [userLogged, setUserLogged] = useState(false);

    useEffect(() => {
        setLoading(true)
        const token = localStorage.getItem("token") || "";
        const checkUser: any = useApi.get('/user', token)
            .then((e) => {
                setUserLogged(true)
                setUserData(e.data)
            })
            .catch((e) => setUserLogged(false))
            .finally(()=>setLoading(false))
    }, [])

    useEffect(() => {
        setLoading(true)
        const getListings = useApi.get('/listing?sellerId=' + userData.id)
            .then((e) => setListings(e.data))
            .catch((e) => console.log(e))
            .finally(()=>setLoading(false))
    }, [userLogged])

    const deleteListing = (id: number) => {
        setLoading(true)
        const token = localStorage.getItem("token") || "";
        const deletedListing = useApi.delete('/listing/' + id, token)
            .then((e) => toast.success('Anúncio deletado!'))
            .catch((e) => console.log(e))
            .finally(()=>setLoading(false))
    }

    return (
        <>
            <Loading loading={loading} />
            <ToastContainer />
            {userLogged ?
                <div className="w-max">
                    <div className="mt-[50px] flex flex-col justify-center items-center text-xl">
                        <h1 className='w-max text-center font-bold'>{listings.length} {listings.length === 1 ? 'veículo encontrado' : 'veículos encontrados'}</h1>
                    </div>
                    <div className="flex w-[100vw] flex-row justify-center flex-wrap">
                        {listings.map((listing: any, i: number) => (
                            <div className="absolute" key={i}>
                                <button onClick={() => deleteListing(listing.id)}
                                    className="relative bg-red-500 w-20 h-20 rounded-full top-20 left-80 button p-4">
                                    <img src="/trash.svg"></img>
                                </button>
                                <ListingContainer
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
                            </div>
                        ))}
                    </div>
                </div>
                :
                <UserNotLogged />
            }
        </>)
}