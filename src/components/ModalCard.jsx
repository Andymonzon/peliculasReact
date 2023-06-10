import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { LoaderCard } from "./LoaderCard";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const ModalCard = ({ data, loading, type}) => {
    return (
        <Swiper
            spaceBetween={10}
            slidesPerView={6}
            navigation
            className="btn-custom"
        >
            {
                data.map((data) => (
                    <SwiperSlide key={data.id}>
                        {
                            !loading ?
                                <div style={{ width: '190px' }} className="flex flex-col max-h-full gap-4 text-center">
                                    <a href={`/info/${type ? type : data.media_type}/${data.id}`}>
                                        <img className="rounded-md" src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${data.poster_path}`} alt={data.title} />
                                    </a>

                                    <h3 className="font-bold mb-3">{data.title || data.name}</h3>
                                </div> :
                                <div style={{ minWidth: '190px', minHeight: '300px' }} className="flex flex-col gap-4 items-center justify-center">
                                    <LoaderCard />
                                </div>
                            }
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

export { ModalCard }