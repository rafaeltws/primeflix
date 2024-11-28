import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify'

import './favoritos.css'

function Favoritos(){
    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])

    function handleDelete(id){
        let filtroFilmes = filmes.filter((filme) => {
            return (filme.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
        toast.info("O filme foi removido da sua lista!")
    }

    return(
        <div className='meus-filmes'>
            <h1>Minha Lista</h1>

            {filmes.length === 0 && <span>Você não possiu nenhum filme ainda :(</span>}

            <ul>
                {filmes.map((filme) => {
                    return(
                        <li key={filme.id}>
                            <span>{filme.title}</span>
                            <div>
                                <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                                <button onClick={() => handleDelete(filme.id)}>Excluir <span><MdDeleteForever /></span> </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;
