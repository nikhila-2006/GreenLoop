import { useState } from "react";
import axios from 'axios';
import {ArrowRight,Camera,ImagePlus,Upload,X} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import SupportedCard from "../components/SupportedCard";
import { MdErrorOutline } from "react-icons/md";
function WasteUpload() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [weight, setWeight] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };
    const removeImage = () => {
        setImage(null);
        setPreview(null);
    };
    const handleAnalyze = async(file) => {
        if (!file) return;
        setLoading(true); 
        const formData = new FormData(); 
        formData.append('image',file);
        formData.append("weight", weight);
        try{
            const response=await axios.post("http://localhost:8080/api/waste/analyze",formData)
            console.log(response.data);
            const waste=response.data.waste;
            const imageUrl = waste.image.url;
            const secResponse=await axios.post("http://localhost:8080/api/waste-analysis/analyze",{wasteId:waste._id,weight})
            console.log(secResponse.data);
            setLoading(false);
            navigate('/result',{
                state:{
                    ...secResponse.data.waste,
                    image:{
                        ...secResponse.data.waste.image,
                        url:imageUrl
                    },
                }
            }); 
        }catch(err){
            console.error("GreenLoop analysis failed:", err);
            const code = err.response?.data?.code;
            if (code === "AI_QUOTA_EXCEEDED") {
                setError( "AI analysis is temporarily unavailable because the usage limit has been reached. Please try again later.");
            } else {
                setError(  err.response?.data?.message || "Something went wrong. Please try again." );
            }
        }finally{
            setLoading(false); 
        }
    };
    return (
        <div className="min-h-screen bg-slate-50">
        {/* Navbar */}
        <Navbar/>
        {/* Main */}
        <main className="max-w-3xl mx-auto p-3">  
            {/* Heading */}
            <div className="bg-white rounded-2xl shadow-sm  mt-5 p-6 md:p-8">
                <div className="text-center p-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
                        Identify Your Waste
                    </h1>
                    <p className="text-slate-600 m-3">
                        Upload a clear photo of your waste item(s). Our AI will identify the category estimate the value and show you
                        the best recycler nearby.
                    </p>
                </div>
            {/* Upload Card */}
            {!preview ? (
                <label htmlFor="waste-image" className="border-2 border border-gray-200 rounded-2xl min-h-[320px] flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-50/30 transition">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <ImagePlus size={30} className="text-green-600"/>
                    </div>
                    <h2 className="text-lg font-semibold mt-5 text-slate-800">
                        Upload a photo of your waste
                    </h2>
                    <p className="text-sm text-slate-500 mt-2">
                        Drag & drop or click to browse
                    </p>
                    <div  className="flex items-center gap-2 mt-6 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium">
                        <Upload size={17} />
                        {loading? "Uploading..." : "Choose Image"}
                    </div>
                    <p className="text-xs text-slate-400 mt-4">
                        JPG, PNG or WEBP • Max 5MB
                    </p>
                    <input
                        id="waste-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"/>
                </label>
            ) : (
                /* Image Preview */
                <div>
                    <div className="relative rounded-2xl overflow-hidden bg-slate-100">
                        <img
                            src={preview}
                            alt="Waste preview"
                            className="w-full max-h-[420px] object-contain"/>
                        <button
                            onClick={removeImage}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-600 hover:text-red-500">
                            <X size={20} /> 
                        </button>
                    </div>
                    <div className="flex items-center gap-3 mt-4 p-4 bg-green-50 rounded-xl">
                        <Camera className="text-green-600" size={20} />
                        <div>
                            <p className="font-medium text-slate-800">
                                {image?.name}
                            </p>
                            <p className="text-xs text-slate-500">
                                Ready for analysis
                            </p>
                        </div>
                    </div>
                    {/* weight input */}         
                    <div className="mt-5">
                        <label htmlFor="weight" className="mb-2 block text-sm font-semibold text-gray-700" >
                            Waste Weight (kg)
                        </label>
                        <input
                            id="weight" type="number" min="0.01"  step="any" value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Enter weight in kg"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"/>
                        <p className="mt-1 text-xs text-gray-500">
                            Enter the approximate weight of your waste in kilograms.
                        </p>
                    </div>
                </div>
                )}
                {/* Analyze Button */}
                <button
                    onClick={()=>handleAnalyze(image)}
                    disabled={!image}
                    className={`w-full mt-6 py-3.5 cursor-pointer rounded-xl flex items-center justify-center gap-2 font-semibold transition ${
                    image
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}>
                    {loading ? "Analyzing..." : "Analyze My Waste"}
                    {!loading && <ArrowRight size={18} />}
                </button>
                {error && (
                    <div role="alert" aria-live="polite" className="mt-4 flex-col items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm" >
                        <div className="flex items-center gap-2">
                            <MdErrorOutline className="text-3xl"/>
                            <p className="font-semibold">
                                {error}
                            </p>
                        </div>
                    </div>)}
            </div>
            {/* Supported Waste */}
            <div className="mt-8">
                <p className=" text-sm font-medium text-slate-600 mb-4">
                    Supported:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <SupportedCard image="&#129524;" name="Plastic"/>
                    <SupportedCard image="&#128230;" name="Paper"/>
                    <SupportedCard image="&#129380;" name="Metal"/>
                    <SupportedCard image="&#128187;" name="E-waste"/>
                </div>
            </div>
        </main>
        </div>
    );
}

export default WasteUpload;