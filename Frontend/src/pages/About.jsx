import { Recycle, Leaf, Users, Earth } from "lucide-react";
import Navbar from "../components/navbar";
const features = [
    {
        icon: Recycle,
        title: "Smarter Recycling",
        description:
            "Identify waste categories and understand their potential recycling value.",
    },
    {
        icon: Users,
        title: "Connecting People",
        description:
            "Bring waste generators and recyclers together through one platform.",
    },
    {
        icon: Leaf,
        title: "Sustainable Choices",
        description:
            "Encourage responsible disposal and reuse of recyclable materials.",
    },
];

export default function About() {
    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-white">
            <section className="bg-green-950 px-6 py-20 text-center text-white">
                <div className="mx-auto max-w-3xl">
                    <p className="font-semibold tracking-widest text-green-300">
                        ABOUT US
                    </p>

                    <h1 className="mt-4 text-4xl font-bold md:text-5xl">
                        A Better Future Starts With What We Recycle
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-green-100">
                        GreenLoop connects people, waste, and recyclers
                        to make responsible waste management simpler.
                    </p>
                </div>
            </section>

            <section className="mx-auto grid max-w-5xl gap-12 px-6 py-16 md:grid-cols-2">
                <div className="rounded-2xl bg-green-50 p-8">
                    <h2 className="text-3xl font-bold text-green-950">
                        Our Story
                    </h2>

                    <p className="mt-5 leading-8 text-gray-600">
                        Waste doesn't have to be the end of a product's
                        journey. Many discarded materials can be reused
                        or recycled when they reach the right destination.
                        GreenLoop aims to make that connection easier.
                    </p>
                </div>

                <div className="rounded-2xl bg-green-50 p-8">
                    <Earth className="text-green-700" size={36} />

                    <h2 className="mt-4 text-2xl font-bold text-green-950">
                        Our Mission
                    </h2>

                    <p className="mt-3 leading-7 text-gray-600">
                        Build a more connected recycling ecosystem by
                        helping people understand their waste and find
                        suitable recyclers.
                    </p>
                </div>
            </section>

            <section className="bg-green-50 px-6 py-16">
                <div className="mx-auto max-w-5xl">
                    <h2 className="text-center text-3xl font-bold text-green-950">
                        What GreenLoop Offers
                    </h2>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="rounded-2xl bg-white p-7 shadow-sm"
                                >
                                    <Icon
                                        size={32}
                                        className="text-green-700"
                                    />

                                    <h3 className="mt-5 text-xl font-semibold">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 leading-7 text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    </>
    );
}