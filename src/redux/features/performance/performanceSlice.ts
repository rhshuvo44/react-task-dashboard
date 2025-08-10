
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  authorFilter: string;
  searchTitle: string;
  dateRange: [string | null, string | null] | null;
}

interface PerformanceData {
  date: string;
  views: number;
}

interface PerformanceState {
  viewType: "daily" | "monthly";
  data: PerformanceData[];
  filters: FilterState;
}

const initialState: PerformanceState = {
  viewType: "daily",
  data: [],
  filters: {
    authorFilter: "",
    searchTitle: "",
    dateRange: null,
  },
};

const performanceSlice = createSlice({
  name: "performance",
  initialState,
  reducers: {
    setViewType(state, action: PayloadAction<"daily" | "monthly">) {
      state.viewType = action.payload;
    },
    setData(state, action: PayloadAction<PerformanceData[]>) {
      state.data = action.payload;
    },
    updateFilter(state, action: PayloadAction<Partial<FilterState>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { setViewType, setData, updateFilter } = performanceSlice.actions;
export default performanceSlice.reducer;
