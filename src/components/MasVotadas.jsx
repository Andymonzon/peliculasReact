import { useEffect, useState } from "react"
import { ModalCard } from "./ModalCard"

const MasVotadas = () => {

    const [tipo, setTipo] = useState('movie')
    const [top, setTop] = useState([])
    const [loading, setLoading] = useState(false)

    const apiKey = import.meta.env.VITE_API_KEY

    useEffect(() => {
        const obtenerTop = async () => {
            setLoading(true)
            const req = await fetch(`https://api.themoviedb.org/3/${tipo}/top_rated?language=es-ES&page=1`, {
                headers: {
                    accept: 'application/json',
                    Authorization: apiKey
                }
            })
            const json = await req.json()
            const res = json.results
            setTop(res)
            setInterval(() => setLoading(false), 2000)
        }
        obtenerTop()
    }, [tipo])

    return (
        <div>
            <div className="px-10">
                <h2 className="text-5xl font-bold my-10">{tipo === 'movie' ? 'Películas' : 'Series'} Destacadas</h2>
                <div className="mb-5">
                    <button onClick={() => setTipo('movie')} className={tipo === 'movie' ? "py-1 px-4 bg-slate-700 rounded-l-full" : "py-1 px-4 bg-slate-800 rounded-l-full"}>Películas</button>
                    <button onClick={() => setTipo('tv')} className={tipo === 'tv' ? "py-1 px-4 bg-slate-700 rounded-r-full" : "py-1 px-4 bg-slate-800 rounded-r-full"}>TV</button>
                </div>
            </div>

            <div className="relative px-10">
                <ModalCard data={top} loading={loading} type={tipo} />
            </div>
        </div>
    )
}

export { MasVotadas }