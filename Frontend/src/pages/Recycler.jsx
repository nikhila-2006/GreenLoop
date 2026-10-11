import { Truck, Clock, IndianRupee } from "lucide-react";
import Navbar from "../components/navbar";
import PickupCard from "../components/PickupCard";
import {useState,useEffect} from 'react'
import axios from 'axios'
import API_URL from "../api";
function Recycler() {
    const [pickups, setPickups] = useState([]);
    const [pendingPickups, setPendingPickups] = useState(null);
    const [estimatedEarnings, setEstimatedEarnings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const handleAcceptPickup = async (pickupId) => {
        try {
            const token = localStorage.getItem("recyclerToken");
            const response = await axios.patch(`${API_URL}/${pickupId}/accept`,{},
                {headers: { Authorization: `Bearer ${token}`,}, }
            );
            setPickups((prev) =>
                prev.map((pickup) =>
                    pickup._id === pickupId
                        ? response.data.pickup
                        : pickup
                )
            );
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to accept pickup."
            );
        }
    };
    useEffect(() => {
        const fetchPickups = async () => {
            try {
                const token = localStorage.getItem("recyclerToken");
                const response = await axios.get( `${API_URL}/pickups`, {
                        headers: { Authorization: `Bearer ${token}`,},
                    }
                );
                const fetchedPickups = response.data.pickups || [];
                setPickups(fetchedPickups);
                setPendingPickups(fetchedPickups.filter((pickup) => pickup.status === "Pending").length)
                setEstimatedEarnings(fetchedPickups.reduce(
                    (total, pickup) =>
                        total + (Number(pickup.waste?.estimatedValue) || 0),
                    0
                ))
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch pickups.");
            } finally {
                setLoading(false);
            }
        };
        fetchPickups();
    }, []);
    if (loading || error) return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="flex justify-center items-center py-20">
                <p className="text-gray-500 animate-pulse"> {error ? error : "Loading Pickups..."}</p>
            </div>
        </div>
    );
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
                <PickupCard key={pickup._id} pickup={pickup} handleAcceptPickup={handleAcceptPickup}/>
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
                    {pickups.length}
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
                    ₹{estimatedEarnings}
                    </p>
                </div>
                </div>
            </div>
            {/* Pending pickups */}
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
                <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-full">
                    <Clock className="text-purple-600" size={20} />
                </div>
                <div>
                    <p className="text-xs text-gray-500">
                    Pending Pickups
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                    {pendingPickups}
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