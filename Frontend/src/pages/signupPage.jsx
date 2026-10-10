import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Recycle } from "lucide-react";
export default function UserSignup({role}) {
    const navigate = useNavigate();
    console.log(role);
    const inputClass ="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus focus focus";
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        businessName: "",
        serviceAreas: "",});
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
            const payload = {name: form.name,
                email: form.email,
                password: form.password,
                phone: form.phone,
                address: form.address,};
            if (role=="recycler") {
                payload.businessName = form.businessName;
                payload.serviceAreas = form.serviceAreas.split(",").map((area) => area.trim()).filter(Boolean);
            }
            await axios.post(`http://localhost:8080/${role}/register`, payload);
            navigate(`/${role}/login`, {
                state: { message: "Account created! Please log in." },
            });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Signup failed. Please try again."
            );
        } finally {
            setLoading(false);
    }};
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
            Create your account
        </h1>
        <p className="text-gray-500 text-center mt-2 mb-6">
            Start making recycling easier.
        </p>
        {error && ( <p role="alert"  className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">  {error}</p> )}
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">
                    Full name
                </label>
                <input type="text"  name="name"  value={form.name}  onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    autoComplete="name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">
                    Email
                </label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"/>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">
                Phone number
                </label>
                <input  type="tel"  name="phone"  value={form.phone}  onChange={handleChange}
                placeholder="Enter phone number"
                autoComplete="tel"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">
                    Password
                </label>
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="At least 8 characters" minLength={8}
                    required
                    autoComplete="new-password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                {role=="recycler" ? "Business Address" : "Pickup Address"}
                </label>
                <textarea className={inputClass} name="address" value={form.address} onChange={handleChange}
                placeholder={ role=="recycler" ? "Enter your business address" : "Where should your waste be picked up?"}
                autoComplete="street-address"
                rows={2}
                required
                />
            </div>
            {role=="recycler" && (<div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Business Name
                </label>
                <input className={inputClass}  name="businessName"  value={form.businessName} onChange={handleChange}
                    placeholder="Enter your business name"
                    required/>
            </div>
            )}
            {role=="recycler" && (<div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Service Areas
                </label>
                <input className={inputClass} name="serviceAreas" value={form.serviceAreas}
                    onChange={handleChange}
                    placeholder="Madhapur, Gachibowli, Kondapur"
                />
            <p className="mt-1 text-xs text-gray-500">
                Separate areas with commas.
            </p>
            </div>)}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60" >
                {loading ? "Creating account..." : "Sign Up"}
            </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/user/login" className="text-green-700 font-semibold hover:underline"  >
                Log in
            </Link>
        </p>
    </div>
    </div>
);
}
