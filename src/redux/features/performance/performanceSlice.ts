
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FilterState, PerformanceData, PerformanceState } from "../../../types/sliceTypes";



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
