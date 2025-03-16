import React, { useState } from "react";
import { FaGoogle, FaTimes } from "react-icons/fa";

const Login = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isOtpLogin, setIsOtpLogin] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 w-full max-w-[90%] md:max-w-md text-center relative">
                <button className="absolute top-2 md:top-4 right-2 md:right-4 text-gray-700 text-xl md:text-2xl" onClick={onClose}>
                    <FaTimes />
                </button>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">{isLogin ? "LogIn" : "Register"}</h1>

                <button className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 md:py-3 px-4 rounded-lg mb-3 text-sm md:text-base">
                    <FaGoogle /> Continue with Google
                </button>

                {!isOtpLogin && (
                    <>
                        <input type="email" placeholder="Email" className="w-full p-2 md:p-3 border rounded mb-3 text-sm md:text-base" />
                        <input type="password" placeholder="Password" className="w-full p-2 md:p-3 border rounded mb-3 text-sm md:text-base" disabled={!emailVerified} />
                        {!isLogin && <input type="password" placeholder="Confirm Password" className="w-full p-2 md:p-3 border rounded mb-3 text-sm md:text-base" disabled={!emailVerified} />}
                    </>
                )}

                {isOtpLogin && (
                    <>
                        <input type="tel" placeholder="Phone Number" className="w-full p-2 md:p-3 border rounded mb-3 text-sm md:text-base" />
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 md:py-3 px-4 rounded-lg mb-3 text-sm md:text-base">
                            Send OTP
                        </button>
                        <input type="text" placeholder="Enter OTP" className="w-full p-2 md:p-3 border rounded mb-3 text-sm md:text-base" />
                        {isLogin && <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 md:py-3 px-4 rounded-lg mb-3 text-sm md:text-base">Verify OTP</button>}
                    </>
                )}

                {isLogin ? (
                    <>
                        <p className="text-blue-500 cursor-pointer mb-3 text-sm md:text-base" onClick={() => setIsOtpLogin(!isOtpLogin)}>
                            {isOtpLogin ? "Login with Email/Password" : "Login with OTP"}
                        </p>
                        <p className="text-blue-500 cursor-pointer mb-3 text-sm md:text-base">Forgot Password?</p>
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 md:py-3 px-4 rounded-lg mb-3 text-sm md:text-base">Login</button>
                        <p className="text-gray-700 text-sm md:text-base">Not a user? <span className="text-blue-500 cursor-pointer" onClick={() => setIsLogin(false)}>Then Register</span></p>
                    </>
                ) : (
                    <>
                        <input type="tel" placeholder="Phone Number" className="w-full p-2 md:p-3 border rounded mb-3 text-sm md:text-base" />
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 md:py-3 px-4 rounded-lg mb-3 text-sm md:text-base" onClick={() => setEmailVerified(true)}>
                            Send Verification Email
                        </button>
                        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 md:py-3 px-4 rounded-lg mb-3 text-sm md:text-base" disabled={!emailVerified}>
                            Register
                        </button>
                        <p className="text-gray-700 text-sm md:text-base">Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => setIsLogin(true)}>LogIn</span></p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
