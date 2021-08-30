export function Resposta(matriz, tamMatriz, colunm){
    let contVerdadeiros = 0
    for(let k = 0; k < tamMatriz; k++) {
        if(matriz[k][colunm] === 'V'){
            contVerdadeiros++ //Sempre que é encontrado um V é incrementada a variavel
        }
    }
    //Faço o tratamento conforme o resultado da variavel.
    if(contVerdadeiros === matriz.length){
        return "Tautologia e Satisfazível"
    }else if(contVerdadeiros > 0){
        return "Satisfazível e Falsificavel"
    }else{
        return "Insatisfazível e Falsificavel"
    }
}