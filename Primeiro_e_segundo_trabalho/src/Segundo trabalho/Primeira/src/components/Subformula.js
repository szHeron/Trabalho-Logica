export default function Subformula(text, indices){
    //Tratamento dos atomos negados.
    function negar(){
        let negados = '';
        let negado = text.indexOf('-');
        while (negado !== -1){
            if(text[negado+1] !== '('){
                negados += `-${text[negado + 1]}, `;
            }
            negado = text.indexOf(('-'), negado + 1);
        }
        return negados;
    }
    //Enquanto existir pares de parenteses, vou chamar a função recursivamente.
    if(indices.length !== 0){
        //Verifico se essa subformula é a formula geral.
        if(indices[1] === text.length)
            return ` ${text}, ${Subformula(text,indices.splice(2,indices.length))}`
        //Se não, verifico se é uma subformula negada ou não.
        else if(text[indices[0]-1] === '-')
            return ` -${text.substring(indices[0], indices[1]+1)}, ${Subformula(text,indices.splice(2,indices.length))}`
        else
            return ` ${text.substring(indices[0], indices[1]+1)}, ${Subformula(text,indices.splice(2,indices.length))}`
    }else{
        //Aqui pego todos os atomos, sem repetição.
        const delRepetidas = textFiltrado => textFiltrado.split("").sort().reduce((a,b)=>(a[a.length-1]!==b)?(a+b):a,"");
        return `${negar()}${delRepetidas(text.replace(/[^A-Za-z0-9]+/g,'')).split('').join(', ')}`;
    }
}