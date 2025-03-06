import Color from "../utils/Color";

const Links: [string,string][] = [
    ["WaterASCII","https://iviv122.github.io/WaterASCII/"],
    ["Fire","https://iviv122.github.io/Fire/"],
];
const colorUrl = "#8be9fd";
export default function ListProjects() {
    return( 
    <div>
        {
            Links.map(([name,url]) =>(
                <div><a href={url} className="underline">{Color(name,colorUrl)}</a></div>
            ))
        }
    </div>
    );
}