import { Region, regionColors } from '@/app/utils/region-colors';

interface RegionFilterProps {
    regions: Region[];
    selectedRegions: ReadonlySet<Region>;
    onToggleRegion: (region: Region) => void;
    totalCountries: number;
    filteredCount: number;
}

export const RegionFilter = ({
    regions,
    selectedRegions,
    onToggleRegion,
    totalCountries,
    filteredCount
}: RegionFilterProps) => {
    return (
        <div className="sticky top-0 z-20">
            <div className="relative">
                {/* blurred glass effect background */}
                <div className="absolute inset-0 bg-white/70 backdrop-blur-xl shadow-lg" />
                
                {/* filter content */}
                <div className="relative px-3 py-2 space-y-2">
                    {/* buttons for filtering by region */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-1.5">
                        {regions.map(region => (
                            <button
                                key={region}
                                onClick={() => onToggleRegion(region)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-lg border
                                    transition-all duration-300 ${
                                    selectedRegions.has(region)
                                        ? `${regionColors[region]?.bg} text-white`
                                        : `bg-white/50 text-gray-600 ${regionColors[region]?.border || 'border-gray-200'} hover:${regionColors[region]?.hover || 'hover:bg-gray-100'}`
                                }`}
                                aria-pressed={selectedRegions.has(region)}
                                aria-label={`${region} region toggle button`}
                            >
                                {region}
                            </button>
                        ))}
                    </div>
                    
                    {/* show how many countries we're displaying */}
                    <p className="text-xs text-gray-500 italic">
                        Showing {filteredCount} of {totalCountries} countries
                    </p>
                </div>
            </div>
        </div>
    );
};
