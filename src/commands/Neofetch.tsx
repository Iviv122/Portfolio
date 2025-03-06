import Color from "../utils/Color";

const art = `
     .=-----=+#*+++=:...::-======++====+----#
      -+==-=*@%+=---:..       .......:----=*#
   .:-==++++*#+=-:::...       .--:::=*####%%%
====++++++++++==-:::...    ...:=+*#%@@%%%%%%%
**++++++**####%%%####****###%%@@@@@@@@@@@@@@@
++++=..:+*##%%%%%%%@@@@@@@@@@@@@@@#++=+#@@@@@
+***=:::+**#%%%%%%%@@@@@@@@@@@@@@%*: .-*%@@@@
+*********##%%%%%@@@@@@@@@@@@@%%%%%%#%@@@@@@@
+++****++*##%%%%@@@@@@@@@@@@@%%%%@@@@@@@@@@@@
===++++++*##%%%@@@@@@@@@@@@%%%%%%%@@@@@@@@@@@
::-======+*#%%@@@@@@@@@@@@%%####%%%%%%%%%%%%%
-:.:::---=+*######%@@@@%%##**++**************
:---::...::-:.    :+##*+===----====---===++++
 :-=+==-:....      ...........:::-=++********
  -=++***+=:.................:-+***#####****#
  -=++**###*-::::::---====-:.:-=+******######
`;

const lines = art.split("\n");

function HandleLines (i : number): string{
    switch (i) {
        case 4:
            return "Name : Iviv122"
        case 5:
            return "Type : Student"
        case 6:
            return "Age : 16"
        case 7:
            return "Current place : Poland"
        case 9:
            return "Status : In search of work"
        case 10:
            return "Skills : undefined"
        case 11:
            return "Hobbies: Games, Art, Music, Sport"

        case 13:
            return "Nice to meet you"

        default:
            return ""
    }
}

export default function Neofetch() {
    return( 
    <div><pre>
        {
            lines.map((line :string, i : number) => (
                <div className="">
                    <pre>{line}    {Color(HandleLines(i),"#8be9fd")}</pre>
                </div>
              ))
        }
        </pre>
    </div>
    );
}