import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditListing() {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`https://stayfinder-15778.onrender.com/api/listings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setForm({
          title: data.title,
          location: data.location,
          price: data.price,
          description: data.description || "",
          imageUrl: data.images?.[0]?.url || "",
        })
      );
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://stayfinder-15778.onrender.com/api/listings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Update failed");

      alert("Listing updated!");
      navigate("/host-dashboard");
    } catch (err) {
      alert("Error updating listing");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Listing</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="location"
          type="text"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="imageUrl"
          type="text"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border px-3 py-2 rounded"
        />
        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Preview"
            className="w-full h-48 object-cover rounded-md"
          />
        )}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update
        </button>
      </form>
    </div>
  );
}
