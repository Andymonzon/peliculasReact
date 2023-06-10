import { useEffect, useState } from "react"
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, Pagination]);

const CardPosters = ({ id, type }) => {

    const [posters, setPosters] = useState([])

    const apiKey = import.meta.env.VITE_API_KEY

    useEffect(() => {
        const obtenerPosters = async () => {
            const req = await fetch(`https://api.themoviedb.org/3/${type}/${id}/images`, {
                headers: {
                    accept: 'application/json',
                    Authorization: apiKey
                }
            })
            const json = await req.json()
            const res = json.posters.splice(0, 10)
            setPosters(res)
        }
        obtenerPosters()
    }, [id, type])

    return (
        <>
            <h2 className="text-4xl font-bold my-10">Posters</h2>
            <div>
                <Swiper
                    spaceBetween={0}
                    slidesPerView={5}
                    navigation
                    className="select-none"
                >
                    {
                        posters.map((poster, i) => (
                            <SwiperSlide key={i}>
                                <div key={i}>
                                    <img style={{ height: '300px' }} src={`https://image.tmdb.org/t/p/w500/${poster.file_path}`} alt="" />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </>
    )
}

export { CardPosters }