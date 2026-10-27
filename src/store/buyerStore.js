/* =========================================================
   BUYER STORE  (Redux Toolkit)

   GLOBAL STATE ARCHITECTURE
   -------------------------
   Context API   -> small, rarely-changing data (buyer profile,
                    saved search preferences)
                    [context/BuyerContext.jsx]
   Redux Toolkit -> data that is fetched asynchronously or shared
                    by many components:
                      properties : list fetched from the (mock) API
                      favorites  : the buyer's saved-homes "cart"
                      visits     : visit requests sent to owners
   Local state   -> UI-only details that no other component needs
                    (is the filter drawer open, did an image fail...)

   Install once:  npm install @reduxjs/toolkit react-redux
========================================================= */

import {
  configureStore,
  createAsyncThunk,
  createSelector,
  createSlice
} from "@reduxjs/toolkit";

import { fetchPropertiesApi, requestVisitApi } from "./propertiesApi";


/* ---------- Async thunks ---------- */

// Each thunk automatically dispatches  pending -> fulfilled | rejected
export const fetchProperties = createAsyncThunk(
  "properties/fetch",

  async (_, { rejectWithValue }) => {
    try {
      return await fetchPropertiesApi();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },

  {
    // Do not start a second request while one is already running
    condition: (_, { getState }) =>
      getState().properties.status !== "loading"
  }
);

export const requestVisit = createAsyncThunk(
  "visits/request",

  async (request, { rejectWithValue }) => {
    try {
      return await requestVisitApi(request);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


/* ---------- Properties slice (async: loading + error handling) ---------- */

const propertiesSlice = createSlice({
  name: "properties",

  initialState: {
    items: [],
    status: "idle",   // idle | loading | succeeded | failed
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || action.error.message || "Something went wrong.";
      });
  }
});


/* ---------- Favorites slice (the saved-homes "cart") ---------- */

function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem("buyerFavorites"));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

const favoritesSlice = createSlice({
  name: "favorites",

  initialState: { ids: loadFavorites() },

  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;

      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((item) => item !== id);
      } else {
        state.ids.push(id);
      }
    },

    clearFavorites(state) {
      state.ids = [];
    }
  }
});


/* ---------- Visits slice (async form submission) ---------- */

const visitsSlice = createSlice({
  name: "visits",

  initialState: {
    requests: [],
    status: "idle",   // idle | loading | succeeded | failed
    error: null
  },

  reducers: {
    resetVisitStatus(state) {
      state.status = "idle";
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(requestVisit.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(requestVisit.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.requests.push(action.payload);
      })
      .addCase(requestVisit.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || action.error.message || "Something went wrong.";
      });
  }
});


/* ---------- Actions ---------- */

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export const { resetVisitStatus } = visitsSlice.actions;


/* ---------- Store ---------- */

export const store = configureStore({
  reducer: {
    properties: propertiesSlice.reducer,
    favorites: favoritesSlice.reducer,
    visits: visitsSlice.reducer
  }
});

// Keep the saved homes between visits
let lastSavedIds = store.getState().favorites.ids;

store.subscribe(() => {
  const ids = store.getState().favorites.ids;

  if (ids !== lastSavedIds) {
    lastSavedIds = ids;

    try {
      localStorage.setItem("buyerFavorites", JSON.stringify(ids));
    } catch {
      /* storage can be full or blocked - the app still works */
    }
  }
});


/* ---------- Selectors (derived data) ---------- */

export const selectFavoriteIds = (state) => state.favorites.ids;
export const selectProperties = (state) => state.properties.items;

export const selectSavedProperties = createSelector(
  [selectProperties, selectFavoriteIds],
  (items, ids) => items.filter((property) => ids.includes(property.id))
);

// Dashboard numbers for the saved-homes panel
export const selectSavedSummary = createSelector(
  [selectSavedProperties],
  (saved) => {
    const total = saved.reduce((sum, property) => sum + property.price, 0);

    return {
      count: saved.length,
      total,
      average: saved.length ? Math.round(total / saved.length) : 0
    };
  }
);