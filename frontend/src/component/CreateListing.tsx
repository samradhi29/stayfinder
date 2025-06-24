import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);

    // Preview logic
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.location || !formData.country) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    images.forEach((img) => data.append("images", img));

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Unauthorized: No token found.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/host/api/listings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      const result = await res.json();
      console.log("Created:", result);
      setMessage("Listing created successfully!");
      setTimeout(() => navigate("/host/dashboard"), 1500);
    } catch (err) {
      console.error("Create error", err);
      setMessage("Failed to create listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create a New Listing</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full px-4 py-2 border rounded-md"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Location"
          className="w-full px-4 py-2 border rounded-md"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Country"
          className="w-full px-4 py-2 border rounded-md"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full px-4 py-2 border rounded-md"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full px-4 py-2 border rounded-md"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <input
          type="file"
          multiple
          accept="image/*"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          onChange={handleImageChange}
        />

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-2">
            {imagePreviews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`preview-${idx}`}
                className="h-24 w-full object-cover rounded-md border"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-2 rounded-md font-medium text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>

        {message && (
          <p className="text-center mt-4 text-sm text-red-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default CreateListing;
