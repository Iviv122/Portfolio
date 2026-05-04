
export default function Projects() {

    const cards = [
        {
            "title": "Test",
            "description": "TEst s",
            "link": "a.com"
        },
    ]

    return (
        <div id="projects" className="flex flex-col gap-5">
            <p className="text-center text-lg">Personal projects</p>
            {
                cards.map((el, i) =>
                    <div key={i} className="space-y-1">
                        <h3 className="font-semibold">{el.title}</h3>

                        <div className="text-sm text-gray-700">
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
                )
            }
        </div>
    );
}