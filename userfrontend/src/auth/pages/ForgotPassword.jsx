import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";

import AuthLayout from "../layout/AuthLayout";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import Divider from "../components/Divider";


export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const isValid = email.trim().length > 0;

  return (
    <PageWrapper>
      <AuthLayout>
        <h1 className="text-lg font-semibold text-center mb-8">
          Hotel Management
        </h1>

        <h2 className="text-base font-semibold text-center mb-2">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your registered email to reset your password
        </p>

        <InputField
          placeholder="email@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="mt-6">
          <PrimaryButton
            text="Send Reset Link"
            disabled={!isValid}
            onClick={() => navigate("/login")}
          />
        </div>
      </AuthLayout>
    </PageWrapper>
  );
}
