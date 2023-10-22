import React, { useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useEffect } from "react";
// import { REACT_APP_GOOGLE_MAPS_KEY } from "../constants/constants";

const MapComponent = ({ coordinates, selectedLocation, setMapAddress }) => {
    // const [address, setAddress] = useState({ lat: selectedLocation.lat, lon: selectedLocation.lng })


    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDAm-Tbvhll6eYrRrthm42too-VSL4CVcY',
    });
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setMapAddress({ lat, lng });
    };

    const handlePlaceSelect = (place) => {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setMapAddress({ lat, lng });
    };
    if (loadError) return "Error";
    if (!isLoaded) return "Maps";

    // Calculate the center of the map based on the coordinates
    let mapCenter = selectedLocation; // Default to the selectedLocation


    if(coordinates){
        if (coordinates.length > 1) {
            // Calculate the center for multiple coordinates
            const bounds = new window.google.maps.LatLngBounds();
            coordinates.forEach((coordinate) => bounds.extend(coordinate));
            mapCenter = bounds.getCenter();
        }
    }

    // console.log("sekected location", selectedLocation)
    // console.log("address", address)
    return (
        <div style={{ marginTop: "px" }}>
            <GoogleMap
                mapContainerStyle={{
                    height: "500px",
                }}
                center={mapCenter}
                zoom={10}
                onLoad={onMapLoad}
                onClick={handleMapClick}
            >
                {
                    coordinates
                        ? (
                            coordinates.map((coordinate, index) => (
                                <MarkerF
                                    position={coordinate}
                                    icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
                                />
                            ))
                        )
                        :
                        (
                            <MarkerF
                                position={selectedLocation}
                                icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
                            />
                        )
                }

            </GoogleMap>
        </div>
    );
};

export default MapComponent;
