/* eslint-disable react-refresh/only-export-components */

/* =========================================================
   BUYER CONTEXT  (Context API + useReducer)

   Global state that many pages need but that changes rarely:
     buyer       -> name / email / phone (from sign up)
     preferences -> the buyer's saved search (city, budget...)

   Anything fetched from a server lives in the Redux store
   (store/buyerStore.js). Anything only one component cares
   about stays in that component's own useState.
========================================================= */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer
} from "react";

import {
  AMENITY_OPTIONS,
  BHK_OPTIONS,
  FURNISHING_OPTIONS,
  PROPERTY_TYPES
} from "../store/propertiesApi";


/* ---------- Shape of the saved search ---------- */

export const initialPreferences = {
  search: "",
  location: "",
  type: "",
  bhk: "",
  furnishing: "",
  amenities: [],
  minBudget: "",
  maxBudget: ""
};

const emptyBuyer = { name: "", email: "", phone: "" };


/* ---------- localStorage helpers ---------- */

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage can be full or blocked - the app still works */
  }
}

// Accepts older saved shapes too (e.g. "propertyType" instead of "type")
function normalizePreferences(saved = {}) {
  return {
    search: saved.search || "",
    location: saved.location || "",
    type: saved.type || saved.propertyType || "",
    bhk: saved.bhk || "",
    furnishing: saved.furnishing || "",
    amenities: Array.isArray(saved.amenities) ? saved.amenities : [],
    minBudget: saved.minBudget || "",
    maxBudget: saved.maxBudget || ""
  };
}


/* ---------- Preferences <-> URL query string ---------- */

const FILTER_KEYS = [
  "q", "city", "type", "bhk", "furnishing", "amenities", "min", "max"
];

const onlyIfAllowed = (list, value) => (list.includes(value) ? value : "");

// preferences (+ sort / saved view) -> URLSearchParams
export function preferencesToParams(preferences, view = {}) {
  const params = new URLSearchParams();

  if (preferences.search) params.set("q", preferences.search);
  if (preferences.location) params.set("city", preferences.location);
  if (preferences.type) params.set("type", preferences.type);
  if (preferences.bhk) params.set("bhk", preferences.bhk);
  if (preferences.furnishing) params.set("furnishing", preferences.furnishing);

  if (preferences.amenities.length > 0) {
    params.set("amenities", preferences.amenities.join(","));
  }

  if (preferences.minBudget !== "") params.set("min", preferences.minBudget);
  if (preferences.maxBudget !== "") params.set("max", preferences.maxBudget);

  if (view.sort && view.sort !== "recommended") params.set("sort", view.sort);
  if (view.saved) params.set("saved", "1");

  return params;
}

// URLSearchParams -> preferences, or null when the URL has no filters
export function paramsToPreferences(params) {
  if (!FILTER_KEYS.some((key) => params.has(key))) return null;

  return {
    search: params.get("q") || "",
    location: params.get("city") || "",
    type: onlyIfAllowed(PROPERTY_TYPES, params.get("type")),
    bhk: onlyIfAllowed(BHK_OPTIONS, params.get("bhk")),
    furnishing: onlyIfAllowed(FURNISHING_OPTIONS, params.get("furnishing")),
    amenities: (params.get("amenities") || "")
      .split(",")
      .filter((amenity) => AMENITY_OPTIONS.includes(amenity)),
    minBudget: params.get("min") || "",
    maxBudget: params.get("max") || ""
  };
}


/* ---------- Reducer ---------- */

function init() {
  const savedBuyer = readStorage("buyerData", null);
  const savedPreferences = readStorage("buyerPreferences", {});

  return {
    buyer: {
      name: savedBuyer?.name || "",
      email: savedBuyer?.email || "",
      phone: savedBuyer?.phone || ""
    },
    preferences: normalizePreferences(savedPreferences)
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "buyer/saved":
      return { ...state, buyer: action.payload };

    case "preferences/saved":
      return { ...state, preferences: action.payload };

    default:
      return state;
  }
}


/* ---------- Provider + hook ---------- */

const BuyerContext = createContext(null);

export function BuyerProvider({ children }) {

  const [state, dispatch] = useReducer(reducer, undefined, init);

  // "buyerData" is the same key Sign Up has always used
  const saveBuyer = useCallback((buyer) => {
    const next = { ...emptyBuyer, ...buyer };
    dispatch({ type: "buyer/saved", payload: next });
    writeStorage("buyerData", next);
  }, []);

  const updatePreferences = useCallback((preferences) => {
    const next = normalizePreferences(preferences);
    dispatch({ type: "preferences/saved", payload: next });
    writeStorage("buyerPreferences", next);
  }, []);

  const resetPreferences = useCallback(() => {
    dispatch({ type: "preferences/saved", payload: initialPreferences });
    writeStorage("buyerPreferences", initialPreferences);
  }, []);

  const value = useMemo(
    () => ({
      buyer: state.buyer,
      preferences: state.preferences,
      firstName: state.buyer.name.trim().split(" ")[0] || "",
      saveBuyer,
      updatePreferences,
      resetPreferences
    }),
    [state, saveBuyer, updatePreferences, resetPreferences]
  );

  return (
    <BuyerContext.Provider value={value}>
      {children}
    </BuyerContext.Provider>
  );
}

export function useBuyer() {
  const context = useContext(BuyerContext);

  if (!context) {
    throw new Error("useBuyer must be used inside <BuyerProvider>");
  }

  return context;
}