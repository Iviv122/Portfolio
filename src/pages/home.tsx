import { IoLogoGithub } from "react-icons/io";
import WolframRules from "../components/wolfram_rules";
import { SiGmail } from "react-icons/si";

export default function Home() {
    return (
        <div className="h-dvh w-dvw bg-[#1a1d23] relative">
            <div className="fixed z-2 flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0">
                <h1 className="text-stone-50 font-mono text-4xl gap-2">
                    Hi! I am {" "}
                    <div className="font-bold inline">
                        <span className="translate-y-[5px] inline-block animate-wave [animation-delay:0s]">I</span>
                        <span className="translate-y-[5px] inline-block animate-wave [animation-delay:0.2s]">V</span>
                        <span className="translate-y-[5px] inline-block animate-wave [animation-delay:0.4s]">A</span>
                        <span className="translate-y-[5px] inline-block animate-wave [animation-delay:0.6s]">N</span>
                    </div>
                </h1>
                <h2 className="text-stone-50 font-mono sm:text-2xl text-sm gap-2 text-center">
                    High school student and programming enthusiast
                </h2>
                <div className="flex text-4xl p-1 m-1 gap-4 text-stone-50 ">
                    <a
                        className="
                        hover:scale-125
                        hover:text-green-500
                        focus:
                        transition-all
                        duration-100
                        ease-in-out
                        "
                    ><IoLogoGithub /></a>
                    <a
                        className="
                        hover:scale-125
                        hover:text-green-500
                        transition-all
                        duration-100
                        ease-in-out
                        "
                    ><SiGmail /></a>
                </div>
            </div>
            <div className="h-full w-full">
                <WolframRules />
            </div>
        </div>
    );
}