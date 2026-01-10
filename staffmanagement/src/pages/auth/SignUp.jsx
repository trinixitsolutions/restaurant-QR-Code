import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function SignUp() {
  const navigate = useNavigate();

  /* ---------------- STATE ---------------- */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirm: "",
  });

  /* ---------------- STRICT INDUSTRY REGEX ---------------- */
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,20}$/;

  /* ---------------- VALIDATION ---------------- */
  const validateEmail = (v) => {
    if (v.length > 254) return "Email must not exceed 254 characters";
    return EMAIL_REGEX.test(v) ? "" : "Enter a valid email address";
  };

  const validatePassword = (v) =>
    PASSWORD_REGEX.test(v)
      ? ""
      : "Password must be 8–20 chars with uppercase, lowercase, number & symbol";

  const validateConfirm = (v) =>
    v === password ? "" : "Passwords do not match";

  /* ---------------- CONFIRM PASSWORD SYNC ---------------- */
  useEffect(() => {
    if (confirm) {
      setErrors((prev) => ({
        ...prev,
        confirm: validateConfirm(confirm),
      }));
    }
  }, [password, confirm]);

  /* ---------------- HANDLERS ---------------- */
  const handleEmailChange = (e) => {
    const v = e.target.value;
    setEmail(v);
    setErrors((prev) => ({
      ...prev,
      email: v ? "" : "Email is required",
    }));
  };

  const handleEmailBlur = () => {
    setErrors((prev) => ({
      ...prev,
      email: email ? validateEmail(email.trim()) : "Email is required",
    }));
  };

  const handlePasswordChange = (e) => {
    const v = e.target.value;
    setPassword(v);
    setErrors((prev) => ({
      ...prev,
      password: v ? validatePassword(v) : "Password is required",
    }));
  };

  const handleConfirmChange = (e) => {
    const v = e.target.value;
    setConfirm(v);
    setErrors((prev) => ({
      ...prev,
      confirm: v ? validateConfirm(v) : "Confirm your password",
    }));
  };

  /* ---------------- FORM VALID ---------------- */
  const isValid =
    email &&
    password &&
    confirm &&
    !errors.email &&
    !errors.password &&
    !errors.confirm;

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = () => {
    const emailError = validateEmail(email.trim());
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }));
      return;
    }

    if (!isValid) return;
    navigate("/staff/login");
  };

  return (
    <PageWrapper className="bg-white min-h-screen flex flex-col px-6 pt-10 text-black max-w-[430px] mx-auto">
      <h1 className="text-xl font-bold text-center mb-8">
        Hotel Management
      </h1>

      <h2 className="text-base font-semibold text-center text-black">
        Create an account
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Enter your email to sign up for this app
      </p>

      <div className="space-y-4">
        {/* Email Input */}
        <div>
          <input
            type="email"
            placeholder="email@domain.com"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            maxLength={254}
            className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-colors`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-colors pr-10`}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1 ml-1 leading-tight">{errors.password}</p>}
        </div>

        {/* Confirm Password Input */}
        <div>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirm}
              onChange={handleConfirmChange}
              className={`w-full border ${errors.confirm ? 'border-red-500' : 'border-gray-300'} rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-colors pr-10`}
            />
            <button
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
          {errors.confirm && <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirm}</p>}
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full font-bold py-3.5 rounded-xl transition-transform active:scale-[0.98] ${isValid ? "bg-black text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } `}
        >
          Continue
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="h-[1px] bg-gray-200 flex-1"></div>
        <span className="text-gray-400 text-sm">or</span>
        <div className="h-[1px] bg-gray-200 flex-1"></div>
      </div>

      <button
        onClick={() => navigate("/staff/login")}
        className="w-full bg-black text-white font-bold py-3.5 rounded-xl active:scale-[0.98] transition-colors hover:opacity-90"
      >
        Sign In
      </button>

      <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
        By clicking continue, you agree to our{" "}
        <span className="text-black font-medium">Terms of Service</span>{" "}
        and{" "}
        <span className="text-black font-medium">Privacy Policy</span>
      </p>
    </PageWrapper>
  );
}

