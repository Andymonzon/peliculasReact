import { useEffect, useState } from "react"
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, Pagination]);

const CardActores = ({ id, type }) => {

    const [actores, setActores] = useState([])

    const apiKey = import.meta.env.VITE_API_KEY

    useEffect(() => {
        const obtenerActores = async () => {
            const req = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?language=es-MX`, {
                headers: {
                    accept: 'application/json',
                    Authorization: apiKey
                }
            })
            const json = await req.json()
            const res = json.cast.sort(
                (a, b) => b.popularity - a.popularity
            ).splice(0, 20)
            setActores(res)
        }
        obtenerActores()
    }, [id, type])

    return (
        <>
            <h2 className="text-4xl font-bold my-10">Actores</h2>
            <div>
                <div>
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={8}
                        navigation
                    >
                        {
                            actores.map((actor, i) => (
                                <SwiperSlide key={i}>
                                    <div className="flex flex-col" style={{ width: '140px' }}>
                                        <img style={{ height: '200px' }} className="rounded-md w-full" src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt={actor.original_name} />
                                        <h3 className="font-bold">{actor.name}</h3>
                                        <p className="text-sm">{actor.character}</p>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export { CardActores }