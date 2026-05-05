import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function Contact() {

    return (
        <div className="flex gap-5 text-xl">
            <a href="https://github.com/Iviv122" target="_blank" rel="noopener noreferrer">
                <FaGithub />
            </a>
            <a href="mailto:ivan.skrinnik.nomia@gmail.com"><SiGmail /></a>
        </div>
    )
}