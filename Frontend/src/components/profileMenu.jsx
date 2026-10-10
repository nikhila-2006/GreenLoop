import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
export default function ProfileMenu({role}) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("recyclerToken");
        localStorage.removeItem("recycler");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setOpen(false);
        navigate("/");
    };
    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-green-100">
                <div className="flex-1 items-center justify-center gap-2 ">
                    <div className="flex gap-2">
                        <span className="text-xl text-green-700"><FaRegUserCircle/></span>
                        <p className="font-medium text-md">{user?.name}</p>
                        <MdArrowDropDown className="text-xl"/>
                    </div>
                </div>
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-44 rounded-lg  border bg-white py-2 shadow-lg z-50">
                    <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" >
                        {role}
                    </button>
                    <button onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50" >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}