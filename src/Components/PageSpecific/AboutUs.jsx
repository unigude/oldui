import React, { useState, useEffect } from "react";
import { FaTimes, FaLinkedin } from "react-icons/fa";
import Slider from "react-slick";
import SubhrajeetImg from '../../assets/images/Subhrajeet.jpg';
import HarshImg from '../../assets/images/Harsh.jpg';
import "../css/Index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const people = {
    developers: [
        { name: "Adit Ghosh", designation: "Team Lead, React Integrator and Backend Developer", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKdftMTz2woyGr0rwkw95l13jojCjgmCztYg&s", description: "A passionate developer leading the integration and backend architecture of the project.", linkedin: "https://www.linkedin.com/in/adit-ghosh-9b4723326/" },
        { name: "Subhrajeet Dash", designation: "Senior Frontend Developer", img: SubhrajeetImg, description: "Ensuring seamless frontend experience and implementing UI enhancements.", linkedin: "https://www.linkedin.com/in/subhrajeet-dash-9a449831b/" },
        { name: "Manju", designation: "Frontend Developer", img: "https://agropack-expo.com/source/wp-content/uploads/2015/04/speaker-1-v2.jpg", description: "Working on optimizing UI components and responsiveness.", linkedin: "https://www.linkedin.com/in/manju/" },
        { name: "Harsh Panchal", designation: "UI Designer", img: HarshImg, description: "Creating modern and user-friendly designs for the platform.", linkedin: "https://www.linkedin.com/in/harsh-panchal/" }
    ],
    specialMentions: [
        { name: "Dr. Surabhi Shanker", designation: "Assistant Professor, K.R. Mangalam University, Internal Mentor for the Project", img: "data:image/jpeg;base64,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", description: "Guiding the project with valuable academic insights.", linkedin: "https://www.linkedin.com/in/dr-surabhi-shanker-22b53011/" },
        { name: "Ms. Shayani Sharma", designation: "Xebia, External Mentor for the project", img: "https://agropack-expo.com/source/wp-content/uploads/2015/04/speaker-1-v2.jpg", description: "Providing industry-level mentorship and technical expertise.", linkedin: "https://www.linkedin.com/in/shayani-sharma/" }
    ]
};

export default function AboutUs() {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
    };

    const PersonCard = ({ person }) => (
        <div
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center cursor-pointer transform transition-transform duration-300 hover:scale-105 mx-2"
            onClick={() => setSelectedPerson(person)}
        >
            <img src={person.img} alt={person.name} className="w-24 h-24 object-cover rounded-full border-4 border-blue-500" />
            <h3 className="mt-4 text-xl font-bold">{person.name}</h3>
            <p className="text-blue-500 font-semibold">{person.designation}</p>
            <p className="text-gray-600 text-center mt-2">{person.description}</p>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 text-blue-700 flex items-center">
                <FaLinkedin className="mr-2" /> LinkedIn
            </a>
        </div>
    );

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center py-25 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-12">About Us</h1>

            <section className="max-w-4xl text-center mb-16">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">About the Website</h2>
                <p className="text-lg text-gray-600">UniGUIDE is an educational platform aimed at helping students navigate their academic journey with structured guidance and curated resources.</p>
            </section>

            {["developers", "specialMentions"].map((section, idx) => (
                <section key={idx} className="max-w-6xl w-full text-center mb-16">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-8">
                        {section === "developers" ? "The Developers" : "Special Mentions"}
                    </h2>
                    <div className="w-full">
                        {isMobile ? (
                            <Slider {...settings}>
                                {people[section].map((person, index) => (
                                    <PersonCard key={index} person={person} />
                                ))}
                            </Slider>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {people[section].map((person, index) => (
                                    <PersonCard key={index} person={person} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            ))}

            {selectedPerson && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-6">
                    <div className="bg-white rounded-lg p-6 shadow-lg text-center relative w-full max-w-md">
                        <button className="absolute top-2 right-2 text-gray-700 text-2xl" onClick={() => setSelectedPerson(null)}>
                            <FaTimes />
                        </button>
                        <img src={selectedPerson.img} alt={selectedPerson.name} className="w-40 h-40 object-cover rounded-lg mx-auto mb-4" />
                        <h3 className="text-2xl font-bold">{selectedPerson.name}</h3>
                        <p className="text-blue-500 font-semibold mb-2">{selectedPerson.designation}</p>
                        <p className="text-gray-600">{selectedPerson.description}</p>
                        <a href={selectedPerson.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 text-blue-700 flex items-center justify-center">
                            <FaLinkedin className="mr-2" /> LinkedIn
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
