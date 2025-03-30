import React, { useState } from 'react';

const Library = () => {
    const [expandedSections, setExpandedSections] = useState({
        fields: false,
        courses: false,
        subjects: false
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const SectionHeader = ({ title, isExpanded, onToggle }) => (
        <button
            onClick={onToggle}
            className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </button>
    );

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold mb-4">My Library</h2>

            {/* Fields Section */}
            <div className="space-y-2 border-l-4 border-l-blue-500 rounded-lg">
                <SectionHeader 
                    title="My Followed Fields"
                    isExpanded={expandedSections.fields}
                    onToggle={() => toggleSection('fields')}
                />
                {expandedSections.fields && (
                    <div className="bg-white rounded-lg p-4 min-h-[200px] border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Add field cards/banners here */}
                            <p className="text-gray-500 col-span-full">No fields followed yet</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Courses Section */}
            <div className="space-y-2 border-l-4 border-l-blue-500 rounded-lg">
                <SectionHeader 
                    title="My Followed Courses"
                    isExpanded={expandedSections.courses}
                    onToggle={() => toggleSection('courses')}
                />
                {expandedSections.courses && (
                    <div className="bg-white rounded-lg p-4 min-h-[200px] border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Add course cards/banners here */}
                            <p className="text-gray-500 col-span-full">No courses followed yet</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Subjects Section */}
            <div className="space-y-2 border-l-4 border-l-blue-500 rounded-lg">
                <SectionHeader 
                    title="My Followed Subjects"
                    isExpanded={expandedSections.subjects}
                    onToggle={() => toggleSection('subjects')}
                />
                {expandedSections.subjects && (
                    <div className="bg-white rounded-lg p-4 min-h-[200px] border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Add subject cards/banners here */}
                            <p className="text-gray-500 col-span-full">No subjects followed yet</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Library;