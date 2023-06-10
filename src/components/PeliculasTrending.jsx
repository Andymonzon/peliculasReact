import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import { useEffect, useState } from "react";
import { ModalCard } from "./ModalCard";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const PeliculasTrending = () => {

    const [trending, setTrending] = useState([])
    const [loading, setLoading] = useState(false)

    const apiKey = import.meta.env.VITE_API_KEY
    
    useEffect(() => {
        const obtenerTrending = async () => {
            setLoading(true)
            const req = await fetch('https://api.themoviedb.org/3/trending/all/day?language=es-ES', {
                headers: {
                    accept: 'application/json',
                    Authorization: apiKey
                }
            })
            const json = await req.json()
            const res = json.results
            setTrending(res)
            setInterval(() => setLoading(false), 2000)
        }
        obtenerTrending()
    }, [])

    return (
        <div className="relative px-10">
            <h2 className="text-5xl font-bold my-10">Tendencias</h2>
            <ModalCard data={trending} loading={loading}/>
        </div>
    )
}

export { PeliculasTrending }