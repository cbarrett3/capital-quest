export type Region = 
    | 'East Asia & Pacific'
    | 'Europe & Central Asia'
    | 'Latin America & Caribbean '  
    | 'Middle East & North Africa'
    | 'North America'
    | 'South Asia'
    | 'Sub-Saharan Africa ';  

export const regionColors: Record<Region, {
    bg: string;
    hover: string;
    text: string;
    ring: string;
    gradient: string;
    border: string;
}> = {
    'East Asia & Pacific': {
        bg: 'bg-violet-500',
        hover: 'hover:bg-violet-600',
        text: 'text-white',
        ring: 'ring-violet-400',
        gradient: 'from-violet-500 to-purple-600',
        border: 'border-violet-200'
    },
    'Europe & Central Asia': {
        bg: 'bg-blue-500',
        hover: 'hover:bg-blue-600',
        text: 'text-white',
        ring: 'ring-blue-400',
        gradient: 'from-blue-500 to-indigo-600',
        border: 'border-blue-200'
    },
    'Latin America & Caribbean ': {
        bg: 'bg-rose-500',
        hover: 'hover:bg-rose-600',
        text: 'text-white',
        ring: 'ring-rose-400',
        gradient: 'from-rose-500 to-pink-600',
        border: 'border-rose-200'
    },
    'Middle East & North Africa': {
        bg: 'bg-amber-500',
        hover: 'hover:bg-amber-600',
        text: 'text-white',
        ring: 'ring-amber-400',
        gradient: 'from-amber-500 to-yellow-600',
        border: 'border-amber-200'
    },
    'North America': {
        bg: 'bg-indigo-500',
        hover: 'hover:bg-indigo-600',
        text: 'text-white',
        ring: 'ring-indigo-400',
        gradient: 'from-indigo-500 to-blue-600',
        border: 'border-indigo-200'
    },
    'South Asia': {
        bg: 'bg-orange-500',
        hover: 'hover:bg-orange-600',
        text: 'text-white',
        ring: 'ring-orange-400',
        gradient: 'from-orange-500 to-red-600',
        border: 'border-orange-200'
    },
    'Sub-Saharan Africa ': {
        bg: 'bg-emerald-500',
        hover: 'hover:bg-emerald-600',
        text: 'text-white',
        ring: 'ring-emerald-400',
        gradient: 'from-emerald-500 to-teal-600',
        border: 'border-emerald-200'
    }
};

// find region key with exact or trimmed match
const findRegionKey = (region: string): Region | undefined => {
    const exactMatch = region as Region;
    if (exactMatch in regionColors) return exactMatch;
    
    const trimmedRegion = region.trim();
    return Object.keys(regionColors).find(key => 
        key.trim() === trimmedRegion
    ) as Region | undefined;
};

export const getRegionColor = (region: string) => {
    const key = findRegionKey(region);
    return key ? regionColors[key].bg : 'bg-gray-500';
};

export const getRegionHoverBorder = (region: string) => {
    const key = findRegionKey(region);
    return key ? `hover:border-${regionColors[key].ring.split('-')[1]}` : 'hover:border-gray-300';
};
