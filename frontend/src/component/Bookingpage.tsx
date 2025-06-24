import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DateRange, Range } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function BookingPage() {
  const navigate = useNavigate();
  const { listingId } = useParams<{ listingId: string }>();

  const [loading, setLoading] = useState(false);
  const [selectedRange, setSelectedRange] = useState<Range>({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: "selection",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to book a listing");
      navigate("/login");
    }
  }, [navigate]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    const { startDate, endDate } = selectedRange;
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("https://stayfinder-15778.onrender.com/api/booking/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          listing: listingId,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Booking successful!");
        navigate("/");
      } else {
        alert(data.msg || "Booking failed.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong while booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Book Listing</h2>

        <form onSubmit={handleBooking} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Select Date Range:</label>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setSelectedRange(item.selection)}
              moveRangeOnFirstSelection={false}
              ranges={[selectedRange]}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
