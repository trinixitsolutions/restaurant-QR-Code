import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Temporary navigation (backend later)
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center px-6">
      
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Sign In
      </h1>

      <p className="text-gray-500 mb-8">
        Welcome back! Please login to continue
      </p>

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        className="border rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        className="border rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Sign In Button */}
      <button
        onClick={handleLogin}
        className="bg-green-600 text-white py-3 rounded-lg font-semibold mb-4"
      >
        Sign In
      </button>

      {/* Sign Up Link */}
      <p className="text-center text-gray-600">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-green-600 font-semibold">
          Sign Up
        </Link>
      </p>

    </div>
  );
}
