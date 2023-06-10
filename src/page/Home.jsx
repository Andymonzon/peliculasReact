import { Inicio } from "../components/Inicio"
import { MasVotadas } from "../components/MasVotadas"
import { PeliculasTrending } from "../components/PeliculasTrending"

const Home = () => {

    return (
        <>
            <Inicio />
            <div className="container mx-auto">
                <PeliculasTrending />
                <MasVotadas />
            </div> 
        </>
    )
}

export { Home }