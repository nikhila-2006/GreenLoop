import { Camera, ScanSearch, Truck, Recycle } from "lucide-react";
import Navbar from "../components/navbar";
const steps = [
    {
        icon: Camera,
        title: "Upload Your Waste",
        description:
            "Upload a picture of your waste and enter its weight.",
    },
    {
        icon: ScanSearch,
        title: "Analyze and Estimate",
        description:
            "Use AI to identify the waste category and estimate its value.",
    },
    {
        icon: Truck,
        title: "Connect with a Recycler",
        description:
            "Choose a recycler and submit a pickup request.",
    },
    {
        icon: Recycle,
        title: "Recycle Responsibly",
        description:
            "Track your request and give recyclable materials a new life.",
    },
];

export default function HowItWorks() {
    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-green-50 px-6 py-16">
            <div className="mx-auto max-w-5xl">
                <div className="mb-12 text-center">
                    <p className="font-semibold text-green-700">
                        SIMPLE. SMART. SUSTAINABLE.
                    </p>

                    <h1 className="mt-3 text-4xl font-bold text-green-950">
                        How GreenLoop Works
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        Turn your waste into a resource through a simple,
                        convenient recycling process.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.title}
                                className="rounded-2xl bg-white p-7 shadow-sm
                                           transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="rounded-xl bg-green-100 p-4">
                                        <Icon
                                            className="text-green-700"
                                            size={28}
                                        />
                                    </div>

                                    <span className="text-sm font-bold text-green-700">
                                        STEP 0{index + 1}
                                    </span>
                                </div>

                                <h2 className="mt-5 text-xl font-semibold text-gray-900">
                                    {step.title}
                                </h2>

                                <p className="mt-2 leading-7 text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
        </>
    );
}