import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const containerStyle = {
    width: '400px',
    height: '400px',
};

const center = {
    lat: 0, // Initial latitude
    lng: 0, // Initial longitude
};


const AddVenueModal = () => {
    const [venueName, setVenueName] = useState('');
    const [banner, setBanner] = useState('');
    const [address, setAddress] = useState('');
    const [position, setPosition] = useState(center);


    const onMapClick = (e) => {
        setPosition({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
    };

    const handleSubmit = () => {
        // Handle form submission, including venueName, banner, address, and position (lat/lng).
        console.log('Venue Name:', venueName);
        console.log('Banner:', banner);
        console.log('Address:', address);
        console.log('Latitude:', position.lat);
        console.log('Longitude:', position.lng);
    };

    return (
        <div>
            <h1>Create a Venue</h1>
            <form onSubmit={handleSubmit}>
                <label>Venue Name:</label>
                <input
                    type="text"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                />

                <label>Banner URL:</label>
                <input
                    type="text"
                    value={banner}
                    onChange={(e) => setBanner(e.target.value)}
                />

                <label>Address:</label>
                <input
                    type="text"
                    id="location-search"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <div id="map" style={{ height: '400px', width: '100%' }}></div>
                <LoadScript googleMapsApiKey="AIzaSyDAm-Tbvhll6eYrRrthm42too-VSL4CVcY">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onClick={onMapClick}
                    >
                        <Marker position={position} />
                    </GoogleMap>
                </LoadScript>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddVenueModal