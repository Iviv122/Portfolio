import Color from "../utils/Color";

const Links: [string,string][] = [
    ["Github","https://github.com/Iviv122"],
];
const colorPlatform = "#50fa7b";
const colorUrl = "#8be9fd";
export default function ListLinks() {
    return( 
    <div>
        {
            Links.map(([name,url]) =>(
                <div><span>{Color(name,colorPlatform)}</span> <a href={url}>{Color(url,colorUrl)}</a></div>
            ))
        }
    </div>
    );
}