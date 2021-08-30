import { Resposta } from "./Resposta";

export function InsertSubformulas(matriz, subformulas, formulas){
    //aqui começo a trabalha com os resultados das subformulas, analisando os operadores e os atomos feito anteriormente para fazer o resultado das formulas
    for (let i = 0; i < subformulas.length; i++){
        const tamMatriz = matriz.length
        let index1 = -1;
        let index2 = -1;
        let colunm = formulas.indexOf(subformulas[i])
        let formula = subformulas[i]
        let op = '';
        //Caso seja uma subformula que contem outras, eu vou analisando primeiro os operadores internos.
        //ex: ((p>e)#d) -> (V # d)
        if(formula.indexOf('(', formula.indexOf('(') + 1) !== -1){
            for(let k = formulas.length; k > 0; k--){
                const index = formula.indexOf(formulas[k])
                if(index !== -1 && formula.length !== formulas[k].length){
                    if(index1 === -1){
                        formula = formula.replace(formulas[k],'')
                        formula.replace(formulas[k],'')
                        index1 = k
                    }else{
                        formula = formula.replace(formulas[k],'')
                        formula.replace(formulas[k],'')
                        index2 = k
                    }
                }
            }
            if(index2 === -1){
                for (let k = 0; k < formulas.length && formulas[k].length < subformulas[i].length; k++) {
                    let index = 0
                    if(formulas[k].length === 1 && formula[formula.indexOf(formulas[k])-1] !== '-'){
                        index = formula.indexOf(formulas[k]);
                    }else if(formulas[k].length > 1){
                        index = formula.indexOf(formulas[k]); 
                    }else{
                        continue;
                    }
                    
                    if(index===-1) continue;

                    index2 = k
                }
            }
        }else{
            for (let k = 0; k < formulas.length && formulas[k].length < subformulas[i].length; k++) {
                let index = 0
                if(formulas[k].length === 1 && formula[formula.indexOf(formulas[k])-1] !== '-'){
                    index = formula.indexOf(formulas[k]);
                }else if(formulas[k].length > 1){
                    index = formula.indexOf(formulas[k]); 
                }else{
                    continue;
                }
                
                if(index===-1) continue;

                if(index1 === -1){
                    index1 = k
                }else if(index2 === -1){
                    index2 = k
                }
            }
        }

        //Verificar se os indexs estão nos locais correto.
        if(subformulas[i].indexOf(formulas[index1]) > subformulas[i].indexOf(formulas[index2])){
            const temp = index1;
            index1 = index2;
            index2 = temp;
        }

        //Pego o operador presente na subformula
        if(formula.indexOf('&') !== -1) op = '&';    
        if(formula.indexOf('#') !== -1) op = '#';
        if(formula.indexOf('>') !== -1) op = '>';
        if(formula.indexOf('=') !== -1) op = '=';

        //Faço o tratamento conforme o valor do operador
        if(op === '&'){
            for(let k = 0; k < tamMatriz; k++) {
                if(matriz[k][index1] === 'V' && matriz[k][index2] === 'V'){
                    if(subformulas[i][0] === '-'){
                        matriz[k][colunm] = 'F'
                    }else{
                        matriz[k][colunm] = 'V'
                    }
                }else{
                    if(subformulas[i][0] === '-'){
                        matriz[k][colunm] = 'V'
                    }else{
                        matriz[k][colunm] = 'F'
                    }
                }
            }       
        }else if(op === '#'){
            for(let k = 0; k < tamMatriz; k++) {
                if(matriz[k][index1] === 'V' || matriz[k][index2] === 'V'){
                    if(subformulas[i][0] === '-'){
                        matriz[k][colunm] = 'F'
                    }else{
                        matriz[k][colunm] = 'V'
                    }
                }else{
                    if(subformulas[i][0] === '-'){
                        matriz[k][colunm] = 'V'
                    }else{
                        matriz[k][colunm] = 'F'
                    }
                }
            } 
        }else if(op === '>'){
            for(let k = 0; k < tamMatriz; k++) {
                if(matriz[k][index1] === 'V' && matriz[k][index2] === 'F'){
                    if(subformulas[i][0] === '-'){
                        matriz[k][colunm] = 'V'
                    }else{
                        matriz[k][colunm] = 'F'
                    }
                }else{
                    if(subformulas[i][0] === '-'){
                        matriz[k][colunm] = 'F'
                    }else{
                        matriz[k][colunm] = 'V'
                    }
                }
            }
        }else if(op === '='){
            for(let k = 0; k < tamMatriz; k++) {
                if((matriz[k][index1] === matriz[k][index2]) || (matriz[k][index1] === matriz[k][index2])){
                    if(subformulas[i][0] === '-'){
                        matriz[k][colunm] = 'F'
                    }else{
                        matriz[k][colunm] = 'V'
                    }
                }else{
                    if(subformulas[i][0] === '-'){
                        matriz[k][colunm] = 'V'
                    }else{
                        matriz[k][colunm] = 'F'
                    }
                }
            }
        }
        //Resgato a resposta, se é tautologia, falsificavel e etc.
        document.getElementById('tipo').innerHTML = Resposta(matriz, tamMatriz, colunm) 
    }
    return matriz;
}