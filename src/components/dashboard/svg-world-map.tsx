"use client";

import { useEffect, useRef, useCallback } from "react";
import { useDashboard } from "./dashboard-state-provider";
import { CountryStats } from "@/lib/types";

interface SVGWorldMapProps {
    countries: CountryStats[];
    onHoverCountry?: (country: string | null) => void;
}

// Map path index to country name based on SVG coordinates analysis
// SVG viewBox is 1152x640, coordinates mapped to world geography
const PATH_INDEX_TO_COUNTRY: Record<number, string> = {
    0: "Ukraine",      // x=637, y=206 (Eastern Europe)
    1: "UAE",          // x=738, y=272 - FIXED
    2: "Ukraine",      // x=642, y=197 (second path for Ukraine)
    3: "Turkey",       // x=631, y=195 (Anatolia region)
    4: "Brazil",       // x=397, y=477 (South America)
    5: "Canada",       // x=392, y=188 (North America upper)
    6: "Poland",       // x=603, y=158 (Central Europe)
    7: "Germany",      // x=549, y=206 (Western Europe)
    8: "UK",           // x=560, y=160 - FIXED
    9: "Vietnam",      // x=699, y=207 - FIXED
    10: "Philippines", // x=648, y=229 - FIXED
    11: "Turkey",      // x=631, y=191 (second Turkey path)
    12: "Indonesia",   // x=965, y=402 (Southeast Asia islands)
    13: "India",        // x=813, y=230 (South Asia) - FIXED
    14: "Ireland",     // x=559, y=162 - FIXED
    15: "Japan",       // x=988, y=235 (East Asia)
    16: "Kazakhstan",  // x=786, y=204 - FIXED
    17: "South Korea", // x=962, y=218 (Korean Peninsula)
    18: "Ukraine",     // x=637, y=206 (third path)
    19: "Georgia",     // x=634, y=203 (Caucasus)
    20: "Malaysia",    // x=903, y=340 - FIXED
    21: "Nigeria",     // x=604, y=345 (West Africa)
    22: "Balkan",      // x=593, y=163 (Balkans)
    23: "Netherlands", // x=618, y=172 (Western Europe)
    24: "France",      // x=641, y=184 (Western Europe)
    25: "Spain",       // x=637, y=193 (Iberian Peninsula)
    26: "Israel",      // x=616, y=189 (Middle East)
    27: "Mexico",      // x=665, y=168 (North America - might be wrong)
};

export function SVGWorldMap({ countries, onHoverCountry }: SVGWorldMapProps) {
    const { selectCountry } = useDashboard();
    const containerRef = useRef<HTMLDivElement>(null);
    const countriesRef = useRef(countries);
    const selectCountryRef = useRef(selectCountry);
    const onHoverCountryRef = useRef(onHoverCountry);

    useEffect(() => {
        countriesRef.current = countries;
        selectCountryRef.current = selectCountry;
        onHoverCountryRef.current = onHoverCountry;
    }, [countries, selectCountry, onHoverCountry]);

    const handleCountryClick = useCallback((countryName: string) => {
        const country = countriesRef.current.find(c =>
            c.country.toLowerCase() === countryName.toLowerCase() ||
            c.country.toLowerCase().includes(countryName.toLowerCase()) ||
            countryName.toLowerCase().includes(c.country.toLowerCase())
        );
        if (country) {
            selectCountryRef.current(country);
        }
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        fetch('/images/map.svg')
            .then(res => res.text())
            .then(svgText => {
                container.innerHTML = svgText;

                const svg = container.querySelector('svg');
                if (svg) {
                    const width = svg.getAttribute('width') || '1152';
                    const height = svg.getAttribute('height') || '640';
                    svg.removeAttribute('width');
                    svg.removeAttribute('height');
                    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
                    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
                    svg.style.width = '100%';
                    svg.style.height = '100%';
                    svg.style.display = 'block';
                    svg.style.position = 'absolute';
                    svg.style.top = '0';
                    svg.style.left = '0';

                    let purpleIndex = 0;
                    const elements = svg.querySelectorAll('path, circle');

                    elements.forEach((el) => {
                        const fill = el.getAttribute('fill');
                        const iso3 = el.getAttribute('data-iso3');

                        if (fill === '#5522DF') {
                            const currentIndex = purpleIndex;
                            const countryName = iso3 === 'SGP' ? 'Singapore' : PATH_INDEX_TO_COUNTRY[currentIndex] || '';
                            purpleIndex++;

                            (el as HTMLElement).style.cursor = 'pointer';
                            (el as HTMLElement).style.transition = 'fill 0.2s, stroke 0.2s';

                            el.addEventListener('mouseenter', () => {
                                el.setAttribute('fill', '#FFD700');
                                el.setAttribute('stroke', '#FFD700');
                                if (onHoverCountryRef.current && countryName) {
                                    onHoverCountryRef.current(countryName);
                                }
                            });

                            el.addEventListener('mouseleave', () => {
                                el.setAttribute('fill', '#5522DF');
                                el.setAttribute('stroke', '#5522DF');
                                if (onHoverCountryRef.current) {
                                    onHoverCountryRef.current(null);
                                }
                            });

                            el.addEventListener('click', () => {
                                if (countryName) {
                                    handleCountryClick(countryName);
                                }
                            });
                        }
                    });
                }
            })
            .catch(err => console.error('Error loading map:', err));
    }, [handleCountryClick]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden"
            style={{ background: "#0a0a0a" }}
        />
    );
}
