export default function PastExperience() {
    const cards = [
        {
            title: "Internship SI-Consulting S.A.",
            description:
                ` During this small internship program I learned about SAP,
                    how work in office looks like, participated in team building exercises
                    and learned more about React.`
        },
        {
            title: "School page",
            description:
                "Contributed in designing and implementing school's WordPress theme.",
            link: "https://ezn.edu.pl/"
        },
        {
            title: "Hackathon: Mathisi - AI note taking app",
            description: (
                <>
                    I was developing and designing a mobile app and backend.
                    <br />
                    The project was done under heavy time pressure and completed in less than 3 days. 
                </>
            ),
            link: "https://github.com/TymekV/mathisi/"
        },
    ];

    return (
        <div className="flex flex-col gap-5">
            <p className="text-center text-lg">Past experience</p>

            {cards.map((el, index) => (
                <div key={index} className="space-y-1">
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
            ))}
        </div>
    );
}