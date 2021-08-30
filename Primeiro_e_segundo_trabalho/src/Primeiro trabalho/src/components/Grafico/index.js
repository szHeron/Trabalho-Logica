import React, { useEffect } from 'react'; 
import './Grafico.css'

export default function Grafico(data){
    //Organizo as subformulas em ordem crescente
    let dataFiltrada = data.formula.split(',').sort((a,b)=>{
        if(a.length <= b.length) return 1;
        else return -1;
    });

    useEffect(()=>{
        const node = document.getElementById("grafico");
        let formulas = document.createElement("div");
        formulas.className = 'formulas';
        node.innerHTML = '';
        //Se caso a formula passada seja uma subformula unica
        if(dataFiltrada.length < 3){
            let formula = document.createElement("div");
            formula.className = 'formula';
            formula.appendChild(document.createTextNode(dataFiltrada[0]));
            if(dataFiltrada.length === 2){
                let atomo = document.createElement("div");
                atomo.className = 'formula';
                atomo.appendChild(document.createTextNode(dataFiltrada[1]));
                formula.appendChild(atomo);
            }
            //Apenas insiro ela no grafico
            node.appendChild(formula);
        }else{
            //Caso seja uma formula maior, eu passarei por todos os valores dela, e procuro as outras formulas contidas nela.
            for (let i = 0; i < dataFiltrada.length; i++) {
                if(dataFiltrada[i].length > 3){
                    let formula = document.createElement("div");
                    formula.className = 'formula';
                    if(i === 0){
                        let atomos = document.createElement("div");
                        atomos.className = "formulas";
                        formula.appendChild(document.createTextNode(dataFiltrada[i]));
                        node.appendChild(formula);
                        if(dataFiltrada.length <= 3){
                            for (let j = i + 1; j < dataFiltrada.length; j++) {
                                if(dataFiltrada[i].indexOf(dataFiltrada[j].trim()) !== -1 && dataFiltrada[j].length < 3){
                                    let atomo = document.createElement("div");
                                    atomo.className = 'formula';
                                    atomo.appendChild(document.createTextNode(dataFiltrada[j]));
                                    atomos.appendChild(atomo);
                                }
                            }
                            formula.appendChild(atomos);
                        }
                    }else{
                        let atomos = document.createElement("div");
                        atomos.className = "formulas";
                        formula.appendChild(document.createTextNode(dataFiltrada[i]));
                        for (let j = i + 1; j < dataFiltrada.length; j++) {
                            if(dataFiltrada[i].indexOf(dataFiltrada[j].trim()) !== -1){
                                let atomo = document.createElement("div");
                                atomo.className = 'formula';
                                atomo.appendChild(document.createTextNode(dataFiltrada[j]));
                                atomos.appendChild(atomo);
                            }
                        }
                        formula.appendChild(atomos);
                        formulas.appendChild(formula);
                    }
                }else{
                    break;
                }
            }
        }
        
        node.appendChild(formulas);
        
    },[dataFiltrada])

    return(
        <>
            <h2>Árvore sintática</h2>
            <div className='grafico' id='grafico'>
            
            </div>
        </>
    )
}
