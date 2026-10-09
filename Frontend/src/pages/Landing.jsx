import { ArrowRight, Camera, Brain, MapPin, Truck } from "lucide-react";
import Navbar from "../components/navbar";
import StepsCard from '../components/StepsCard';
import { Link } from "react-router-dom";
function LandingPage() {
    return (
    <div className="min-h-screen bg-white text-slate-800">
        <Navbar/>
        {/* Hero */}
        <section className="px-8 py-20">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"> 
            {/* Left */}
            <div>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight text-slate-900">
                Turn Your Waste
                <span className="block text-green-600">
                    into Real Value
                </span>
                </h1>
                <p className="mt-6 text-lg text-slate-600 max-w-lg leading-relaxed">
                Identify recyclable and e-waste items, discover their
                estimated value, and connect with nearby informal recyclers
                for convenient pickup.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/upload" className="flex items-center gap-2 px-6 py-3.5 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800">
                    Identify My Waste
                    <ArrowRight size={18} />
                </Link>
                <button className="px-6 py-3.5 border border-green-700 text-green-800 rounded-lg font-semibold hover:bg-green-50">
                    For Recyclers
                </button>
                </div>
            </div>
            {/* Right - visual placeholder */}
            <div className=" flex items-center justify-center min-h-[380px]">
                <img src="./hero.png" alt="" />
            </div>
            </div>
        </section>
        {/* How it works */}
        <section id="how-it-works" className="bg-slate-50 px-8 py-16">
            <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mt-2">
                From Waste to Pickup in 4 Steps
                </h2>
                <p className="text-slate-600 mt-4">
                Simple for households. Valuable for recyclers.
                </p>
            </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Step 1 */}
                    <StepsCard title="Upload Photo" description="Take a photo of your recyclable waste." Icon={Camera}/>
                    {/* Step 2 */}
                    <StepsCard title="Get AI Analysis" description="Identify the waste category and estimated value." Icon={Brain}/>
                    {/* Step 3 */}
                    <StepsCard title="Find a Recycler" description="Connect with a nearby informal recycler." Icon={MapPin}/>
                    {/* Step 4 */}
                    <StepsCard title="Schedule Pickup" description="Request a convenient pickup for your waste." Icon={Truck}/>
                </div>
            </div>
        </section>
    </div>
    );
}
export default LandingPage;