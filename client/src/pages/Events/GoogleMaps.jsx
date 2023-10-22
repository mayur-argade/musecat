import React, { useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const GoogleMaps = ({ selectedLocation, selectedLocations }) => {
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
        // setMapAddress({ lat, lng });
    };

    const handlePlaceSelect = (place) => {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        // setMapAddress({ lat, lng });
    };
    if (loadError) return "Error";
    if (!isLoaded) return "Maps";


    return (
        <div>
            <GoogleMap
                mapContainerStyle={{
                    height: "300px",
                }}
                // center={}
                zoom={18}
                onLoad={onMapLoad}
                onClick={handleMapClick}
            >
                {/* <MarkerF
                    position={selectedLocations}
                    icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
                /> */}
            </GoogleMap>
        </div>
    )
}

export default GoogleMaps