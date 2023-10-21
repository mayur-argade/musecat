import React, { useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
// import { REACT_APP_GOOGLE_MAPS_KEY } from "../constants/constants";

const MapComponent = ({ selectedLocation, setMapAddress }) => {
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


    console.log("sekected location", selectedLocation)
    // console.log("address", address)
    return (
        <div style={{ marginTop: "10px" }}>
            {/* <span>
                latitude =  {address.lat}
            </span>
            <span>
                longitude = {address.lng}
            </span> */}
            <GoogleMap
                mapContainerStyle={{
                    height: "300px",
                }}
                center={selectedLocation}
                zoom={18}
                onLoad={onMapLoad}
                onClick={handleMapClick}
            >
                <MarkerF
                    position={selectedLocation}
                    icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
                />
            </GoogleMap>
        </div>
    );
};

export default MapComponent;
