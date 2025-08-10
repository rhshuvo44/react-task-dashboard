export interface FilterState {
    authorFilter: string;
    searchTitle: string;
    dateRange: [string | null, string | null] | null;
}

export interface PerformanceData {
    date: string;
    views: number;
}

export interface PerformanceState {
    viewType: "daily" | "monthly";
    data: PerformanceData[];
    filters: FilterState;
}