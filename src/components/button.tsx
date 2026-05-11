type ButtonProps = {
  text: string;
  onClick?: () => void;
  active: boolean
};

export default function ButtonBlock({ text, onClick, active }: ButtonProps) {
  return (
    <button
      className="
      text-mauve-300
      text-sm
      sm:text-2xl
      text-center
      cursor-pointer

      p-2
     

      hover:scale-125
      hover:text-green-500
      transition-all
      duration-100
      ease-in-out
      "
      onClick={onClick}>
      <div className={ active ? "text-green-500" : "text-mauve-300"}>
        {text}
      </div>
    </button>
  );
}