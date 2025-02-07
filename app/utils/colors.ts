export const getRegionColor = (region?: string) => {
  switch (region) {
    case 'Sub-Saharan Africa ':  
      return 'text-emerald-600';
    case 'Middle East & North Africa':
      return 'text-amber-600';
    case 'Europe & Central Asia':
      return 'text-blue-600';
    case 'Latin America & Caribbean ':  
      return 'text-rose-600';
    case 'East Asia & Pacific':
      return 'text-violet-600';
    case 'North America':
      return 'text-indigo-600';
    case 'South Asia':
      return 'text-orange-600';
    default:
      return 'text-gray-600';
  }
};

export const getRegionBgColor = (region?: string) => {
  switch (region) {
    case 'Sub-Saharan Africa ':  
      return 'bg-emerald-100 text-emerald-700';
    case 'Middle East & North Africa':
      return 'bg-amber-100 text-amber-700';
    case 'Europe & Central Asia':
      return 'bg-blue-100 text-blue-700';
    case 'Latin America & Caribbean ':  
      return 'bg-rose-100 text-rose-700';
    case 'East Asia & Pacific':
      return 'bg-violet-100 text-violet-700';
    case 'North America':
      return 'bg-indigo-100 text-indigo-700';
    case 'South Asia':
      return 'bg-orange-100 text-orange-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};
