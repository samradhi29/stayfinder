
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "200px",  
};

interface ListingWithMapProps {
  latitude: number;
  longitude: number;
}

const ListingWithMap: React.FC<ListingWithMapProps> = ({ latitude, longitude }) => {
  const center = {
    lat: latitude,
    lng: longitude,
  };
  //because of the card details i didn't add this in app
  return (
    <LoadScript googleMapsApiKey="AIzaSyDUxJBzZVxunk3udJVzl5FbrZQJYjrBDY0">
      
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default ListingWithMap;
