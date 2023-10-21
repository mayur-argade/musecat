import React, { useState, useEffect, useRef } from 'react';
import AddVenueModal from '../components/EditEventModal/AddVenueModal';
// import SearchLocationInput from '../components/GoogleMap/GooglePlcasesApi';
// import MapComponent from '../components/GoogleMap/Map';

const Demo = () => {
    // const [selectedLocation, setSelectedLocation] = useState({
    //     lat: 28.7041,
    //     lng: 77.1025,
    // });
    return (
        <>
            {/* <div style={{ height: "100vh", width: "100%" }}> */}
                {/* <SearchLocationInput setSelectedLocation={setSelectedLocation} />
                <MapComponent selectedLocation={selectedLocation} /> */}
            {/* </div> */}

            <AddVenueModal></AddVenueModal>
        </>
    )
}

export default Demo