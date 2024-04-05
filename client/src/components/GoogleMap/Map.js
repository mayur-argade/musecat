import React, { useState } from "react";
import { GoogleMap, useLoadScript, MarkerF, Marker, InfoWindow } from "@react-google-maps/api";
import { useEffect } from "react";
// import { REACT_APP_GOOGLE_MAPS_KEY } from "../constants/constants";

const MapComponent = ({ redirectToGoogleMap, coordinates, onMarkerClick, selectedLocation, setMapAddress, enableClick, mapSize, zoom, title, image }) => {
    // const [address, setAddress] = useState({ lat: selectedLocation.lat, lon: selectedLocation.lng })
    const [selectedMarker, setSelectedMarker] = useState(null)
    const [showInfo, setShowInfo] = useState(true)

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDAm-Tbvhll6eYrRrthm42too-VSL4CVcY',
    });
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const handleMapClick = (event) => {
        if (enableClick == true) {
            if (enableClick && typeof onMarkerClick === 'function') {
                const lat = event.latLng.lat();
                const lng = event.latLng.lng();
                onMarkerClick({ lat, lng });
            }
        }
    };

    const onMarkerClickAction = (coordinate) => {
        if (enableClick == true) {
            onMarkerClick({ lat: coordinate.lat, lng: coordinate.lng })
        }
    }

    const handleMarkerClose = () => {

    }

    const handlePlaceSelect = (place) => {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setMapAddress({ lat, lng });
    };
    if (loadError) return "Error";
    if (!isLoaded) return "Maps";

    // Calculate the center of the map based on the coordinates
    let mapCenter = selectedLocation; // Default to the selectedLocation


    if (coordinates) {
        if (coordinates.length > 1) {
            // Calculate the center for multiple coordinates
            const bounds = new window.google.maps.LatLngBounds();
            coordinates.forEach((coordinate) => bounds.extend(coordinate));
            mapCenter = bounds.getCenter();
        }
    }



    const handleMarkerClickNew = (lat, lon) => {
        onMarkerClick({ lat: selectedLocation.lat, lng: selectedLocation.lng })
        setShowInfo(!showInfo)
        setSelectedMarker({ lat, lon });
    }

    const redirectToGoogleMaps = (lat, lon) => {
        if (redirectToGoogleMap) {
            // Construct Google Maps URL with the latitude and longitude
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;

            // Open Google Maps URL in a new window
            window.open(googleMapsUrl, "_blank");
        }
    }
    // console.log("sekected location", selectedLocation)
    // console.log("address", address)
    return (
        <div style={{ marginTop: "px" }}>
            <GoogleMap
                mapContainerStyle={{
                    height: `${mapSize}`,
                }}
                center={mapCenter}
                zoom={zoom}
                onLoad={onMapLoad}
                onClick={handleMapClick}
            >
                {coordinates
                    ? (
                        coordinates.map((coordinate, index) => (
                            <MarkerF
                                key={index}
                                position={coordinate}
                                icon={{
                                    url: "/images/icons/marker.png",
                                    scaledSize: new window.google.maps.Size(35, 42)
                                }}
                                onClick={() => onMarkerClickAction(coordinate)}
                            />
                        ))
                    )
                    : (
                        <MarkerF
                            onMouseOver={() => setShowInfo(true)}
                            // onMouseOut={() => setShowInfo(false)}
                            position={selectedLocation}
                            icon={{
                                url: "/images/icons/marker.png",
                                scaledSize: new window.google.maps.Size(35, 42)
                            }}
                            onClick={() => handleMarkerClickNew(selectedLocation.lat, selectedLocation.lng)}
                        >
                            <Marker>
                                {showInfo && (
                                    <InfoWindow
                                        position={selectedLocation}
                                        onCloseClick={handleMarkerClose}

                                    >
                                        <div onClick={() => redirectToGoogleMaps(selectedLocation.lat, selectedLocation.lng)} className="cursor-pointer flex justify-center align-middle items-center space-x-3">
                                            {/* Replace with your card component */}
                                            <img src={image} className="h-5 w-5" alt="Marker" style={{ width: '30px', height: 'auto' }} />
                                            <h3 className="dark:text-black">{title}</h3>
                                        </div>
                                    </InfoWindow>
                                )}
                            </Marker>
                        </MarkerF>
                    )
                }

            </GoogleMap>
        </div>
    );
};

export default MapComponent;
