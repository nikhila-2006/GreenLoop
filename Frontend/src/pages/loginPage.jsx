import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
export default function UserLogin({role}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:8080/${role}/login`, form);
            const { token, user } = response.data;
            if (!token) {
                throw new Error("Login response did not contain a token.");
            }
            if (role === "user") {
                localStorage.removeItem("recyclerToken");
                localStorage.removeItem("recycler");
                localStorage.setItem("token", token);
                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                }
                navigate("/", { replace: true });
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.setItem("recyclerToken", token);
                if (user) {
                    localStorage.setItem("recycler", JSON.stringify(user));
                }
                navigate("/pickup", { replace: true });
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Login failed. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
};
return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                    <span className="text-white text-xl"><img src="../logo.png" alt="logo" /></span>
                </div>
                <span className="text-3xl font-bold text-green-1000">
                    Green<span className="text-3xl font-bold text-green-600">Loop</span>
                </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 text-center">
            Welcome back
            </h1>
            <p className="text-gray-500 text-center mt-2 mb-6">
                Log in to your GreenLoop account.
            </p>
                {location.state?.message && (
                    <p className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm">
                    {location.state.message}
                    </p>)}
            {error && (
            <p role="alert" className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
                {error}
            </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-lg font-medium mb-1">
                    Email
                    </label>
                    <input  type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required
                    autoComplete="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"/>
                </div>
                <div>
                    <label className="block text-lg font-medium mb-1">
                    Password
                    </label>
                    <input  type="password"  name="password"  value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password" required autoComplete="current-password" className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"  />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60">
                    {loading ? "Logging in..." : "Log In"}
                </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-6">
                Don't have an account?{" "}
                <Link  to={role=="recycler" ? "/recycler/signup" : "/user/signup"} className="text-green-700 font-semibold hover:underline" >
                    Sign up
                </Link>
            </p>
        </div>
    </div>
);
}