import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import './error.css'

function Error(){
    return(
        <div className="not-found">
            <h1>404</h1>
            <h2>Pagína não encontrada :(</h2>
            <Link to="/" >Volte para a Home   <span><FaArrowLeft /></span> </Link>
        </div>
    )
}

export default Error;