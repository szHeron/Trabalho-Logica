export default function Subformula(text, indices){
    if(indices.length !== 0){
        if(indices[1] === text.length)
            return ` ${text}, ${Subformula(text,indices.splice(2,indices.length))}`
        else if(text[indices[0]-1] === '-')
            return ` -${text.substring(indices[0], indices[1]+1)}, ${Subformula(text,indices.splice(2,indices.length))}`
        else
            return ` ${text.substring(indices[0], indices[1]+1)}, ${Subformula(text,indices.splice(2,indices.length))}`
    }else{
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
        const delRepetidas = textFiltrado => textFiltrado.split("").sort().reduce((a,b)=>(a[a.length-1]!==b)?(a+b):a,"");
        return `${negar()}${delRepetidas(text.replace(/[^A-Za-z0-9]+/g,'')).split('').join(', ')}`;
    }
}