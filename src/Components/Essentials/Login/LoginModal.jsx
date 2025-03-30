import { useState, useEffect } from "react";
import { FaUser, FaLock, FaGraduationCap, FaGoogle, FaMobileAlt, FaSms, FaEye, FaEyeSlash, FaWhatsapp, FaTimes } from "react-icons/fa";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function LoginModal({ isOpen, onClose, onRegisterClick, onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check credentials
        if (username === "ad" && password === "123") {
            console.log("LoginModal: Credentials verified"); // Debug log
            onLoginSuccess?.(); // Call the success handler
        } else {
            console.log("LoginModal: Invalid credentials"); // Debug log
            // Handle invalid credentials
        }
    };

    // State for main login form
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

    // State for OTP flow
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isOtpVerificationModalOpen, setIsOtpVerificationModalOpen] = useState(false);
    const [otp, setOtp] = useState("");
    const [verificationError, setVerificationError] = useState("");
    const [isSubmittingOtp, setIsSubmittingOtp] = useState(false);

    // State for resend functionality
    const [resendTimer, setResendTimer] = useState(60);
    const [isResendAvailable, setIsResendAvailable] = useState(false);
    const [showResendOptions, setShowResendOptions] = useState(false);

    const [isEditingPhone, setIsEditingPhone] = useState(false);

    // Validation functions
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone) => {
        return /^\d{10}$/.test(phone);
    };

    // Effect for resend timer
    useEffect(() => {
        if (isOtpVerificationModalOpen) {
            const timer = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isOtpVerificationModalOpen]);

    // Effect for showing resend options
    useEffect(() => {
        if (!isOtpVerificationModalOpen) return;

        const timer = setTimeout(() => {
            setShowResendOptions(true);
        }, 60000); // Show resend options after 60 seconds

        return () => clearTimeout(timer);
    }, [isOtpVerificationModalOpen]);

    // Effect for resetting resend state
    useEffect(() => {
        if (resendTimer === 0) {
            setIsResendAvailable(true);
            setResendTimer(60);
        }
    }, [resendTimer]);

    // Handle login with email/password
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmittingLogin(true);
        setLoginError("");

        try {
            if (!username || !password) {
                setLoginError("Please enter both username and password.");
                return;
            }

            // Check for admin credentials
            if (username === "user" && password === "321") {
                console.log("Login successful"); // Debug log
                if (onLoginSuccess) {
                    await onLoginSuccess(); // Ensure we wait for this to complete
                }
                onClose();
            } else {
                setLoginError("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            setLoginError("An error occurred during login");
        } finally {
            setIsSubmittingLogin(false);
        }
    };

    // Handle OTP login request
    const handleOtpLogin = () => {
        if (validatePhone(phoneNumber)) {
            setIsOtpVerificationModalOpen(true);
        }
    };

    // Handle WhatsApp OTP login request
    const handleWhatsAppOtpLogin = () => {
        if (validatePhone(phoneNumber)) {
            setIsOtpVerificationModalOpen(true);
        }
    };

    // Handle OTP input change
    const handleOtpChange = (index, value) => {
        const newOtp = otp.split("");
        newOtp[index] = value;
        setOtp(newOtp.join(""));

        if (value && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    // Handle OTP verification
    const handleOtpVerification = () => {
        if (otp.length !== 6) {
            setVerificationError("Please enter a valid 6-digit OTP");
            return;
        }

        setIsSubmittingOtp(true);
        setVerificationError("");

        // Simulate successful verification
        setIsSubmittingOtp(false);
        onClose();
    };

    // Handle resend actions
    const handleResendWhatsApp = () => {
        setShowResendOptions(false);
        setResendTimer(60);
        setIsResendAvailable(false);
        setTimeout(() => setShowResendOptions(true), 60000);
    };
    const handleResendSMS = () => {
        setShowResendOptions(false);
        setResendTimer(60);
        setIsResendAvailable(false);
        setTimeout(() => setShowResendOptions(true), 60000);
    };

    // OTP Verification Modal Component
    const OtpVerificationModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-96 text-center relative">
                <button
                    onClick={() => {
                        setIsOtpVerificationModalOpen(false);
                        setIsOtpModalOpen(false);
                    }}
                    className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700"
                    aria-label="Close modal"
                >
                    <FaTimes className="w-4 h-4" />
                </button>

                <div className="flex items-center mb-4">
                    <FaLock className="text-pink-500 text-xl mr-2" />
                    <h3 className="text-xl font-semibold">Enter OTP</h3>
                </div>

                {isEditingPhone ? (
                    <div className="mb-6">
                        <div className="flex items-center border rounded-lg px-3 py-2">
                            <span className="text-gray-500 mr-2">🇮🇳 +91</span>
                            <Input
                                type="tel"
                                placeholder="Mobile Number"
                                value={phoneNumber}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    setPhoneNumber(value);
                                }}
                                className="w-full border-none focus:ring-0"
                                maxLength={10}
                            />
                        </div>
                        <Button
                            onClick={() => setIsEditingPhone(false)}
                            className="mt-2 text-blue-500 text-sm"
                            disabled={!validatePhone(phoneNumber)}
                        >
                            Confirm
                        </Button>
                    </div>
                ) : (
                    <p className="text-sm text-gray-600 mb-6">
                        Code is sent to +91-{phoneNumber}{' '}
                        <button 
                            className="text-blue-500 underline cursor-pointer"
                            onClick={() => setIsEditingPhone(true)}
                        >
                            Edit
                        </button>
                    </p>
                )}

                <div className="flex justify-center mb-6">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                            key={index}
                            type="text"
                            id={`otp-input-${index}`}
                            className="w-8 h-8 border rounded text-center mx-1 border-gray-300 focus:outline-none focus:border-blue-500"
                            maxLength={1}
                            value={otp[index] || ''}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onFocus={(e) => e.target.select()}
                        />
                    ))}
                </div>

                {!showResendOptions ? (
                    <div className="mb-6">
                        <button
                            onClick={handleResendSMS}
                            className="text-sm text-blue-500 underline"
                            disabled={!isResendAvailable}
                        >
                            Resend OTP {isResendAvailable ? "" : `in ${resendTimer}s`}
                        </button>
                    </div>
                ) : (
                    <div className="mb-6 space-y-3">
                        <p className="text-sm text-gray-600">Didn't receive code?</p>
                        <button
                            onClick={handleResendWhatsApp}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center"
                        >
                            <FaWhatsapp className="mr-2 text-white" />
                            Resend OTP via Whatsapp
                        </button>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleResendSMS}
                                className="text-sm text-blue-500 underline"
                            >
                                Resend OTP via SMS
                            </button>
                        </div>
                    </div>
                )}

                <Button
                    onClick={handleOtpVerification}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-6"
                    disabled={otp.length !== 6 || isSubmittingOtp}
                >
                    {isSubmittingOtp ? "Verifying..." : "Verify & Login"}
                </Button>

                {verificationError && (
                    <p className="text-red-500 text-sm mt-2">{verificationError}</p>
                )}
            </div>
        </div>
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center p-4 overflow-y-auto" role="dialog" aria-modal="true">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 w-full max-w-[380px] text-center relative min-h-[200px] my-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700"
                    aria-label="Close modal"
                >
                    <FaTimes className="w-4 h-4" />
                </button>

                <FaGraduationCap className="text-blue-600 text-3xl sm:text-4xl mx-auto mb-1" />
                <h2 className="text-lg sm:text-xl font-bold mb-1">UniGUIDE</h2>
                <p className="text-gray-500 text-xs sm:text-sm mb-3">Welcome!</p>

                {!isOtpModalOpen ? (
                    <>
                        <button className="w-full flex items-center justify-center border rounded-lg py-2 mb-4">
                            <FaGoogle className="text-blue-500 text-lg mr-2" />
                            Sign in with Google
                        </button>

                        <div className="flex items-center my-4">
                            <hr className="flex-grow border-gray-300" />
                            <span className="px-2 text-gray-500 text-sm">OR LOGIN WITH EMAIL</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center border rounded-lg px-3 py-2">
                                <FaUser className="text-gray-500 mr-2" />
                                <Input
                                    type="text"
                                    placeholder="Username/Email"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        setLoginError("");
                                    }}
                                    className="w-full border-none focus:ring-0"
                                    aria-invalid={!!loginError}
                                />
                            </div>

                            <div className="relative">
                                <div className="flex items-center border rounded-lg px-3 py-2">
                                    <FaLock className="text-gray-500 mr-2" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setLoginError("");
                                        }}
                                        placeholder="Password"
                                        className="w-full border-none focus:ring-0"
                                    />
                                </div>
                                <button
                                    className="absolute right-3 top-3 p-1 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

                            <Button
                                onClick={handleLogin}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                                disabled={isSubmittingLogin}
                            >
                                {isSubmittingLogin ? "Logging in..." : "Login"}
                            </Button>

                            <div className="flex items-center my-4">
                                <hr className="flex-grow border-gray-300" />
                                <span className="px-2 text-gray-500 text-sm">OR LOGIN WITH OTP</span>
                                <hr className="flex-grow border-gray-300" />
                            </div>

                            <Button
                                onClick={() => setIsOtpModalOpen(true)}
                                className="w-full flex items-center justify-center border rounded-lg py-2 mb-4 text-blue-500 hover:bg-blue-600 hover:text-white"
                            >
                                Login With OTP
                            </Button>
                        </div>

                        {!isOtpModalOpen && (
                            <div className="mt-4 text-sm">
                                <span className="text-gray-600">New to UniGUIDE? </span>
                                <button
                                    onClick={onRegisterClick}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Register here
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="flex flex-col space-y-6 mb-6">
                            <div className="flex items-center border rounded-lg px-3 py-2">
                                <span className="text-gray-500 mr-2">🇮🇳 +91</span>
                                <Input
                                    type="tel"
                                    placeholder="Mobile Number"
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        setPhoneNumber(value);
                                        setLoginError("");
                                    }}
                                    className="w-full border-none focus:ring-0"
                                    maxLength={10}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-4 mb-4">
                            <Button
                                onClick={handleOtpLogin}
                                className={`w-full py-2 rounded-lg flex items-center justify-center ${phoneNumber && validatePhone(phoneNumber) ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-400 text-white"}`}
                                disabled={!phoneNumber || !validatePhone(phoneNumber) || isSubmittingLogin}
                            >
                                {isSubmittingLogin ? "Sending OTP..." : "Get OTP via SMS"}
                            </Button>

                            <Button
                                onClick={handleWhatsAppOtpLogin}
                                className={`w-full py-2 rounded-lg flex items-center justify-center ${phoneNumber && validatePhone(phoneNumber) ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-400 text-white"}`}
                                disabled={!phoneNumber || !validatePhone(phoneNumber)}
                            >
                                <FaWhatsapp className="mr-2" /> Get OTP via WhatsApp
                            </Button>
                        </div>

                        <div className="flex items-center my-4">
                            <hr className="flex-grow border-gray-300" />
                            <span className="px-2 text-gray-500 text-sm">OR LOGIN WITH EMAIL</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>

                        <Button
                            onClick={() => setIsOtpModalOpen(false)}
                            className="w-full flex items-center justify-center border rounded-lg py-2 mb-4 text-blue-500 hover:bg-blue-600 hover:text-white"
                        >
                            Login with Email/Username
                        </Button>
                    </>
                )}
            </div>
            {isOtpVerificationModalOpen && <OtpVerificationModal />}
        </div>
    );
}