export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white shadow-sm border-b-[3px] border-gradient-to-r from-emerald-500 via-violet-500 to-rose-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <h1 className="text-xl sm:text-2xl font-black italic tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Capital Quest
                        </h1>
                        <p className="text-xs text-gray-500 mt-0.5 italic">
                            &quot;Explore the world, one capital at a time&quot;
                        </p>
                    </div>

                    <a href="https://github.com/cbarrett3/capital-quest" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium
                                bg-gradient-to-r from-blue-600 to-purple-600 text-white
                                hover:from-blue-700 hover:to-purple-700
                                transition-all duration-200 ease-in-out
                                shadow-lg hover:shadow-xl">
                        View on GitHub
                    </a>
                </div>
            </div>
            <div className="h-[3px] bg-gradient-to-r from-emerald-500 via-violet-500 to-rose-500"></div>
        </nav>
    );
};
