import WolframRules from "../components/wolfram_rules";

export default function Home() {
    return (
        <div className="w-full h-full bg-[#1a1d23]">
            <div className="absolute z-2 flex flex-col justify-center items-center w-full h-full">
                <h1 className="text-stone-50 font-mono text-4xl gap-2">
                    Hi! I am {" "}
                    <div className="font-bold inline">
                        <span className="translate-y-[5px] inline-block animate-wave [animation-delay:0s]">I</span>
                        <span className="translate-y-[5px] inline-block animate-wave [animation-delay:0.2s]">V</span>
                        <span className="translate-y-[5px] inline-block animate-wave [animation-delay:0.4s]">A</span>
                        <span className="translate-y-[5px] inline-block animate-wave [animation-delay:0.6s]">N</span>
                    </div>
                </h1>
                <h2 className="text-stone-50 font-mono sm:text-2xl text-sm gap-2">
                    High school student, programming enthusiast :D
                </h2>
            </div>
            <div className="w-full h-full">
                <WolframRules />
            </div>
        </div>
    );
}