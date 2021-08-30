export function Resultado(formulasOriginais, formulas, matriz){
    //Variavel de verificação
    let validacao = 0
    //Percorro todas as formulas A digitadas pelo o usuario.
    for (let k = 0; k < matriz.length; k++) {
        for (let j = 0; j < formulasOriginais.length-1; j++){
            //Se caso todas as valorações de A seja V, a variavel permanecerá 1
            if(matriz[k][formulas.indexOf(formulasOriginais[j])] === 'V'){
                validacao = 1;
            }else{//Se não, ela volta a ser 0
                validacao = 0;
                break;
            }
        }
        if(validacao === 1){ //Se caso as fomulas A sejam verdadeiras, B também deve ser para que seja uma consequencia lógica.
            //Caso B seja falso, não é consequencia lógica.
            if(matriz[k][formulas.indexOf(formulasOriginais[formulasOriginais.length-1])] === 'F')
                return "A consequencia lógica não é válida";
        }
        //Nâo preciso de um  else, pois caso o conjunto de formulas A sejam todos falsos, então por vacuidade a consequencia logica é verdadeiro.
    }
    return "A consequencia lógica é válida";
}
