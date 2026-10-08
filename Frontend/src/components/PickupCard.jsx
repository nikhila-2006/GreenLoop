import {  MapPin, Clock } from "lucide-react";
function PickupCard({pickup}){
    return(
        <div key={pickup.id} className="bg-white border rounded-xl p-4 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    {/* Image */}
                    <div className="w-full md:w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <img src={pickup.image}
                            alt={pickup.item}
                            className="w-full h-full object-cover"/>
                    </div>
                    {/* Waste Information */}
                <div className="flex-1">
                        <h2 className="font-bold text-gray-900">
                            {pickup.category}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {pickup.item}
                        </p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                        <MapPin size={14} />
                            {pickup.distance}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        <Clock size={14} />
                            {pickup.time}
                    </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Requested by:{" "}
                    <span className="font-medium text-gray-700">
                        {pickup.requestedBy}
                    </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    Estimated Value:{" "}
                    <span className="font-semibold text-green-600">
                        {pickup.value}
                    </span>
                </p>
            </div>
            {/* Actions */}
            <div className="flex flex-col items-stretch md:items-end gap-3">
                    <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-center">
                        {pickup.pickupTime}
                    </span>
                <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold">
                    Accept Pickup
                </button>
                <button  className="text-green-700 text-sm font-medium hover:underline" >
                    View Details →
                </button>
            </div>
        </div>
    </div>        
    )
}
export default PickupCard