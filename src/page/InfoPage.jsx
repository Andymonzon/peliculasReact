import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { InfoPeliculas } from "../components/InfoPeliculas"
import { CardVideos } from "../components/CardVideos";
import { CardActores } from "../components/CardActores";
import { CardPosters } from "../components/CardPosters";

const InfoPage = () => {

    const divRef = useRef(null);

    const params = useParams()
    const [info, setInfo] = useState({})
    const [contenido, setContenido] = useState(false)

    const paramsId = params.id
    const type = params.type

    useEffect(() => {
        const hasContent = () => {
            const divElement = divRef.current;
            return (
                divElement &&
                (divElement.children.length > 0 || divElement.innerHTML.trim() !== '')
            );
        };
        setContenido(hasContent())
    }, []);

    const apiKey = import.meta.env.VITE_API_KEY

    useEffect(() => {
        const obtenerIndoPeli = async () => {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/${type}/${paramsId}?language=es-ES`, {
                    headers: {
                        accept: 'application/json',
                        Authorization: apiKey
                    }
                })
                const json = await res.json()
                setInfo(json)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerIndoPeli()
    }, [])
    return (
        <>
            <div className="px-10">
                <div className="absolute z-0 top-0 left-0 w-full h-screen" style={{
                    backgroundImage: `linear-gradient(to bottom, transparent -100%, black 100%), url('https://image.tmdb.org/t/p/original/${info.backdrop_path}')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}></div>
                <div className="relative z-40 rounded-xl p-10 h-screen flex items-center">
                    <InfoPeliculas info={info} type={type} />
                </div>
            </div>

            <div className={contenido ? "bg-black px-20 py-10 relative z-50" : ""} ref={divRef}>
                {
                    type === 'tv' &&
                    <div className="grid gap-5 text-center grid-cols-4 mt-5">
                        {
                            info.number_of_seasons &&
                            <div className="bg-zinc-800 px-4 py-2 rounded-md sombra-clara min-w-max">
                                <p className="font-bold text-xl">Temporadas: {info.number_of_seasons}</p>
                            </div>
                        }
                        {
                            info.number_of_episodes &&
                            <div className="bg-zinc-800 px-4 py-2 rounded-md sombra-clara min-w-max">
                                <p className="font-bold text-xl">Total episodios: {info.number_of_episodes}</p>
                            </div>
                        }
                        {
                            info.first_air_date &&
                            <div className="bg-zinc-800 px-4 py-2 rounded-md sombra-clara min-w-max">
                                <p className="font-bold text-xl">Fecha de inicio: {info.first_air_date}</p>
                            </div>
                        }
                        {
                            info.last_air_date &&
                            <div className="bg-zinc-800 px-4 py-2 rounded-md sombra-clara min-w-max">
                                <p className="font-bold text-xl">Finalizado el: {info.last_air_date}</p>
                            </div>
                        }
                    </div>
                }
                <div>
                    <CardVideos type={type} id={paramsId} />
                </div>
                <div>
                    <CardActores type={type} id={paramsId} />
                </div>
                <div>
                    <CardPosters type={type} id={paramsId} />
                </div>
            </div>
        </>
    )
}

export { InfoPage }