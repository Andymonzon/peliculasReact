import { useEffect, useState } from "react"
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, Pagination]);
const CardVideos = ({ id, type }) => {

    const [keyVideos, setKeyVideos] = useState([])

    const apiKey = import.meta.env.VITE_API_KEY

    useEffect(() => {
        const obtenerVideos = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?language=es-MX`, {
                headers: {
                    accept: 'application/json',
                    Authorization: apiKey
                }
            })
            const json = await res.json()
            const resultdo = json.results
            setKeyVideos(resultdo)
        }
        obtenerVideos()
    }, [id, type])

    if (keyVideos.length === 0) {
        return null;
    }

    return (
        <>
            <h2 className="text-4xl font-bold my-10">Trailers</h2>
            <div className="flex gap-10">
                {
                    keyVideos.length > 4 ?
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={4}
                            navigation
                            className="select-none"
                        >
                            {
                                keyVideos.map((video, i) => (
                                    <SwiperSlide key={i}>
                                        <iframe
                                            key={i}
                                            style={{ height: '250px', width: '280px' }}
                                            className="w-full"
                                            allowFullScreen
                                            src={`https://www.youtube.com/embed/${video.key}`} frameBorder="0"></iframe>
                                    </SwiperSlide>

                                ))
                            }
                        </Swiper>
                        :

                        keyVideos.map((video, i) => (
                            <iframe
                                key={i}
                                style={{ height: '250px', width: 'auto' }}
                                className="w-full"
                                allowFullScreen
                                src={`https://www.youtube.com/embed/${video.key}`} frameBorder="0"></iframe>
                        ))

                }
            </div>

        </>
    )
}

export { CardVideos }