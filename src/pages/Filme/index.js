import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { MdLocalMovies } from "react-icons/md";
import { CiSaveUp1 } from "react-icons/ci";

import { toast } from 'react-toastify'

import api from '../../services/api'

import './filme.css'

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate()

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "7dee59d8dab4072605365cccb47be465",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false)
            })
            .catch(() => {
                navigate("/", { replace: true });
                return
            })
        }

        loadFilme();

        return () => {
            console.log("cmoponente desmontado")
        }
    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)

        if(hasFilme){
            toast.warn("Esse filme já está na sua lista!");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("O filme foi adicionado a sua lista")
    }

    if(loading){
        return(
            <div className='filmes-info'>
                <h1>Carregando os detalhes...</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-btns'>
                <button onClick={salvarFilme}>
                    Salvar <CiSaveUp1 /> 
                </button>
                <button>
                    <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer <MdLocalMovies />
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;