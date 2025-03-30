import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouteLink } from "react-router-dom";
import { faWrench, faClock } from "@fortawesome/free-solid-svg-icons";
import { FaRoad, FaProjectDiagram, FaChartLine, FaUsers, FaArrowRight, FaBook, FaGraduationCap } from "react-icons/fa";
import FieldCard from "../Essentials/FieldCard";
import Slider from "react-slick";
import Login from "../Essentials/Login";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../Components/css/Index.css";

const typewriterStyles = {
    '@keyframes blink': {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0 }
    },
    '.animate-blink': {
        animation: 'blink 1s step-end infinite'
    }
};

const features = [
    {
        icon: <FaRoad className="text-blue-500 text-4xl" />,
        title: "Clear Roadmap",
        description: "Step-by-step guidance for your educational journey",
    },
    {
        icon: <FaProjectDiagram className="text-blue-500 text-4xl" />,
        title: "Project Ideas",
        description: "Industry-relevant projects for your portfolio",
    },
    {
        icon: <FaChartLine className="text-blue-500 text-4xl" />,
        title: "Progress Tracking",
        description: "Monitor your learning journey",
    },
    {
        icon: <FaUsers className="text-blue-500 text-4xl" />,
        title: "Community Support",
        description: "Learn and grow with peers",
    },
];

const fields = [
    {
        title: "Engineering and Technology",
        description: "Exploring the latest advancements in engineering and tech innovation.",
        icon: faWrench,
        to: "/Fields/Engineering-and-Technology/Courses",
    },
    {
        title: "Coming Soon",
        description: "Stay tuned for exciting updates and new content!",
        icon: faClock,
        to: "#",
    },
    {
        title: "Coming Soon",
        description: "New features and content will be available soon!",
        icon: faClock,
        to: "#",
    },
];

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

export default function Index() {
    const [loginOpen, setLoginOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [titleText, setTitleText] = useState('');
    const [subtitleText, setSubtitleText] = useState('');
    const [showTitleCursor, setShowTitleCursor] = useState(true);
    const [showSubtitleCursor, setShowSubtitleCursor] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const username = localStorage.getItem('username');
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
            // Initialize login state from localStorage
            const loginState = localStorage.getItem('isLoggedIn');
            return loginState === 'true';
        });
    const titleString = 'Welcome to UniGUIDE';
    const subtitleString = 'Your personalized roadmap to academic success';

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setIsAuthModalOpen(false);
        localStorage.setItem('isLoggedIn', 'true');

        // Broadcast login event immediately
        const loginEvent = new CustomEvent('loginStateChange', {
            detail: { isLoggedIn: true }
        });
        window.dispatchEvent(loginEvent);
    };
     useEffect(() => {
            // Listen for login state changes
            const handleLoginStateChange = (event) => {
                setIsLoggedIn(event.detail.isLoggedIn);
            };
    
            window.addEventListener('loginStateChange', handleLoginStateChange);
    
            return () => {
                window.removeEventListener('loginStateChange', handleLoginStateChange);
            };
        }, []);

    useEffect(() => {
        let titleIndex = 0;
        let subtitleIndex = 0;
        let subtitleTimeout;

        const titleInterval = setInterval(() => {
            if (titleIndex <= titleString.length) {
                setTitleText(titleString.slice(0, titleIndex));
                titleIndex++;
            } else {
                clearInterval(titleInterval);
                setShowTitleCursor(false);
                setShowSubtitleCursor(true);
                subtitleTimeout = setTimeout(() => {
                    const subtitleInterval = setInterval(() => {
                        if (subtitleIndex <= subtitleString.length) {
                            setSubtitleText(subtitleString.slice(0, subtitleIndex));
                            subtitleIndex++;
                        } else {
                            clearInterval(subtitleInterval);
                            setShowSubtitleCursor(false);
                        }
                    }, 50);
                    return () => clearInterval(subtitleInterval);
                }, 500);
            }
        }, 100);

        return () => {
            clearInterval(titleInterval);
            if (subtitleTimeout) clearTimeout(subtitleTimeout);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="relative">  {/* Add this wrapper */}
            <header className="flex items-center p-4 bg-blue-500 text-white">
                <div className="flex items-center w-full relative">
                    <button className="text-3xl absolute left-0 md:hidden">&#9776;</button>
                    <h1 className="text-2xl font-bold w-full text-center">UniGUIDE</h1>
                </div>
            </header>
            <section className="relative flex flex-col justify-start pt-20 md:pt-32 items-center text-center h-[90vh] md:h-[109vh] bg-cover bg-center text-white px-6"
                style={{
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://wallpapercave.com/wp/wp7617814.jpg')",
                    backgroundPosition: "center top",
                    backgroundSize: "cover"
                }}>
                <div className="mb-8">
                    <h1 className="text-3xl md:text-7xl font-bold tracking-wide">
                        {titleText}
                        {showTitleCursor && <span className="animate-blink">|</span>}
                    </h1>
                    <p className="text-lg md:text-3xl mt-4 max-w-3xl leading-relaxed">
                        {subtitleText}
                        {showSubtitleCursor && <span className="animate-blink">|</span>}
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex flex-wrap justify-center gap-4">
                        <ScrollLink
                            to="fields"
                            smooth={true}
                            duration={500}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 md:py-5 px-4 md:px-12 rounded-lg transition text-base md:text-2xl shadow-lg cursor-pointer"
                        >
                            Explore Fields
                        </ScrollLink>
                        {!isLoggedIn && (
                            <button
                                onClick={() => setIsAuthModalOpen(true)}
                                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-500 text-white font-semibold py-2 md:py-5 px-4 md:px-12 rounded-lg transition text-base md:text-2xl shadow-lg"
                            >
                                Login
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-3 gap-8 md:gap-16 mt-8">
                        <div className="flex flex-col items-center">
                            <FaGraduationCap className="text-blue-400 text-3xl md:text-4xl mb-2" />
                            <span className="text-white font-bold text-xl md:text-2xl mb-1">50+</span>
                            <span className="text-gray-300 text-sm md:text-base">Fields</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <FaBook className="text-blue-400 text-3xl md:text-4xl mb-2" />
                            <span className="text-white font-bold text-xl md:text-2xl mb-1">100+</span>
                            <span className="text-gray-300 text-sm md:text-base">Courses</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <FaProjectDiagram className="text-blue-400 text-3xl md:text-4xl mb-2" />
                            <span className="text-white font-bold text-xl md:text-2xl mb-1">95+</span>
                            <span className="text-gray-300 text-sm md:text-base">Projects</span>
                        </div>
                    </div>
                </div>
            </section>
            <div className="bg-gray-100 py-13 px-3 mt-4 h-[90vh]" id="fields">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-8">Educational Fields</h1>
                <div className="max-w-7xl mx-auto mt-10">
                    {isMobile ? (
                        <Slider {...settings}>
                            {fields.map((field, index) => (
                                <div key={index}>
                                    <FieldCard
                                        title={field.title}
                                        description={field.description}
                                        icon={field.icon}
                                        to={field.to}
                                    />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {fields.map((field, index) => (
                                <FieldCard
                                    key={index}
                                    title={field.title}
                                    description={field.description}
                                    icon={field.icon}
                                    to={field.to}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex justify-center mt-10">
                    <RouteLink to="/Fields" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-14 rounded-lg transition text-xl flex items-center shadow-lg">
                        More Fields <FaArrowRight className="ml-2" />
                    </RouteLink>
                </div>
            </div>
            <div className="p-6">
                <div className="text-center my-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-20">Why Choose UniGUIDE?</h2>
                    <div className="max-w-7xl mx-auto mt-20">
                        {isMobile ? (
                            <Slider {...settings}>
                                {features.map((feature, index) => (
                                    <div key={index} className="flex flex-col items-center justify-center px-4">
                                        <div className="flex justify-center w-full">
                                            {feature.icon}
                                        </div>
                                        <h3 className="font-bold text-xl mt-4 text-center">{feature.title}</h3>
                                        <p className="text-gray-600 text-center mt-2 max-w-xs mx-auto">{feature.description}</p>
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
                                        {feature.icon}
                                        <h3 className="font-bold text-xl mt-4">{feature.title}</h3>
                                        <p className="text-gray-600 text-center max-w-xs leading-relaxed">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Login Modal */}
            {isAuthModalOpen && !isLoggedIn && (
                <div className="fixed inset-0 z-[9999]">
                    <div
                        className="fixed inset-0 bg-black/30 backdrop-blur-[2px]"
                        onClick={() => setIsAuthModalOpen(false)}
                    />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Login
                            isOpen={isAuthModalOpen}
                            onClose={() => setIsAuthModalOpen(false)}
                            initialView="login"
                            onLoginSuccess={handleLoginSuccess}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}