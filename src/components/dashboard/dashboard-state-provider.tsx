"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Builder, CountryStats } from "@/lib/types";

type ViewType = "overview" | "country";

interface DashboardState {
    currentView: ViewType;
    selectedCountry: CountryStats | null;
    selectedMember: Builder | null;

    // Actions
    setView: (view: ViewType) => void;
    selectCountry: (country: CountryStats | null) => void;
    selectMember: (member: Builder | null) => void;
    goBackToOverview: () => void;
}

const DashboardContext = createContext<DashboardState | undefined>(undefined);

export function DashboardStateProvider({
    children,
    initialCountry = null
}: {
    children: ReactNode;
    initialCountry?: CountryStats | null;
}) {
    const [currentView, setCurrentView] = useState<ViewType>(initialCountry ? "country" : "overview");
    const [selectedCountry, setSelectedCountry] = useState<CountryStats | null>(initialCountry);
    const [selectedMember, setSelectedMember] = useState<Builder | null>(null);

    const selectCountry = (country: CountryStats | null) => {
        setSelectedCountry(country);
        if (country) {
            setCurrentView("country");
        }
    };

    const selectMember = (member: Builder | null) => {
        setSelectedMember(member);
    };

    const goBackToOverview = () => {
        setCurrentView("overview");
        setSelectedCountry(null);
    };

    const setView = (view: ViewType) => {
        setCurrentView(view);
    };

    return (
        <DashboardContext.Provider
            value={{
                currentView,
                selectedCountry,
                selectedMember,
                setView,
                selectCountry,
                selectMember,
                goBackToOverview,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error("useDashboard must be used within a DashboardStateProvider");
    }
    return context;
}
