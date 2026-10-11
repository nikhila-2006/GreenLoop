import {MapPin,Recycle} from "lucide-react";
import { useState } from "react";
import axios from "axios";
const RecyclerCard = ({recycler,waste,requestSent,onRequestSent}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const handlePickupRequest = async (recycler) => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");
            const user = JSON.parse(localStorage.getItem("user") || "null");
            const token = localStorage.getItem("token");
            if (!user || !token) {
                setError("Please log in to request a pickup.");
                return;
            }
            if (!user.address || !user.phone) {
                setError("Please update your address and phone number.");
                return;
            }
            if (!waste?._id || !recycler?._id) {
                setError("Waste or recycler information is missing.");
                return;
            }
            const response = await axios.post("http://localhost:8080/pickups",
                {wasteId: waste._id, recyclerId: recycler._id, customerName: user.name, phone: user.phone, address: user.address, imageUrl: waste.image?.url,},
                { headers: {Authorization: `Bearer ${token}`,  },}
            );
            setSuccess(response.data.message);
            onRequestSent();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create pickup request." );
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex items-center justify-between w-full p-4 bg-white border border-gray-100 rounded-xl shadow-sm mt-5">
        {/* Left side */}
            <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="flex items-center text-green-700 justify-center w-14 h-14 bg-green-100 rounded-full">
                    <Recycle size={24}/>
                </div>
                {/* Recycler details */}
                <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                        {recycler.businessName}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-2 mt-1">
                        <span>Business Address :</span>
                        <span className="flex items-center gap-1"><MapPin size={12}/> {recycler.address}</span>
                    </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-sm text-gray-500">Service Areas :</span>
                    {recycler.servicesAreas?.length > 0 ? ( recycler.servicesAreas.map((area, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded" >
                            {area}
                        </span>))) : (
                        <p className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">
                            {recycler.address}
                        </p>)}
                </div>
                {error && (<p className="mt-2 text-sm text-red-600" role="alert">{error}</p>)}
                {success && (<p className="mt-2 text-sm text-green-600" role="status">{success} </p>)}
            </div>
        </div>
        {/* Button */}
        <button disabled={loading || !!success} onClick={()=>handlePickupRequest(recycler)} className="px-5 py-2 text-sm cursor-pointer font-medium text-white bg-green-700 rounded-lg hover:bg-green-800">
            {loading? "Sending..." : requestSent ? "Request Sent" : "Request Pickup"}
        </button>
        </div>
    );
    };

export default RecyclerCard;