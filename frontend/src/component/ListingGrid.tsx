import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";

const ListingGrid: React.FC = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  const fetchListings = async () => {
    setLoading(true);
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.toString().trim()) {
        params.append(key, value.toString().trim());
      }
    });

    try {
      const url = `https://stayfinder-15778.onrender.com/api/listings${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setListings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch listings", error);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchListings();
  };

  const handleClearFilters = () => {
    setFilters({
      location: "",
      minPrice: "",
      maxPrice: "",
    });
    setTimeout(() => {
      fetchListings();
    }, 100);
  };

  return (
    <>
      <Navbar />
      <div className="pt-24 max-w-7xl mx-auto px-6 py-10">
       

        <form
          onSubmit={handleSubmit}
          className="mb-10 bg-gray-50 p-6 rounded-lg shadow-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              name="location"
              placeholder="Search by location..."
              value={filters.location}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price (₹)"
              value={filters.minPrice}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={0}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price (₹)"
              value={filters.maxPrice}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={0}
            />
          </div>

          <div className="flex gap-2 justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Search Listings
            </button>
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Clear Filters
            </button>
          </div>
        </form>

        {loading ? (
          <div className="text-center mt-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-xl mt-4">Loading listings...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center mt-20 text-lg text-gray-600">
            <p>No listings found.</p>
            <p className="text-sm mt-2">Try adjusting your search filters.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-center text-gray-600">
              Found {listings.length} listing{listings.length !== 1 ? "s" : ""}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {listings.map((listing) => (
                <Link
                  to={`/listing/${listing._id}`}
                  key={listing._id}
                  className="block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 bg-white"
                >
                  <img
                    src={listing.image?.url || "/placeholder-image.jpg"}
                    alt={listing.title || "Listing"}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
                    }}
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 truncate">
                      {listing.title || "Untitled Listing"}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ListingGrid;
