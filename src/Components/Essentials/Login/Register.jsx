import { useState } from "react";
import { FaUser, FaLock, FaGraduationCap, FaGoogle, FaEnvelope, FaPhone, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

// Update the component definition to include onLoginClick
export default function Register({ isOpen, onClose, onLoginClick }) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError("");
    };

    const validateForm = () => {
        if (!formData.username || !formData.email || !formData.phoneNumber || !formData.password || !formData.confirmPassword) {
            setError("All fields are required");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError("Invalid email format");
            return false;
        }
        if (!/^\d{10}$/.test(formData.phoneNumber)) {
            setError("Invalid phone number");
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;
        setIsSubmitting(true);
        // Add your registration logic here
        setIsSubmitting(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center p-4 overflow-y-auto" role="dialog" aria-modal="true">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 w-full max-w-[380px] text-center relative my-auto">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-1 text-gray-500 hover:text-gray-700"
                    aria-label="Close modal"
                >
                    <FaTimes className="w-4 h-4" />
                </button>

                <FaGraduationCap className="text-blue-600 text-3xl sm:text-4xl mx-auto mb-1" />
                <h2 className="text-lg sm:text-xl font-bold mb-1">UniGUIDE</h2>
                <p className="text-gray-500 text-xs sm:text-sm mb-3">Welcome!</p>

                <button className="w-full flex items-center justify-center border rounded-lg py-1.5 mb-3 text-sm">
                    <FaGoogle className="text-blue-500 text-base sm:text-lg mr-2" />
                    Register with Google
                </button>

                <div className="flex items-center my-3">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500 text-xs">OR REGISTER WITH EMAIL</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center border rounded-lg px-2 py-1.5">
                        <FaUser className="text-gray-500 mr-2 text-sm sm:text-base" />
                        <Input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full border-none focus:ring-0 text-xs sm:text-sm py-0"
                        />
                    </div>

                    <div className="flex items-center border rounded-lg px-2 py-1.5">
                        <FaEnvelope className="text-gray-500 mr-2 text-sm sm:text-base" />
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border-none focus:ring-0 text-xs sm:text-sm py-0"
                        />
                    </div>

                    <div className="flex items-center border rounded-lg px-2 py-1.5">
                        <FaPhone className="text-gray-500 mr-2 text-sm sm:text-base" />
                        <Input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full border-none focus:ring-0 text-xs sm:text-sm py-0"
                            maxLength={10}
                        />
                    </div>

                    <div className="relative">
                        <div className="flex items-center border rounded-lg px-2 py-1.5">
                            <FaLock className="text-gray-500 mr-2 text-sm sm:text-base" />
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border-none focus:ring-0 text-xs sm:text-sm py-0"
                            />
                        </div>
                        <button
                            type="button"
                            className="absolute right-3 top-3 p-1 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <div className="relative">
                        <div className="flex items-center border rounded-lg px-2 py-1.5">
                            <FaLock className="text-gray-500 mr-2 text-sm sm:text-base" />
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full border-none focus:ring-0 text-xs sm:text-sm py-0"
                            />
                        </div>
                        <button
                            type="button"
                            className="absolute right-3 top-3 p-1 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

                    <Button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-lg text-sm"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Registering..." : "Register"}
                    </Button>

                    <div className="mt-3 text-xs">
                        <span className="text-gray-600">Already have an account? </span>
                        <button
                            onClick={onLoginClick}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Login here
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}