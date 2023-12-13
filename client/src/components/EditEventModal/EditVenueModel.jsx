import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import SearchLocationInput from '../GoogleMap/GooglePlcasesApi';
import MapComponent from '../GoogleMap/Map';
import { AdminEditVenue } from '../../http/index'
import Tooltip from '../shared/Tooltip/Tooltip'

const EditVenueModel = ({ data, onClose, apiRefreshstate }) => {

    const [selectedLocation, setSelectedLocation] = useState({
        lat: data.coordinates.lat,
        lng: data.coordinates.lng,
    });

    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(data.name)
    const [address, setAddress] = useState(data.address)
    const [mapAddress, setMapAddress] = useState({
        lat: data.coordinates.lat,
        lng: data.coordinates.lng
    })

    const [banner, setBanner] = useState('')

    function capturePhoto(e) {
        const file = e.target.files[0];
        setSelectedFile(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setBanner(reader.result);
            console.log(reader.result);
        };
    }

    const handleLocationSelect = (location) => {
        console.log("Setting up location", location)
        setSelectedLocation({
            lat: location.lat,
            lng: location.lng
        })
        setMapAddress({
            lat: location.lat,
            lng: location.lng
        })
    }

    async function submit() {
        if (!name) {
            toast.error("name field is mandatory")
        } else if (!address) {
            toast.error("Address Field is mandatory")
        } else if (!mapAddress) {
            toast.error("Map coordinates are mandatory")
        } else {
            try {
                const venuedata = {
                    _id: data._id,
                    name: name,
                    photo: banner,
                    address: address,
                    mapAddress: mapAddress
                }

                setLoading(true)
                console.log(venuedata)
                const response = await AdminEditVenue(venuedata)
                console.log("api response -->", response)
                setLoading(false)
                console.log(data)
                if (response.data.success == true) {
                    toast.success("Venue updated Successfully")
                }
                apiRefreshstate(true)
                onClose(); //
            } catch (error) {
                setLoading(false)
                console.log(error)
                // toast.error(error.response.data.data)
                onClose(); //
            }

        }


    }

    return (
        <div>
            <Toaster />
            <div>
                <div>
                    {
                        !loading
                            ?
                            <div className="modal bg-white px-3 py-4">
                                <div className='space-y-4 max-h-auto  overflow-y-auto'>
                                    <div className='text-left flex justify-start items-start align-middle'>
                                        <p className='text-md font-bold'>Edit Venue </p>
                                    </div>


                                    <div>
                                        <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="firstname" id='firstname'
                                            value={name} onChange={(e) => setName(e.target.value)}
                                            placeholder="Venue Name" />
                                    </div>

                                    <div>
                                        <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="firstname" id='firstname'
                                            value={address} onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Venue short description" />
                                    </div>

                                    <div className="flex items-center justify-center w-full">
                                        <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div className="flex flex-col items-center justify-center ">
                                                <img src="/images/icons/upload-image.svg" alt="" />
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {selectedFile ? `Selected File: ${selectedFile.name}` : 'Upload Venue Banner'}
                                                </p>
                                            </div>
                                            <input onChange={capturePhoto}
                                                id="dropzone-file" type="file" className="hidden" />
                                        </label>
                                    </div>
                                    {/* <span>
                                        lat = {mapAddress.lat}
                                    </span>
                                    <span>
                                        lng = {mapAddress.lng}
                                    </span> */}

                                    <div>
                                        <SearchLocationInput handleLocationSelect={handleLocationSelect} />
                                        <MapComponent selectedLocation={selectedLocation} setMapAddress={setMapAddress} enableClick={true} mapSize={"300px"} zoom={13} />
                                    </div>


                                    <div>
                                        <button className="w-full py-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200" onClick={submit} >Add Venue</button>
                                    </div>

                                </div>
                            </div>
                            :
                            <div className="h-screen w-full flex justify-center align-middle items-center">
                                <img src="/images/icons/loading.svg" alt="" />
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default EditVenueModel