import { formatDateMMDD } from "@/utils/format";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchHistoryItem {
  query: string;
  timestamp: number;
  formattedDate: string;
}

export interface SearchState {
  history: SearchHistoryItem[];
}

const initialState: SearchState = {
  history: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearchHistory: (state, action: PayloadAction<string>) => {
      const MAX_HISTORY = 10;
      const newQuery = action.payload;
      const timestamp = Date.now();
      const formattedDate = formatDateMMDD(timestamp);

      state.history = [
        { query: newQuery, timestamp, formattedDate },
        ...state.history.filter((item) => item.query !== newQuery),
      ].slice(0, MAX_HISTORY);
    },
    removeSearchHistory: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter(
        (item) => item.query !== action.payload
      );
    },
    clearSearchHistory: (state) => {
      state.history = [];
    },
  },
});

export const { addSearchHistory, removeSearchHistory, clearSearchHistory } =
  searchSlice.actions;
export default searchSlice.reducer;
