import Color from "../utils/Color";

const commands = [
"help",
"links",
"ls",
"neofetch",
"clear"
]
const colorCom = "#8be9fd";
export default function Help() {
    return( 
    <div>
        {
            commands.map((com : string) =>(
                <div>{Color(com,colorCom)}</div>
            ))
        }
    </div>
    );
}