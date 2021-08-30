import React,  { useLayoutEffect } from 'react'; 
import { Complexidade } from '../Complexidade';
import { InsertSubformulas } from '../InsertSubformulas';
import './style.css';

export default function Tabela(data){
    //organizar o header da tabela em ordem de complexidade
    let formulas = data.formulas.split(',').sort((a,b)=>{
        if((Complexidade(a,0) < Complexidade(b,0))) return 1
        else return -1;
    }).reverse();

    //retiro os espaços
    formulas = formulas.map((formula)=>{
        return formula.trim()
    })
    
    formulas = formulas.filter((formula,i)=>{
        return formulas.indexOf(formula) === i;
    });
    //useLayoutEffect sempre executara quando as formulas forem trocadas, alterando todo o conteudo da tabela verdade.
    useLayoutEffect(()=>{
        //crio a matriz que conterá os dados.
        let matriz = [];
        //pego as subformulas sem os atomos.
        const subformulas = formulas.filter((subformula)=>{
            return subformula.length > 4
        });
        //pego somente os atomos sem as subformulas.
        let atomos = formulas.filter((atomo)=>{
            return atomo.length < 4
        })

        //Limpo a tabela
        document.getElementById('valores').innerHTML = '';

        //organizo as colunas dos atomos, aqui é se caso exista um atomo negado.
        //ex: -a, crio uma coluna especifica pra ele, negando a coluna normal relacionada a ele
        if(atomos.toString().indexOf('-') !== -1){
            const negados = atomos.filter(x => x.indexOf('-') !== -1).length;
            for (let i = (Math.pow(2, atomos.length - negados) - 1) ; i >= 0 ; i--){
                matriz[i] = [];
                for (let j = 0 ; j < atomos.length; j++){
                    if(atomos[j].indexOf('-') !== -1){
                        matriz[i][j] = matriz[i][atomos.indexOf(atomos[j][1])] === 'V'?'F':'V';
                    }else{
                        matriz[i][j] = (i & Math.pow(2,j)) ? 'F' : 'V'
                    }
                }
            }
          }else{ //se caso não exista negação, vou incrementando normalmente
            for (let i = (Math.pow(2, atomos.length) - 1) ; i >= 0 ; i--) {
                matriz[i] = []
                for (let j = (atomos.length - 1) ; j >= 0 ; j--) {
                    matriz[i][j] = (i & Math.pow(2,j)) ? 'F' : 'V'
                }
            }
        }
        
        //aqui começo a trabalha com os resultados das subformulas, analisando os operadores e os atomos feito anteriormente para fazer o resultado das formulas
        matriz = InsertSubformulas(matriz, subformulas, formulas)

        //Geração da tabela cada elemento da matriz vira uma linha da tabela
        matriz.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(d => {
                const td = document.createElement('td');
                d==='V'?td.className="true":td.className="false"
                td.textContent = d;
                tr.appendChild(td);
            });
            document.getElementById('valores').appendChild(tr);

        });
    },[formulas])

    //HTML da tabela
    return(
        <div className='content'>
            <h2>Tabela verdade</h2>
            <p id='tipo'></p>
            <table className='content-table' id='tabela'>
                <thead>
                    <tr>
                        {   formulas.map((formula, index) => {
                                return(
                                    <th key = {index}>{formula.toUpperCase()}</th>
                                )})
                        }
                    </tr>
                </thead>
                <tbody id='valores'>
                    
                </tbody>
            </table>
        </div>
    )
}