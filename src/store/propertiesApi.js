/* =========================================================
   PROPERTIES API  (mock backend)

   This file stands in for a real server. Every function
   returns a Promise after a short delay, so the rest of the
   app handles loading and error states exactly the way it
   would with fetch("/api/properties").

   To DEMO the error state, run this once in the browser
   console and reload the page:

     localStorage.setItem("nestwiseSimulateError", "true")

   and to turn it off again:

     localStorage.removeItem("nestwiseSimulateError")
========================================================= */

/* ---------- Shared option lists ---------- */

export const PROPERTY_TYPES = ["Apartment", "Villa", "PG", "Studio"];
export const BHK_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"];
export const FURNISHING_OPTIONS = ["Fully Furnished", "Semi Furnished", "Unfurnished"];
export const AMENITY_OPTIONS = ["Gym", "Parking", "Security", "Lift"];


/* ---------- Helpers ---------- */

export function formatPrice(value) {
  return "₹" + Number(value).toLocaleString("en-IN");
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function shouldSimulateError() {
  try {
    return localStorage.getItem("nestwiseSimulateError") === "true";
  } catch {
    return false;
  }
}


/* ---------- Data ---------- */

const properties = [
  {
    id: 1,
    title: "Modern Green Apartment",
    location: "Delhi",
    price: 18000,
    bhk: "2 BHK",
    type: "Apartment",
    furnishing: "Semi Furnished",
    amenities: ["Gym", "Parking", "Security", "Lift"],
    rating: 4.7,
    description: "Bright 2 BHK apartment in a peaceful residential area.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
  },
  {
    id: 2,
    title: "Luxury City Apartment",
    location: "Gurgaon",
    price: 28000,
    bhk: "3 BHK",
    type: "Apartment",
    furnishing: "Fully Furnished",
    amenities: ["Gym", "Parking", "Security", "Lift"],
    rating: 4.9,
    description: "Premium furnished apartment close to offices and metro.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
  },
  {
    id: 3,
    title: "Comfortable Studio",
    location: "Noida",
    price: 14000,
    bhk: "1 BHK",
    type: "Studio",
    furnishing: "Fully Furnished",
    amenities: ["Security", "Lift"],
    rating: 4.5,
    description: "Compact studio perfect for students and working professionals.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800"
  },
  {
    id: 4,
    title: "Spacious Family Villa",
    location: "Delhi",
    price: 55000,
    bhk: "4+ BHK",
    type: "Villa",
    furnishing: "Semi Furnished",
    amenities: ["Parking", "Security", "Gym"],
    rating: 4.8,
    description: "Large family villa with excellent parking and security.",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800"
  },
  {
    id: 5,
    title: "Premium City Apartment",
    location: "Noida",
    price: 22000,
    bhk: "2 BHK",
    type: "Apartment",
    furnishing: "Fully Furnished",
    amenities: ["Gym", "Parking", "Lift"],
    rating: 4.6,
    description: "Modern apartment with excellent amenities and connectivity.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800"
  },
  {
    id: 6,
    title: "Budget Friendly PG",
    location: "Gurgaon",
    price: 9000,
    bhk: "1 BHK",
    type: "PG",
    furnishing: "Fully Furnished",
    amenities: ["Security", "Lift", "Parking"],
    rating: 4.4,
    description: "Affordable PG with furnished rooms and basic facilities.",
    image:
      "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800"
  },
  {
    id: 7,
    title: "Premium PG Residence",
    location: "Delhi",
    price: 13000,
    bhk: "1 BHK",
    type: "PG",
    furnishing: "Semi Furnished",
    amenities: ["Gym", "Security", "Lift"],
    rating: 4.6,
    description: "Comfortable PG located near metro and shopping areas.",
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800"
  },
  {
    id: 8,
    title: "Elegant Studio Home",
    location: "Gurgaon",
    price: 20000,
    bhk: "1 BHK",
    type: "Studio",
    furnishing: "Semi Furnished",
    amenities: ["Parking", "Security", "Lift"],
    rating: 4.7,
    description: "Stylish studio apartment with convenient city access.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"
  },
  {
    id: 9,
    title: "Luxury Garden Villa",
    location: "Gurgaon",
    price: 75000,
    bhk: "4+ BHK",
    type: "Villa",
    furnishing: "Fully Furnished",
    amenities: ["Gym", "Parking", "Security", "Lift"],
    rating: 4.9,
    description: "Luxury villa with spacious interiors and garden space.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"
  }
];


/* ---------- Fake network calls ---------- */

// GET /api/properties
export async function fetchPropertiesApi() {
  await wait(800);

  if (shouldSimulateError()) {
    throw new Error("We could not load the properties. Please check your connection and try again.");
  }

  return properties.map((property) => ({
    ...property,
    amenities: [...property.amenities]
  }));
}

// POST /api/visits
export async function requestVisitApi(request) {
  await wait(900);

  if (shouldSimulateError()) {
    throw new Error("We could not send your visit request. Please try again.");
  }

  return {
    id: Date.now(),
    status: "requested",
    ...request
  };
}