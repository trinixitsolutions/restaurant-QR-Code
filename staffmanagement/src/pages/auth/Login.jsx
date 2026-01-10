import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Email regex (A–Z, a–z, 0–9, ., @) - Matching userfrontend
    const emailRegex = /^[A-Za-z0-9._]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    // Strict password regex: 8-20 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,20}$/;

    const handleSubmit = () => {
        let valid = true;

        // Reset errors
        setEmailError("");
        setPasswordError("");

        // Validate email
        if (!emailRegex.test(email)) {
            setEmailError("Email is incorrect");
            valid = false;
        }

        // Validate password
        if (!PASSWORD_REGEX.test(password)) {
            setPasswordError("Password must be 8–20 chars with uppercase, lowercase, number & symbol");
            valid = false;
        }

        // If both valid → proceed
        if (valid) {
            navigate("/staff/orders");
        }
    };

    return (
        <PageWrapper className="bg-white min-h-screen flex flex-col px-6 pt-10 text-black max-w-[430px] mx-auto">
            <h1 className="text-xl font-bold text-center mb-8">
                Hotel Management
            </h1>

            <h2 className="text-base font-semibold text-center text-black">
                Welcome Back
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
                Login to your account
            </p>

            <div className="space-y-4">
                {/* Email Input */}
                <div>
                    <input
                        type="email"
                        placeholder="email@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-colors`}
                    />
                    {emailError && <p className="text-red-500 text-xs mt-1 ml-1">{emailError}</p>}
                </div>

                {/* Password Input */}
                <div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-colors pr-10`}
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                    </div>
                    {passwordError && <p className="text-red-500 text-xs mt-1 ml-1">{passwordError}</p>}
                </div>
            </div>

            <div className="mt-6">
                <button
                    onClick={handleSubmit}
                    className="w-full bg-black text-white font-bold py-3.5 rounded-xl transition-transform active:scale-[0.98]"
                >
                    Sign In
                </button>
            </div>

            <p
                className="text-xs text-gray-400 text-center mt-4 cursor-pointer hover:text-black transition-colors"
            >
                Forgot Password?
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
                <div className="h-[1px] bg-gray-200 flex-1"></div>
                <span className="text-gray-400 text-sm">or</span>
                <div className="h-[1px] bg-gray-200 flex-1"></div>
            </div>

            <button
                onClick={() => navigate("/staff/signup")}
                className="w-full bg-gray-100 text-black font-bold py-3.5 rounded-xl active:scale-[0.98] transition-colors hover:bg-gray-200"
            >
                Create an account
            </button>
        </PageWrapper>
    );
}
