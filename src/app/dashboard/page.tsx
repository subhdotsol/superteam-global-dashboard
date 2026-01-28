import { MainDashboard } from "@/components/dashboard/main-dashboard";
import { loadDashboardData } from "@/lib/data";
import { Suspense } from "react";

function DashboardContent({ region }: { region?: string }) {
    const stats = loadDashboardData();

    // If region is specified, filter countries to just that region
    if (region) {
        const filteredCountries = stats.countries.filter(
            (c) => c.country.toLowerCase() === region.toLowerCase()
        );

        if (filteredCountries.length > 0) {
            const filteredStats = {
                ...stats,
                countries: filteredCountries,
                totalBuilders: filteredCountries.reduce((sum, c) => sum + c.builderCount, 0),
                totalCountries: filteredCountries.length,
                topCountry: filteredCountries[0],
            };
            return <MainDashboard stats={filteredStats} regionFilter={region} />;
        }
    }

    return <MainDashboard stats={stats} />;
}

export default async function DashboardPage({
    searchParams,
}: {
    searchParams: Promise<{ region?: string }>;
}) {
    const params = await searchParams;

    return (
        <Suspense fallback={<DashboardLoading />}>
            <DashboardContent region={params.region} />
        </Suspense>
    );
}

function DashboardLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-[var(--muted-foreground)]">Loading dashboard...</p>
            </div>
        </div>
    );
}
