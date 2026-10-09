import {Recycle,Package,CircleDot,Weight, IndianRupee, CircleCheck} from "lucide-react";
import RecyclerCard from "../components/recyclerCard";
import Navbar from "../components/navbar";
import DetailsCard from "../components/DetailsCard";
import { useLocation } from "react-router-dom";
function WasteResult() {
    const location=useLocation();
    const waste = location.state;
    console.log(waste);
    return (
        <div className="min-h-screen bg-white">
        {/* Navbar */}
        <Navbar/>

        {/* Result */}
        <main className="max-w-7xl mx-auto px-6 py-10">
            {/* Heading */}
            <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mt-2">
                Your waste has been identified
            </h1>
            <p className="text-gray-500 mt-2">
                Here's what GreenLoop found from your uploaded image.
            </p>
            </div>
            {/* Main Card */}
            <div className="bg-white border rounded-2xl shadow-sm p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"> 
                {/* Image */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-sm h-64 bg-gray-100 rounded-xl overflow-hidden">
                            <img
                            src={waste.image.url}
                            alt={waste.item}
                            className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                {/* Main Information */}
                <div className="flex flex-col justify-center">
                    {/* Status */}
                    <span className="flex items-center justify-center gap-2 w-fit bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-3">
                        <CircleCheck size={18}/>AI Analysis Complete
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900">
                        {waste.category}
                    </h2>
                    <p className="text-lg text-gray-600 mt-1">
                        {waste.item}
                    </p>
                    {/* Recyclable */}
                    <div className="flex items-center gap-2 w-fit bg-green-100 text-green-700 px-4 py-2 rounded-full mt-3">
                        <Recycle size={18} />
                        <span className="font-semibold">
                        Recyclable
                        </span>
                    </div>
                    {/* Value */}
                    <div className="mt-4">
                        <p className="text-gray-500 text-xl text-sm">
                        Estimated Value
                        </p>
                        <p className="flex items-center text-3xl font-bold text-green-600 mt-1">
                            <IndianRupee size={26}/>
                        {waste.estimatedValue}
                        </p>
                        <p className="text-sm text-gray-500">
                        (approx. range)
                        </p>
                    </div>
                </div>
                {/* Details */}
                <div className="bg-blue-50 rounded-2xl p-6 flex flex-col justify-center gap-6">
                    {/* Category */}
                    <DetailsCard title="Category" result={waste.category} Icon={Package}/>
                    {/* Material */}
                    <DetailsCard title="Material" result={waste.material} Icon={Recycle}/>
                    {/* Weight */}
                    <DetailsCard title="Weight (est.)" result={waste.weight} Icon={Weight}/>
                    {/* Items detected */}
                    <DetailsCard title="Item(s) Detected" result={waste.detected} Icon={CircleDot}/>
                </div>
            </div>
            </div>
            {/* Find Recyclers */}
            <div className="bg-white rounded-2xl shadow-sm border p-6 my-4">
                <h2 className="text-xl font-semibold">
                    Find a Nearby Recycler
                </h2>
                <p className="text-gray-500">Choose a recycler near you and request a pickup</p>
                <RecyclerCard/>
            </div>
        </main>
        </div>
    );
}

export default WasteResult;