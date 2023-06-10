import { useEffect, useRef, useState } from "react"
import { Loader } from "./Loader"
import { Link } from "react-router-dom"

const Header = () => {

    const [form, setForm] = useState('')
    const [peliEncontrada, setPeliEncontrada] = useState([])
    const [seleccionado, setSeleccionado] = useState(false)
    const [loading, setLoading] = useState(false)
    const [mostrarMensaje, setMostrarMensaje] = useState(false)

    const listRef = useRef(null);

    const handleChange = (e) => {
        setForm(e.target.value)
        if (e.target.value === '') {
            setMostrarMensaje(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setForm('')
    }

    const handleFocus = () => {
        setSeleccionado(true)
    }

    const handleClickOutside = (event) => {
        if (listRef.current && !listRef.current.contains(event.target)) {
            setSeleccionado(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const apiKey = import.meta.env.VITE_API_KEY

    const buscar = async () => {
        setLoading(true)
        setMostrarMensaje(false)
        try {
            const obtenerInfo = await fetch(`https://api.themoviedb.org/3/search/multi?query=${form}&language=es-MX`, {
                headers: {
                    accept: 'application/json',
                    Authorization: apiKey
                }
            })
            const data = await obtenerInfo.json()
            const peliculasEncontradas = data.results
            setPeliEncontrada(peliculasEncontradas)
            if (peliculasEncontradas.length === 0) {
                setMostrarMensaje(true)
            }
            setTimeout(() => setLoading(false), 1200)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (form) {
            buscar()
        } else {
            return setPeliEncontrada([])
        }
    }, [form])

    return (
        <header className="flex justify-between items-center py-3 px-10 absolute left-0 top-0 z-50 w-full">
            <h3 className="text-4xl font-bold">MV.TV</h3>

            <nav className="flex gap-3 p-2 font-bold items-center">
                <div className="relative font-normal" ref={listRef}>
                    <div style={{ width: '250px' }}>
                        <form onSubmit={handleSubmit} className="relative hover:text-cyan-400">
                            <input type="text" placeholder="Buscar..." className="hover:text-white w-full pr-9 px-2 py-1 bg-slate-800 outline-0 rounded-md" onChange={handleChange} value={form} onFocus={handleFocus} />
                            <button className="bg-transparent absolute p-0 right-0" style={{ height: '31px', width: '40px' }}>
                                <span><i className="fa-solid fa-magnifying-glass"></i></span>
                            </button>
                        </form>
                    </div>
                    {seleccionado &&
                        <div style={{ maxHeight: '425px' }} className="overflow-auto absolute top-10 right-0 min-w-full bg-slate-900 sombra rounded-xl">
                            {loading &&
                                <div className="p-3 "><Loader /></div>
                            }
                            {!loading &&
                                peliEncontrada.map(pelicula => (
                                    <div key={pelicula.id} className="p-3 border-b-2 border-slate-800">
                                        <a href={`/info/${pelicula.media_type}/${pelicula.id}`}>
                                            <div className="flex gap-3 hover:text-sky-400 ease-in-out duration-300" style={{ maxWidth: '250px' }}>
                                                <img className="rounded-md" style={{ height: '80px' }} src={`https://image.tmdb.org/t/p/w200/${pelicula.poster_path || pelicula.backdrop_path}`} alt={pelicula.title} />
                                                <div className="flex flex-col gap-2" style={{
                                                    overflow: 'hidden',
                                                }}>
                                                    <h3 className="text-sm" style={{
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    }}>{pelicula.title || pelicula.name}</h3>
                                                    <div className="flex text-center bg-sky-500 w-max px-2 py-1 text-white rounded-xl">
                                                        <p className="font-bold text-xs">{pelicula.media_type === 'movie' ? 'Pelicula' : 'TV'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))
                            }
                            {
                                !loading && peliEncontrada.length === 0 && mostrarMensaje &&
                                <div className="p-3 text-center">
                                    <h3>No se encontraron resultados</h3>
                                </div>
                            }
                        </div>
                    }
                </div>

                <Link to='/' className='hover:text-cyan-400'>Inicio</Link>
            </nav>
        </header>
    )
}

export { Header }