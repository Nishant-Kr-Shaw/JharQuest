// import { useState } from 'react';
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// import MarkerClusterGroup from 'react-leaflet-cluster';

// // Fix default marker icon
// const DefaultIcon = L.icon({
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// L.Marker.prototype.options.icon = DefaultIcon;

// const markers = [
//   {
//     district: "Ranchi",
//     headquarters: "Ranchi",
//     geocode: [85.296013, 23.344315],
//     description: "Ranchi is the capital of Jharkhand, known for its waterfalls, forested hills, and tribal culture. It's a hub for education and governance.",
//     reviews: [
//       "Beautiful city with pleasant weather and great food options.",
//       "Tagore Hill and Rock Garden are must-visits!",
//       "Traffic can be hectic, but the natural beauty makes up for it."
//     ]
//   },
//   {
//     district: "Bokaro",
//     headquarters: "Bokaro Steel City",
//     geocode: [86.151115, 23.669296],
//     description: "Bokaro is an industrial city famous for its steel plant and modern urban planning. It plays a key role in Jharkhand’s economy.",
//     reviews: [
//       "Clean and well-planned city with wide roads.",
//       "City Park is a peaceful spot for families.",
//       "Not much nightlife, but great for a quiet stay."
//     ]
//   },
//   {
//     district: "Dhanbad",
//     headquarters: "Dhanbad",
//     geocode: [86.4304, 23.7850],
//     description: "Dhanbad is known as the 'Coal Capital of India' due to its extensive coal mining operations. It’s also home to IIT (ISM) Dhanbad.",
//     reviews: [
//       "Rich in history and mining culture.",
//       "IIT campus is impressive and worth a visit.",
//       "Air quality can be a concern in some areas."
//     ]
//   },
//   {
//     district: "Giridih",
//     headquarters: "Giridih",
//     geocode: [86.302193, 24.184713],
//     description: "Giridih is rich in minerals and forests, and is known for the Parasnath Hills, a major Jain pilgrimage site.",
//     reviews: [
//       "Perfect for nature lovers and trekkers.",
//       "Parasnath Hills offer a serene spiritual experience.",
//       "Limited hotel options, plan ahead."
//     ]
//   },
//   {
//     district: "East Singhbhum",
//     headquarters: "Jamshedpur",
//     geocode: [86.203110, 22.805618],
//     description: "Jamshedpur is India's first planned industrial city, founded by Tata. It’s known for its steel production and urban infrastructure.",
//     reviews: [
//       "Well-maintained city with great civic amenities.",
//       "Jubilee Park is stunning, especially in spring.",
//       "Feels safe and organized compared to other cities."
//     ]
//   },
//   {
//     district: "Deoghar",
//     headquarters: "Deoghar",
//     geocode: [86.695175, 24.482775],
//     description: "Deoghar is a spiritual center famous for the Baidyanath Temple, one of the twelve Jyotirlingas. It attracts millions of pilgrims annually.",
//     reviews: [
//       "Spiritual energy is palpable during Shravan Mela.",
//       "Temple architecture is beautiful and historic.",
//       "Can get crowded—visit early morning for peace."
//     ]
//   },
//   {
//     district: "Sahibganj",
//     headquarters: "Sahibganj",
//     geocode: [87.63070320466684, 24.164223181912185],
//     description: "Sahibganj lies on the banks of the Ganges and is known for its scenic beauty and tribal heritage. It’s a gateway to the Rajmahal hills.",
//     reviews: [
//       "River views are breathtaking at sunset.",
//       "Great for birdwatching and nature photography.",
//       "Still developing—basic amenities may be limited."
//     ]
//   }
// ];

// const Maps = () => {
//   const [selectedDistrict, setSelectedDistrict] = useState(markers[0].district);
//   const jharkhandCoords: [number, number] = [23.3500, 85.3300];
//   const selectedInfo = markers.find(m => m.district === selectedDistrict);

//   return (
//     <>
//       <MapContainer
//         center={jharkhandCoords}
//         zoom={8}
//         scrollWheelZoom={false}
//         style={{ height: '50vh', width: '100%' }}
//         className='px-4 py-4 rounded-lg shadow-lg overflow-hidden'
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <MarkerClusterGroup>
//           {markers.map((marker, idx) => (
//             <Marker key={idx} position={[marker.geocode[1], marker.geocode[0]]}>
//               <Popup>
//                 <strong>{marker.district}</strong><br />
//                 {marker.headquarters}
//               </Popup>
//             </Marker>
//           ))}
//         </MarkerClusterGroup>
//       </MapContainer>

//       <form method="post" action="/action-page" className='p-4 bg-white rounded-lg shadow-lg w-full mx-auto mt-[52vh]'>
//         <h1 className='text-2xl font-bold mt-4 bg-green-100 w-fit h-fit'>Know Your Destination</h1>
//         <div className="mt-4">
//           <h2 className="text-lg font-semibold">Selected District:</h2>
//           <p className="text-gray-700">Choose a district from the dropdown below to see more information.</p>
//         </div>
//         <label className="block mt-2">
//           Choose a district:
//           <select
//             name="district"
//             className="ml-2 p-1 border border-gray-300 rounded"
//             value={selectedDistrict}
//             onChange={(e) => setSelectedDistrict(e.target.value)}
//           >
//             {markers.map((marker, idx) => (
//               <option key={idx} value={marker.district}>
//                 {marker.district}
//               </option>
//             ))}
//           </select>
//         </label>

//         {selectedInfo && (
//           <div className="mt-4 p-3 bg-gray-100 rounded-lg flex flex-col">
//             <h3 className="font-semibold text-green-700">{selectedInfo.headquarters}</h3>
//             <p className="text-gray-800 text-sm mb-2">{selectedInfo.description}</p>
//             <h4 className="font-semibold text-gray-600 mt-2">Visitor Reviews:</h4>
//             <ul className="list-disc list-inside text-gray-700 text-sm">
//               {selectedInfo.reviews.map((review, idx) => (
//                 <li key={idx}>{review}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </form>
//     </>
//   );
// };

// export default Maps;

import { useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  StreetViewPanorama,
  Autocomplete
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = { lat: 23.3441, lng: 85.3096 }; // Ranchi

export default function Maps() {
  const [center, setCenter] = useState(defaultCenter);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place?.geometry?.location) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setCenter(location);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBk08q9WI7wmhBYwcz5bz7LIcWOVhy-Rv0"
      libraries={["places"]}
    >
      <Autocomplete
        onLoad={(ref) => (autocompleteRef.current = ref)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Search location"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `40px`,
            padding: `0 12px`,
            borderRadius: `4px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `16px`,
            position: "absolute",
            top: "10px",
            left: "50%",
            marginLeft: "-120px",
            zIndex: "10"
          }}
        />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        <StreetViewPanorama
          options={{
            position: center,
            pov: { heading: 34, pitch: 10 },
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
}