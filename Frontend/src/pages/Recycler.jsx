import { Truck, MapPin, Clock, IndianRupee } from "lucide-react";
import Navbar from "../components/navbar";
import PickupCard from "../components/PickupCard";
function Recycler() {
    const pickups = [
    {
        id: 1,
        category: "E-Waste",
        item: "Keyboard",
        image: "/keyboard.jpg",
        distance: "1.2 km",
        time: "15 mins",
        requestedBy: "Rahul Sharma",
        value: "₹50 – ₹150",
        pickupTime: "Today, 10:30 AM", },
    {
        id: 2,
        category: "Plastic",
        item: "PET Bottles",
        image: "/plastic.jpg",
        distance: "2.5 km",
        time: "25 mins",
        requestedBy: "Priya Singh",
        value: "₹10 – ₹20",
        pickupTime: "Today, 11:15 AM",
        },
        {
        id: 3,
        category: "Paper",
        item: "Cardboard Boxes",
        image: "/cardboard.jpg",
        distance: "3.8 km",
        time: "35 mins",
        requestedBy: "Amit Verma",
        value: "₹15 – ₹30",
        pickupTime: "Today, 12:00 PM",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar/>
        {/* Navbar */}
        <div className="bg-white pt-8 px-6">
            <div className="max-w-6xl mx-auto flex items-center justify-between">           
                <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                        <Truck className="text-green-600" size={30} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Today's Pickups
                        </h1>
                        <p className="text-xs text-gray-500">
                            New requests from nearby households
                        </p>
                    </div>
                </div>
            </div>
        </div>
        {/* Main */}
        <main className="max-w-6xl mx-auto px-5 py-8">
            {/* Pickup List */}
            <div className="space-y-4">
            {pickups.map((pickup) => (
                <PickupCard pickup={pickup}/>
            ))}
            </div>
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {/* Total Pickups */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-full">
                    <Truck className="text-green-600" size={20} />
                </div>
                <div>
                    <p className="text-xs text-gray-500">
                    Total Pickups Today
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                    3
                    </p>
                </div>
                </div>
            </div>
            {/* Earnings */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <IndianRupee className="text-blue-600" size={20} />
                    </div>
                <div>
                    <p className="text-xs text-gray-500">
                    Estimated Earnings
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                    ₹85 – ₹180
                    </p>
                </div>
                </div>
            </div>
            {/* Distance */}
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
                <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-full">
                    <MapPin className="text-purple-600" size={20} />
                </div>
                <div>
                    <p className="text-xs text-gray-500">
                    Distance (approx.)
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                    8.5 km
                    </p>
                </div>
                </div>
            </div>
            </div>
        </main>
        </div>
    );
}
export default Recycler;