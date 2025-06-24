import  { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://stayfinder-1232.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
        navigate("/");
      } else {
        alert(data.msg || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-pink-600">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white font-semibold py-2 rounded hover:bg-pink-700 transition"
        >
          Login
        </button>

        {/* New User? Register Link */}
        <p className="text-center text-sm mt-4 text-gray-700">
          New user?{" "}
          <Link to="/register" className="text-pink-600 hover:underline font-medium">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
