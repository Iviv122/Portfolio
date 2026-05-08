import FireBackground from "../components/fire_background";

export default function AboutMe() {
    return (
        <div>
            <div className="absolute z-2 flex flex-col justify-center items-center w-full h-full">
                <div className="text-stone-50 overflow-auto w-[60%] h-[50%] font-mono sm:text-2xl text-sm">
                    <p>
                        Hello once again! I am 18yo from Ukraine currently located in Poland and attending to technical school as software developer.
                    </p>
                    <p>
                       I am interested in many things and fields but mainly programming and game developing.
                    </p>
                </div>
            </div>
            <div className="w-full h-full">
                <FireBackground />
            </div>
        </div>
    )
}