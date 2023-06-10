import { useEffect, useState } from "react"
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { InicioCards } from "./InicioCard";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Inicio = () => {

    const [peliculas, setPeliculas] = useState([])

    const apiKey = import.meta.env.VITE_API_KEY

    useEffect(() => {
        const peliculasTop = async () => {
            const req = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1', {
                headers: {
                    accept: 'application/json',
                    Authorization: apiKey
                }
            })
            const json = await req.json()
            const res = json.results
            setPeliculas(res)
        }
        peliculasTop()
    }, [])

    return (
        <div className="w-full z-0">

            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 7000 }}
                loop={true}
            >
                {peliculas.map((pelicula) => (
                    <SwiperSlide key={pelicula.id}>
                        <InicioCards pelicula={pelicula}/>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

export { Inicio }