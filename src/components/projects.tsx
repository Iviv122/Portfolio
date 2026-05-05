export default function Projects() {
    const cards = [
        {
            title: "Zentube",
            description: "Firefox extension to clean up your youtube page",
            link: "https://github.com/Iviv122/zentube"
        },
        {
            title: "Console3D",
            description: "3D in your console, written in C++",
            link: "https://github.com/Iviv122/Console3D"
        },
        {
            title: "Cruster",
            description: "Simple web-server written in rust",
            link: "https://github.com/Iviv122/Cruster"
        },
        {
            title: "Julia-set",
            description: "Fractal visualization made in C++ with GLFW",
            link: "https://github.com/Iviv122/Julia-set"
        },
        {
            title: "Loan",
            description: "Inifinte game made in Godot with GDscript",
            link: "https://iviv122.itch.io/loan"
        },
        {
            title: "Pasjans",
            description: "Console implementation of Solitaire written in C#",
            link: "https://github.com/Iviv122/Pasjans"
        },
    ];

    return (
        <div id="projects" className="flex flex-col gap-5">
            <p className="text-center text-lg">Highlighted personal projects</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {cards.map((el, i) => (
                    <div key={i}>
                        <h3 className="font-semibold">{el.title}</h3>

                        <div>
                            {el.description}
                        </div>

                        {el.link && (
                            <a
                                href={el.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline text-sm"
                            >
                                View project
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}