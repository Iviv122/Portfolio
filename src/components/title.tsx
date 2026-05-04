export default function Title() {
 
    return (
        <div className="flex gap-5 text-4xl">
            <p>Hello I am</p>
            <div className="font-bold">
                <span className="translate-y-[5px] inline-block animate-wave [animation-delay:0s]">I</span>
                <span className="translate-y-[5px]  inline-block animate-wave [animation-delay:0.2s]">V</span>
                <span className="translate-y-[5px] inline-block animate-wave [animation-delay:0.4s]">A</span>
                <span className="translate-y-[5px] inline-block animate-wave [animation-delay:0.6s]">N</span>
            </div>
        </div>
    )
}