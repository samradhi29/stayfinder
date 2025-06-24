import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HostDashboard = () => {
  const [listings, setListings] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("https://stayfinder-15778.onrender.com/host/api/listings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setListings(data);
      } catch (err) {
        console.error("Fetch error", err);
      }
    };
    fetchListings();
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`https://stayfinder-15778.onrender.com/host/api/listings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      console.log(result);
      setListings(listings.filter((l) => l._id !== id));
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Listings</h2>
        <button
          onClick={() => navigate("/host/create-listing")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create Listing
        </button>
      </div>

      {listings.length === 0 ? (
        <p className="text-gray-500">No listings available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.map((listing) => (
            <div key={listing._id} className="border rounded-lg p-4 shadow-sm">
              {listing.images && listing.images.length > 0 && (
                <img
                  src={listing.images[0].url}
                  alt={listing.title}
                  className="w-full h-48 object-cover rounded"
                />
              )}
              <h3 className="text-lg font-semibold mt-2">{listing.title}</h3>
              <p className="text-gray-600">
                {listing.location}, {listing.country}
              </p>
              <p className="text-gray-800 font-medium">₹{listing.price}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => navigate(`/host/edit-listing/${listing._id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(listing._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HostDashboard;
