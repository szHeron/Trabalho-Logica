import React from 'react';
import { useHistory } from 'react-router';

export function NavBar(){
    const history = useHistory();
    return(
        <div className="navbar">
            <button onClick={()=>history.push("/")}>1º Trabalho</button>
            <button onClick={()=>history.push("/Trabalho2/primeira")}>2º Trabalho - 1º Questão</button>
            <button onClick={()=>history.push("/Trabalho2/segunda")}>2º Trabalho - 2º Questão</button>
        </div>
    )
}