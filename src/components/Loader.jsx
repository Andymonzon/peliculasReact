import '../css/Loader.css'

const Loader = () => {
    return (

        <div className='w-full flex gap-4 p-2 items-center'>
            <div className="lds-dual-ring"></div>
            <h3>Buscando...</h3>
        </div>

    )
}

export { Loader }