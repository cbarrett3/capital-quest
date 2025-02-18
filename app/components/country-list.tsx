'use client'
import React from "react";
import { AnimatePresence } from "framer-motion";
import { useCountries } from "@/app/hooks/use-countries";
import { useCountryDetails } from "@/app/hooks/use-country-details";
import { useCountryNavigation } from "@/app/hooks/use-country-navigation";
import { useModalNavigation } from "@/app/hooks/use-modal-navigation";
import { CountryGrid } from "@/app/components/country-grid";
import { RegionFilter } from "@/app/components/region-filter";
import CountryModal from "@/app/components/country-modal";
import Footer from "@/app/components/footer";

const CountryList = () => {
    // countries and filters
    const {
        countries,
        filteredCountries,
        error,
        regions,
        selectedRegions,
        toggleRegion
    } = useCountries();

    // country selection and details
    const {
        selectedCountry,
        error: detailsError,
        fetchCountryDetails: handleSelect,
        clearSelectedCountry: handleClose
    } = useCountryDetails();

    // navigation between countries
    const {
        hasNext,
        hasPrevious,
        handleNext,
        handlePrevious
    } = useCountryNavigation(filteredCountries, selectedCountry, handleSelect);

    // keyboard nav and modal effects
    useModalNavigation({
        onClose: handleClose,
        onNext: handleNext,
        onPrevious: handlePrevious,
        hasNext,
        hasPrevious
    });

    // show error if countries failed to load
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white flex flex-col">
            <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto px-4 py-4">
                    <div className="relative">
                        <div className="sticky top-16 z-20">
                            <h2 className="sr-only">Countries</h2>
                            <div className="bg-gradient-to-r from-emerald-500/20 via-violet-500/20 to-rose-500/20 rounded-xl p-[1px]">
                                <div className="bg-white/20 backdrop-blur-sm rounded-[10px] p-2">
                                    <RegionFilter
                                        regions={regions}
                                        selectedRegions={selectedRegions}
                                        onToggleRegion={toggleRegion}
                                        totalCountries={countries.length}
                                        filteredCount={filteredCountries.length}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-16">
                            <CountryGrid
                                countries={filteredCountries}
                                onSelect={handleSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {/* error modal outside animate presence for instant removal */}
            {detailsError && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-4 max-w-md w-full mx-4">
                        <p className="text-red-500 text-center mb-4">{detailsError}</p>
                        <button
                            onClick={handleClose}
                            className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <AnimatePresence mode="wait">
                {selectedCountry && !detailsError && (
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center">
                        <CountryModal
                            country={selectedCountry}
                            onClose={handleClose}
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                            hasNext={hasNext}
                            hasPrevious={hasPrevious}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CountryList;
