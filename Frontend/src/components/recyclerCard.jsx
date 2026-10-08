import {MapPin,Recycle} from "lucide-react";
const RecyclerCard = () => {
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
                        Ravi Recycling
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center"><MapPin size={16}/> 1.2 km</span>
                    </div>
                {/* Tags */}
            <   div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">
                    E-waste
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">
                    Plastic
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded">
                    Metal
                    </span>
                </div>
            </div>
        </div>
        {/* Button */}
        <button className="px-5 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800">
            Request Pickup
        </button>
        </div>
    );
    };

export default RecyclerCard;