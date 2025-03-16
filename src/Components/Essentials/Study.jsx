import React, { useState } from "react";

const StudyComponent = ({ title, tabItems }) => {
    const [activeTab, setActiveTab] = useState(tabItems[0]);

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold py-23 sm:py-23">
                {title}
            </h2>
            
            {/* Responsive tab container */}
            <div className="bg-gray-100 p-2 sm:p-3 rounded-lg flex flex-wrap sm:flex-nowrap gap-1 sm:gap-1">
                {tabItems.map((tab) => (
                    <button
                        key={tab}
                        className={`
                            flex-1 px-3 py-2 text-sm sm:text-base font-medium
                            rounded-lg transition-colors duration-200
                            ${activeTab === tab 
                                ? "bg-white shadow text-purple-700" 
                                : "text-gray-500 hover:text-gray-700"
                            }
                        `}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StudyComponent;
