import React, { useState } from 'react';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const libraries = ['places'];

const AddVenueModal = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDAm-Tbvhll6eYrRrthm42too-VSL4CVcY', // Replace with your Google Maps API key
        libraries,
    });

    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

    const handleSelect = async (selectedAddress) => {
        setAddress(selectedAddress);

        try {
            const results = await geocodeByAddress(selectedAddress);
            const latLng = await getLatLng(results[0]);
            setCoordinates(latLng);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleMapClick = (e) => {
        setCoordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    };

    return (
        <div>
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search for an address',
                            })}
                        />
                        <div>
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                                const style = {
                                    backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                                };
                                return (
                                    <div {...getSuggestionItemProps(suggestion, { style })}>
                                        {suggestion.description}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>

            {isLoaded ? (
                <div style={{ height: '400px' }}>
                    <GoogleMap
                        center={coordinates}
                        zoom={15}
                        onClick={handleMapClick}
                    >
                        <Marker position={coordinates} />
                    </GoogleMap>
                </div>
            ) : (
                'Loading Google Maps...'
            )}
        </div>
    );
}

export default AddVenueModal