"use client";

import { useEffect, useRef } from "react";
import { CountryStats } from "@/lib/types";

interface SVGWorldMapProps {
    countries: CountryStats[];
}

export function SVGWorldMap({ countries }: SVGWorldMapProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Load the SVG
        fetch('/images/map.svg')
            .then(res => res.text())
            .then(svgText => {
                container.innerHTML = svgText;

                const svg = container.querySelector('svg');
                if (svg) {
                    // Remove fixed width/height and add viewBox for proper scaling
                    const width = svg.getAttribute('width') || '1152';
                    const height = svg.getAttribute('height') || '640';
                    svg.removeAttribute('width');
                    svg.removeAttribute('height');
                    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
                    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');

                    // Make it fill entire container
                    svg.style.width = '100%';
                    svg.style.height = '100%';
                    svg.style.display = 'block';
                    svg.style.position = 'absolute';
                    svg.style.top = '0';
                    svg.style.left = '0';

                    // Add hover effects to Superteam countries (purple elements)
                    const elements = svg.querySelectorAll('path, circle');
                    elements.forEach((el) => {
                        const fill = el.getAttribute('fill');

                        // Superteam countries have purple fill (#5522DF)
                        if (fill === '#5522DF') {
                            (el as HTMLElement).style.cursor = 'pointer';
                            (el as HTMLElement).style.transition = 'fill 0.2s, stroke 0.2s';

                            el.addEventListener('mouseenter', () => {
                                el.setAttribute('fill', '#FFD700');
                                el.setAttribute('stroke', '#FFD700');
                            });

                            el.addEventListener('mouseleave', () => {
                                el.setAttribute('fill', '#5522DF');
                                el.setAttribute('stroke', '#5522DF');
                            });
                        }
                    });
                }
            })
            .catch(err => console.error('Error loading map:', err));
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden"
            style={{ background: "#0a0a0a" }}
        />
    );
}
