function Navbar(){
    return (
        <div>
            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-5 border-b">
                <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                    <span className="text-white text-xl"><img src="./logo.png" alt="logo" /></span>
                </div>
                <span className="text-2xl font-bold text-green-1000">
                    Green<span className="text-2xl font-bold text-green-600">Loop</span>
                </span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <a href="#" className="hover:text-green-600">
                        Home
                    </a>
                    <a href="#how-it-works" className="hover:text-green-600">
                        How It Works
                    </a>
                    <a href="#" className="hover:text-green-600">
                        For Recyclers
                    </a>
                    <a href="#" className="hover:text-green-600">
                        About
                    </a>
                    <button className="px-5 py-2.5 bg-green-800 text-white rounded-lg hover:bg-green-700">
                        Login / Sign Up
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar