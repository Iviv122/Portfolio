export default function Color(word :string,color: string){
  const newColor = "text-[" + color+"]";
  return <span className={newColor}>{word}</span> 
}