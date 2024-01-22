import React, { useEffect, useRef, useState } from "react";
// import { REACT_APP_GOOGLE_MAPS_KEY } from "../constants/constants";

let autoComplete;

const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    // script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDAm-Tbvhll6eYrRrthm42too-VSL4CVcY&libraries=places"
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
};

const SearchLocationInput = ({ handleLocationSelect }) => {
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);

    const handleScriptLoad = (updateQuery, autoCompleteRef) => {
        autoComplete = new window.google.maps.places.Autocomplete(
            autoCompleteRef.current,
        );

        autoComplete.addListener("place_changed", () => {
            handlePlaceSelect(updateQuery);
        });
    };

    const handlePlaceSelect = async (updateQuery) => {
        const addressObject = await autoComplete.getPlace();

        console.log(addressObject)

        const query = addressObject.formatted_address;
        updateQuery(query);
        console.log({ query });

        const latLng = {
            lat: addressObject?.geometry?.location?.lat(),
            lng: addressObject?.geometry?.location?.lng(),
        };

        console.log({ latLng });
        handleLocationSelect(latLng);
    };

    useEffect(() => {
        handleScriptLoad(setQuery, autoCompleteRef)
    }, []);

    return (
        <div className="search-location-input">
            <label>Search Your location to view on map</label>
            <input
                ref={autoCompleteRef}
                className="w-full w-full p-2.5 text-xs bg-white dark:bg-[#454545] dark:text-white dark:border-0 dark:ring-0 md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Places ..."
                value={query}
            />
        </div>
    );
};

export default SearchLocationInput;
