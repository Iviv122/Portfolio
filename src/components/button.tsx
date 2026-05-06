type ButtonProps = {
  text: string;
  onClick?: () => void;
};

export default function ButtonBlock({ text, onClick }: ButtonProps) {
  return (
    <button
    className="
    text-mauve-300
    text-bl
    sm:text-3xl
    text-center

    p-2
    w-full

    hover:scale-125
    hover:text-green-500
    transition-all
    duration-100
    ease-in-out
    "
    onClick={onClick}>
      {text}
    </button>
  );
}