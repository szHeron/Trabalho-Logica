export default function Complexidade(text, index){
    if(text[index] && text[index + 1]){
        console.log(text[index])
        return 1 + Complexidade(text, index + 1);
    }else{
        return 1;
    }
}