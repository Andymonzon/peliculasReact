import { Link } from "react-router-dom";

const InfoPeliculas = ({ info, type }) => {

    const estrellasLlenas = Math.round(info.vote_average / 2);

    return (
        <div className="flex gap-5">
            <img style={{ height: '400px' }} src={`https://image.tmdb.org/t/p/w500/${info.poster_path}`} alt={info.title || info.name} />
            <div className="flex flex-col gap-3">
                <h2 className="text-5xl font-bold">{info.title || info.name}</h2>
                <div style={{maxHeight: '100px'}} className='overflow-auto max-h-32'>
                    <p>{info.overview}</p>
                </div>
                <div className="flex items-center gap-2 font-bold">
                    <h3 className="text-xl">Lenguajes:</h3>
                    {info.original_language && !info.languages && info.original_language.toUpperCase()}
                    {
                        info.languages &&
                        info.languages.map((language, i) => (
                            <p key={i}>{language.toUpperCase()}</p>
                        ))
                    }
                </div>
                {
                    type === 'tv' ?
                        <div className="font-bold text-xl">
                            <p className={info.in_production ? 'text-green-500' : 'text-red-500'}>
                                {
                                    info.in_production ? 'En emisión' : 'Finalizado'
                                }
                            </p>
                        </div>
                        :
                        null
                }
                {
                    info.genres &&
                    <div className="flex gap-2 flex-wrap">
                        {
                            info.genres.map((genero, i) => (
                                <div key={i} className="min-w-max px-3 py-1 bg-cyan-600 rounded-xl text-white font-bold h-min">
                                    <p>{genero.name}</p>
                                </div>
                            ))
                        }
                    </div>
                }
                <div className="text-xl font-bold text-yellow-400 flex gap-2 items-center">
                    {Array.from({ length: estrellasLlenas }, (_, index) => (
                        <i key={index} className="fa fa-star"></i>
                    ))}
                    {Array.from({ length: 5 - estrellasLlenas }, (_, index) => (
                        <i key={index} className="fa fa-star-o"></i>
                    ))}
                    {
                        info.vote_average &&
                        <p className="text-white">{info.vote_average.toString().slice(0, 3)}</p>
                    }
                </div>
                <div className="flex gap-5 items-center">
                    <Link to={info.homepage} target="_blank" className="flex items-center gap-1 font-bold text-sm hover:text-sky-500">Sitio web oficial <span style={{ fontSize: '10px' }}><i className="fa-solid fa-arrow-up-right-from-square"></i></span></Link>
                </div>
            </div>
        </div>
    )
}

export { InfoPeliculas }