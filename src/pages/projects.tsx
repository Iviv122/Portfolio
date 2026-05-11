import CityDraw from "../components/city_draw";

export default function Projects() {
    return (
        <div>
            <div className="absolute z-2 flex flex-col justify-center items-center w-full h-full">
                <p className="text-stone-50 overflow-auto w-[60%] h-[50%]">
                </p>
            </div>
            <div className="w-full h-full">
                <CityDraw/>
            </div>
        </div>
    )
}