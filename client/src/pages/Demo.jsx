import React, { useState } from "react";
import MapComponent from "../components/GoogleMap/Map";
const Demo = () => {
    const [selectedLocation, setSelectedLocation] = useState({
        lat: 23.58371305879854,
        lng: 58.37132692337036,
    });

    return (
        <>
            <MapComponent selectedLocation={selectedLocation} />

        </>
    )
}

export default Demo