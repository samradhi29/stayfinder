import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
};

const ListingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [listing, setListing] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://stayfinder-15778.onrender.com/api/listings/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Listing not found");
        return res.json();
      })
      .then((data) => {
        setListing(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleBookNowClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to book a listing");
      navigate("/login");
      return;
    }
    navigate(`/book/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Listing not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <Link to="/" className="text-blue-600 font-semibold mb-4 inline-block">
        ← Back to Listings
      </Link>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={listing.image?.url}
          alt={listing.title}
          className="w-full h-96 object-cover"
        />

        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold">{listing.title}</h1>
          <p className="text-gray-700">{listing.description}</p>

          <div className="flex flex-wrap gap-4 text-sm">
            <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-700">
              ₹ {listing.price} / night
            </span>
            <span className="bg-green-100 px-3 py-1 rounded-full text-green-700">
              {listing.location}
            </span>
            <span className="bg-purple-100 px-3 py-1 rounded-full text-purple-700">
              {listing.country}
            </span>
          </div>

          {/* Google Map showing location
          {listing.latitude && listing.longitude && (
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: listing.latitude, lng: listing.longitude }}
                zoom={12}
              >
                <Marker position={{ lat: listing.latitude, lng: listing.longitude }} />
              </GoogleMap>
            </LoadScript> */}
          {/* )} */}

          <button
            onClick={handleBookNowClick}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
