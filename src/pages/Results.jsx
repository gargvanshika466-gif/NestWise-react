

import {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback
} from "react";

import "./results.css";
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


const budgetOptions = {
  PG: [
    { value: "", label: "Any Budget" },
    { value: "8000", label: "Under ₹8,000" },
    { value: "10000", label: "Under ₹10,000" },
    { value: "15000", label: "Under ₹15,000" }
  ],

  Studio: [
    { value: "", label: "Any Budget" },
    { value: "15000", label: "Under ₹15,000" },
    { value: "20000", label: "Under ₹20,000" },
    { value: "25000", label: "Under ₹25,000" }
  ],

  Apartment: [
    { value: "", label: "Any Budget" },
    { value: "20000", label: "Under ₹20,000" },
    { value: "30000", label: "Under ₹30,000" },
    { value: "50000", label: "Under ₹50,000" }
  ],

  Villa: [
    { value: "", label: "Any Budget" },
    { value: "40000", label: "Under ₹40,000" },
    { value: "60000", label: "Under ₹60,000" },
    { value: "100000", label: "Under ₹1,00,000" }
  ]
};


function PropertyCard({
  property,
  favorite,
  onFavorite
}) {

  return (
    <div className="property-card">

      <div className="property-image">

        <img
          src={property.image}
          alt={property.title}
        />

        <button
          className="favorite-btn"
          onClick={() => onFavorite(property.id)}
        >
          {favorite ? "♥" : "♡"}
        </button>

      </div>


      <div className="property-info">

        <div className="price-row">

          <h3>
            ₹{property.price.toLocaleString()}
            <small>/month</small>
          </h3>

          <span>{property.bhk}</span>

        </div>


        <h4>{property.title}</h4>

        <p className="location">
          📍 {property.location}
        </p>


        <div className="property-tags">

          <span>{property.type}</span>

          <span>{property.furnishing}</span>

          <span>⭐ {property.rating}</span>

        </div>


        <p className="property-description">
          {property.description}
        </p>


        <div className="amenity-tags">

          {property.amenities.map((amenity) => (
            <span key={amenity}>
              ✓ {amenity}
            </span>
          ))}

        </div>


        <button
          className="view-btn"
          onClick={() =>
            alert(
              `${property.title}\n\n₹${property.price.toLocaleString()} / month\n${property.location}\n${property.bhk}\n${property.furnishing}`
            )
          }
        >
          View Details
        </button>

      </div>

    </div>
  );
}


function Results() {

  const savedBuyer = JSON.parse(
    localStorage.getItem("buyerData")
  );


  const savedPreferences = JSON.parse(
    localStorage.getItem("buyerPreferences")
  );


  const [name, setName] = useState(
    savedBuyer?.name || ""
  );

  const [location, setLocation] = useState(
    savedPreferences?.location || ""
  );

  const [propertyType, setPropertyType] = useState(
    savedPreferences?.propertyType || ""
  );

  const [budget, setBudget] = useState(
    savedPreferences?.budget || ""
  );

  const [bhk, setBhk] = useState(
    savedPreferences?.bhk || ""
  );

  const [furnishing, setFurnishing] = useState(
    savedPreferences?.furnishing || ""
  );

  const [amenities, setAmenities] = useState(
    savedPreferences?.amenities || []
  );

  const [favorites, setFavorites] = useState([]);


  const resultsRef = useRef(null);


  const propertyTypes = [
    "Apartment",
    "Villa",
    "PG",
    "Studio"
  ];

  const bhks = [
    "1 BHK",
    "2 BHK",
    "3 BHK",
    "4+ BHK"
  ];

  const furnishingTypes = [
    "Fully Furnished",
    "Semi Furnished",
    "Unfurnished"
  ];

  const amenityList = [
    "Gym",
    "Parking",
    "Security",
    "Lift"
  ];


  useEffect(() => {

    document.title = "NestWise | Find Your Home";

  }, []);


  useEffect(() => {

    const preferences = {
      name,
      location,
      propertyType,
      budget,
      bhk,
      furnishing,
      amenities
    };

    localStorage.setItem(
      "buyerPreferences",
      JSON.stringify(preferences)
    );

  }, [
    name,
    location,
    propertyType,
    budget,
    bhk,
    furnishing,
    amenities
  ]);


  useEffect(() => {

    if (!propertyType) {
      return;
    }

    const validBudgets = budgetOptions[
      propertyType
    ].map((item) => item.value);

    if (!validBudgets.includes(String(budget))) {
      setBudget("");
    }

  }, [propertyType]);


  const handleAmenity = useCallback((amenity) => {

    setAmenities((previous) => {

      if (previous.includes(amenity)) {

        return previous.filter(
          (item) => item !== amenity
        );

      }

      return [
        ...previous,
        amenity
      ];

    });

  }, []);


  const toggleFavorite = useCallback((id) => {

    setFavorites((previous) => {

      if (previous.includes(id)) {

        return previous.filter(
          (item) => item !== id
        );

      }

      return [
        ...previous,
        id
      ];

    });

  }, []);


  const filteredProperties = useMemo(() => {

    let filtered = properties.filter((property) => {

      const matchesType =
        !propertyType ||
        property.type === propertyType;

      const matchesBudget =
        !budget ||
        property.price <= Number(budget);

      return matchesType && matchesBudget;

    });


    const scoredProperties = filtered.map(
      (property) => {

        let score = 0;


        if (
          location &&
          property.location
            .toLowerCase()
            .includes(location.toLowerCase())
        ) {
          score += 3;
        }


        if (
          bhk &&
          property.bhk === bhk
        ) {
          score += 2;
        }


        if (
          furnishing &&
          property.furnishing === furnishing
        ) {
          score += 2;
        }


        amenities.forEach((amenity) => {

          if (
            property.amenities.includes(amenity)
          ) {
            score += 1;
          }

        });


        return {
          ...property,
          score
        };

      }
    );


    return scoredProperties.sort(
      (a, b) => b.score - a.score
    );

  }, [
    location,
    propertyType,
    budget,
    bhk,
    furnishing,
    amenities
  ]);


  const hasFilters =
    location ||
    propertyType ||
    budget ||
    bhk ||
    furnishing ||
    amenities.length;


  function scrollToResults() {

    resultsRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }


  return (

    <div className="results-page">


      {/* HERO */}

      <div className="results-header">

        <div>

          <p className="result-label">
            NESTWISE
          </p>

          <h1>
            Find Your Perfect Home
          </h1>

          <p>
            {name
              ? `Welcome ${name}! Find a home that matches your needs.`
              : "Find a home that matches your needs."}
          </p>

        </div>

      </div>


      {/* BUYER SEARCH */}

      <form
        className="buyer-search"
        onSubmit={(e) => {
          e.preventDefault();
          scrollToResults();
        }}
      >

        <h2>Tell us what you are looking for</h2>


        <div className="search-grid">


          <div className="search-field">

            <label>Your Name</label>

            <input
              type="text"
              value={name}
              placeholder="Your name"
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>


          <div className="search-field">

            <label>Preferred Location</label>

            <input
              type="text"
              value={location}
              placeholder="Delhi, Gurgaon..."
              onChange={(e) =>
                setLocation(e.target.value)
              }
            />

          </div>


          <div className="search-field">

            <label>Property Type</label>

            <select
              value={propertyType}
              onChange={(e) =>
                setPropertyType(e.target.value)
              }
            >

              <option value="">
                All Properties
              </option>

              {propertyTypes.map((type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              ))}

            </select>

          </div>


          <div className="search-field">

            <label>Budget</label>

            <select
              value={budget}
              onChange={(e) =>
                setBudget(e.target.value)
              }
            >

              {(
                propertyType
                  ? budgetOptions[propertyType]
                  : [
                      {
                        value: "",
                        label: "Any Budget"
                      },
                      {
                        value: "15000",
                        label: "Under ₹15,000"
                      },
                      {
                        value: "30000",
                        label: "Under ₹30,000"
                      },
                      {
                        value: "50000",
                        label: "Under ₹50,000"
                      },
                      {
                        value: "100000",
                        label: "Under ₹1,00,000"
                      }
                    ]
              ).map((item) => (

                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>

              ))}

            </select>

          </div>


          <div className="search-field">

            <label>Bedrooms</label>

            <select
              value={bhk}
              onChange={(e) =>
                setBhk(e.target.value)
              }
            >

              <option value="">
                Any BHK
              </option>

              {bhks.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}

            </select>

          </div>


          <div className="search-field">

            <label>Furnishing</label>

            <select
              value={furnishing}
              onChange={(e) =>
                setFurnishing(e.target.value)
              }
            >

              <option value="">
                Any Furnishing
              </option>

              {furnishingTypes.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}

            </select>

          </div>

        </div>


        {/* AMENITIES */}

        <div className="amenities-box">

          <h3>Amenities</h3>

          <div className="amenities-list">

            {amenityList.map((amenity) => (

              <label
                key={amenity}
                className={
                  amenities.includes(amenity)
                    ? "amenity selected"
                    : "amenity"
                }
              >

                <input
                  type="checkbox"
                  checked={amenities.includes(amenity)}
                  onChange={() =>
                    handleAmenity(amenity)
                  }
                />

                {amenity}

              </label>

            ))}

          </div>

        </div>


        <button
          type="submit"
          className="find-home-btn"
        >
          Find My Home
        </button>

      </form>


      {/* PROPERTY RESULTS */}

      <div
        className="results-section"
        ref={resultsRef}
      >

        <div className="section-top">

          <div>

            <h2>
              Recommended Properties
            </h2>

            <p>
              {filteredProperties.length} properties found
            </p>

          </div>

          {hasFilters && (
            <span className="matching-text">
              Best matches shown first
            </span>
          )}

        </div>


        {filteredProperties.length === 0 ? (

          <div className="no-results">

            <h3>
              No exact matches found
            </h3>

            <p>
              Try changing your budget or preferences.
            </p>

            <button
              onClick={() => {
                setPropertyType("");
                setBudget("");
                setBhk("");
                setFurnishing("");
                setAmenities([]);
              }}
            >
              Show Similar Properties
            </button>

          </div>

        ) : (

          <div className="property-grid">

            {filteredProperties.map((property) => (

              <PropertyCard
                key={property.id}
                property={property}
                favorite={
                  favorites.includes(property.id)
                }
                onFavorite={toggleFavorite}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Results;