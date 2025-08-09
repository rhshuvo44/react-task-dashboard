// src/store/performanceSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PerformanceData {
  date: string;
  views: number;
}

interface PerformanceState {
  viewType: "daily" | "monthly";
  data: PerformanceData[];
}

const initialState: PerformanceState = {
  viewType: "daily",
  data: [
    { date: "2025-08-01", views: 120 },
    { date: "2025-08-02", views: 150 },
    { date: "2025-08-03", views: 90 },
    { date: "2025-08-04", views: 200 },
    { date: "2025-08-05", views: 170 }
  ]
};

const performanceSlice = createSlice({
  name: "performance",
  initialState,
  reducers: {
    setViewType: (state, action: PayloadAction<"daily" | "monthly">) => {
      state.viewType = action.payload;
    },
    setData: (state, action: PayloadAction<PerformanceData[]>) => {
      state.data = action.payload;
    }
  }
});

export const { setViewType, setData } = performanceSlice.actions;
export default performanceSlice.reducer;
