"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Globe, Trophy, MapPin } from "lucide-react";
import { DashboardStats } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface StatsCardsProps {
    stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
    const statsData = [
        {
            title: "Total Builders",
            value: formatNumber(stats.totalBuilders),
            icon: Users,
            description: "Active community members",
            color: "text-purple-500",
        },
        {
            title: "Countries",
            value: formatNumber(stats.totalCountries),
            icon: Globe,
            description: "Global reach",
            color: "text-blue-500",
        },
        {
            title: "Top Country",
            value: stats.topCountry?.country || "—",
            icon: Trophy,
            description: `${stats.topCountry ? formatNumber(stats.topCountry.builderCount) : 0} builders`,
            color: "text-yellow-500",
        },
        {
            title: "Top Region",
            value: "Asia",
            icon: MapPin,
            description: "Highest builder concentration",
            color: "text-green-500",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsData.map((stat) => (
                <Card key={stat.title} className="hover-lift transition-all">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <p className="text-sm text-[var(--muted-foreground)]">{stat.title}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-xs text-[var(--muted-foreground)]">{stat.description}</p>
                            </div>
                            <div className={`p-3 rounded-xl bg-[var(--muted)] ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
