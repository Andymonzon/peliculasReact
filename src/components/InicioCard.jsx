
const InicioCards = ({pelicula}) => {

    const estrellasLlenas = Math.round(pelicula.vote_average / 2);
    const urlImageOriginal = 'https://www.themoviedb.org/t/p/original/'
    const urlImage = 'https://www.themoviedb.org/t/p/w300/'

    return(
        <div className="relative">
            <img className="opacity-30" src={`${urlImageOriginal}${pelicula.backdrop_path}`} alt={pelicula.title} style={{ width: "100%", height: "100vh" }} />
            <div className="w-full h-screen flex items-center justify-center absolute z-50 top-0 left-0 flex">
                <div className="flex w-3/4 justify-center gap-10">
                    <div>
                        <img className="rounded-2xl" src={`${urlImage}${pelicula.poster_path}`} alt={pelicula.title} />
                    </div>
                    <div className="w-2/4 flex flex-col gap-5">
                        <h3 className={pelicula.title.length > 35 ? "text-4xl text-cyan-400 font-bold" : "text-6xl text-cyan-400 font-bold"}>{pelicula.title || pelicula.name}</h3>
                        <div className="max-h-36 overflow-y-auto">
                            <p className="font-bold text-sm">{pelicula.overview}</p>
                        </div>
                        <div className="flex gap-5 items-center">
                            <a href={`/info/movie/${pelicula.id}`} className="px-3 py-1 bg-cyan-500 font-bold rounded-md cursor-pointer hover:bg-cyan-400">Ver</a>
                            <div className="text-xl font-bold text-yellow-400">
                                {Array.from({ length: estrellasLlenas }, (_, index) => (
                                    <i key={index} className="fa fa-star"></i>
                                ))}
                                {Array.from({ length: 5 - estrellasLlenas }, (_, index) => (
                                    <i key={index} className="fa fa-star-o"></i>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { InicioCards }