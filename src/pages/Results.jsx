

import {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback
} from "react";

import "./results.css";

const BROWSE_PROPERTIES = [
  { id: 1, badge: 'FOR RENT', featured: false, price: '₹62,000/mo', title: 'Furnished 3BHK on Golf Course Road', location: 'Sector 54, Gurgaon, Delhi NCR', beds: 3, baths: 3, sqft: '1,680', type: 'rent', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
  { id: 2, badge: 'FOR SALE', featured: false, price: '₹1.65 Cr', title: 'Penthouse with terrace in Adyar', location: 'Adyar, Chennai', beds: 4, baths: 4, sqft: '2,600', type: 'sale', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' },
  { id: 3, badge: 'FOR RENT', featured: true, price: '₹32,000/mo', title: 'Modern 2BHK near Hitech City', location: 'Gachibowli, Hyderabad', beds: 2, baths: 2, sqft: '1,080', type: 'rent', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80' },
  { id: 4, badge: 'FOR SALE', featured: true, price: '₹1.85 Cr', title: 'Garden villa with private lawn', location: 'Whitefield, Bangalore', beds: 4, baths: 4, sqft: '2,850', type: 'sale', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' },
  { id: 5, badge: 'FOR RENT', featured: true, price: '₹19,500/mo', title: 'Studio loft in Anna Nagar', location: 'Anna Nagar, Chennai', beds: 1, baths: 1, sqft: '620', type: 'rent', img: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80' },
  { id: 6, badge: 'FOR RENT', featured: true, price: '₹55,000/mo', title: 'Sunlit 3BHK in Indiranagar', location: 'Indiranagar, Bangalore', beds: 3, baths: 2, sqft: '1,450', type: 'rent', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80' },
  { id: 7, badge: 'FOR SALE', featured: false, price: '₹1.25 Cr', title: 'Independent house in Jayanagar', location: 'Jayanagar, Bangalore', beds: 3, baths: 3, sqft: '2,100', type: 'sale', img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80' },
  { id: 8, badge: 'FOR RENT', featured: false, price: '₹68,000/mo', title: 'Lakeview 3BHK in Powai', location: 'Powai, Mumbai', beds: 3, baths: 2, sqft: '1,520', type: 'rent', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80' },
  { id: 9, badge: 'FOR RENT', featured: false, price: '₹21,000/mo', title: 'Bright 1BHK in Baner', location: 'Baner, Pune', beds: 1, baths: 1, sqft: '640', type: 'rent', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80' },
  { id: 10, badge: 'FOR SALE', featured: true, price: '₹3.20 Cr', title: 'Luxury duplex in Banjara Hills', location: 'Banjara Hills, Hyderabad', beds: 4, baths: 4, sqft: '3,200', type: 'sale', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80' },
  { id: 11, badge: 'FOR RENT', featured: true, price: '₹45,000/mo', title: 'Spacious 3BHK in Kalyani Nagar', location: 'Kalyani Nagar, Pune', beds: 3, baths: 3, sqft: '1,800', type: 'rent', img: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=800&q=80' },
  { id: 12, badge: 'FOR SALE', featured: true, price: '₹2.10 Cr', title: 'Corner flat in Anna Salai', location: 'Teynampet, Chennai', beds: 3, baths: 2, sqft: '1,600', type: 'sale', img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80' },
]

const FILTER_TABS = ['All homes', 'For rent', 'For sale']
const CITY_LINKS = ['Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Chennai', 'Delhi NCR']

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


  const [browseSearch, setBrowseSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All homes')

  const filteredBrowse = BROWSE_PROPERTIES.filter(p => {
    if (activeFilter === 'For rent') return p.type === 'rent'
    if (activeFilter === 'For sale') return p.type === 'sale'
    return true
  })

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
                      { value: "", label: "Any Budget" },
                      { value: "15000", label: "Under ₹15,000" },
                      { value: "30000", label: "Under ₹30,000" },
                      { value: "50000", label: "Under ₹50,000" },
                      { value: "100000", label: "Under ₹1,00,000" }
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


      {/* ── BROWSE HOMES SECTION ── */}
      <section className="browse-section">

        <div className="browse-header">
          <p className="browse-label">NESTWISE HOMES</p>
          <h2 className="browse-title">Every available home</h2>
          <p className="browse-count">{filteredBrowse.length} homes matching your search</p>
        </div>

        <form className="browse-search" onSubmit={e => e.preventDefault()}>
          <span className="browse-search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#19873d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search Places..."
            value={browseSearch}
            onChange={e => setBrowseSearch(e.target.value)}
            className="browse-search-input"
          />
          <button type="submit" className="browse-search-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            Search
          </button>
        </form>

        <div className="browse-filters">
          {FILTER_TABS.map(tab => (
            <button
              key={tab}
              className={`browse-filter-tab ${activeFilter === tab ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="browse-cities">
          {CITY_LINKS.map(city => (
            <a key={city} href="#" className="browse-city-link">{city}</a>
          ))}
        </div>

        <div className="browse-grid">
          {filteredBrowse.map(p => (
            <div key={p.id} className="browse-card">
              <div className="browse-card-img-wrap">
                <img src={p.img} alt={p.title} />
                <span className={`browse-badge-type${p.badge === 'FOR SALE' ? ' sale' : ''}`}>{p.badge}</span>
                {p.featured && <span className="browse-badge-featured">Featured</span>}
              </div>
              <div className="browse-card-body">
                <div className="browse-card-price">{p.price}</div>
                <div className="browse-card-title">{p.title}</div>
                <div className="browse-card-location">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#19873d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {p.location}
                </div>
                <div className="browse-card-divider"/>
                <div className="browse-card-specs">
                  <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"/><path d="M22 4v16"/><path d="M2 12h20"/><path d="M2 8h5a2 2 0 0 1 2 2v2H2"/><path d="M22 8h-5a2 2 0 0 0-2 2v2h7"/></svg>
                    {p.beds} Beds
                  </span>
                  <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                    {p.baths} Baths
                  </span>
                  <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                    {p.sqft} sq.ft
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>



      {/* PROPERTY RESULTS REMOVED */}
      <div style={{display:'none'}} ref={resultsRef}>

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
