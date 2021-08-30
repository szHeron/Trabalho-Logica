export function InsertSubformulas(matriz, subformulas, formulas){
    for (let i = 0; i < subformulas.length; i++){
        const tamMatriz = matriz.length;
        const colunm = formulas.indexOf(subformulas[i]);
        let op = '';
        let index1 = -1;
        let index2 = -1;
        let formula = subformulas[i]

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

        if(formula.indexOf('&') !== -1) op = '&';    
        if(formula.indexOf('#') !== -1) op = '#';
        if(formula.indexOf('>') !== -1) op = '>';
        if(formula.indexOf('=') !== -1) op = '=';

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
    }
    return matriz;
}