import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import AuthLayout from "../layout/AuthLayout";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import PrimaryButton from "../components/PrimaryButton";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Email regex (A–Z, a–z, 0–9, ., @)
  const emailRegex =
    /^[A-Za-z0-9._]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

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

    // Validate password (example rule)
    if (password.length < 6) {
      setPasswordError("Password is incorrect");
      valid = false;
    }

    // If both valid → proceed
    if (valid) {
      navigate("/profile-details");
    }
  };

  return (
    <PageWrapper>
      <AuthLayout>
        <h2 className="text-xl font-semibold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 text-center mb-8">
          Login to your account
        </p>

        <div className="space-y-4">
          <InputField
            placeholder="email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />

          <PasswordInput
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
          />
        </div>

        <div className="mt-6">
          <PrimaryButton
            text="Sign In"
            onClick={handleSubmit}
          />
        </div>

        <p
          onClick={() => navigate("/forgot-password")}
          className="text-xs text-gray-400 text-center mt-4 cursor-pointer hover:text-black"
        >
          Forgot Password?
        </p>
      </AuthLayout>
    </PageWrapper>
  );
}