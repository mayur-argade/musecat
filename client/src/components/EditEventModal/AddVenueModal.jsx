import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import SearchLocationInput from '../GoogleMap/GooglePlcasesApi';
import MapComponent from '../GoogleMap/Map';
import { VendorCreateVenue } from '../../http/index'
import Tooltip from '../shared/Tooltip/Tooltip'

const AddVenueModal = ({ onClose, verified, message }) => {
    const [selectedLocation, setSelectedLocation] = useState({
        lat: 23.58371305879854,
        lng: 58.37132692337036,
    });

    const [verifiedValue, setVerfiedValue] = useState(verified)
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [mapAddress, setMapAddress] = useState({
        lat: null,
        lng: null
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
            return toast.error("name field is mandatory")
        } else if (!address) {
            return toast.error("Address Field is mandatory")
        } else if (!banner) {
            return toast.error("Banner image is mandatory")
        } else if (mapAddress.lat == null || mapAddress.lng == null) {
            return toast.error("Map coordinates are mandatory, Click on location to select address")
        } else {
            try {
                const venuedata = {
                    name: name,
                    photo: banner,
                    address: address,
                    mapAddress: mapAddress,
                    verified: verifiedValue ? verifiedValue : false
                }
                setLoading(true)
                console.log(venuedata)
                const { data } = await VendorCreateVenue(venuedata)
                setLoading(false)
                console.log(data)
                toast.success(message)
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
 
            <div>
                <div>
                    {
                        !loading
                            ?
                            <div className="modal bg-white dark:bg-[#2c2c2c] px-3 py-4">
                                <div className='space-y-4 max-h-auto  overflow-y-auto'>
                                    <div className='text-left flex justify-start items-start align-middle'>
                                        <p className='text-md font-bold'>Add Venue </p>
                                    </div>


                                    <div>
                                        <input className="w-full p-2.5 text-xs bg-white dark:bg-[#454545] dark:text-white dark:border-0 dark:ring-0 md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="firstname" id='firstname'
                                            value={name} onChange={(e) => setName(e.target.value)}
                                            placeholder="Venue Name" />
                                    </div>

                                    <div>
                                        <input className="w-full p-2.5 text-xs bg-white dark:bg-[#454545] dark:text-white dark:border-0 dark:ring-0 md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="firstname" id='firstname'
                                            value={address} onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Venue short description" />
                                    </div>

                                    <div className="flex items-center justify-center w-full">
                                        <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-[#454545] hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                                        <MapComponent onMarkerClick={setMapAddress} selectedLocation={selectedLocation} setMapAddress={setMapAddress} enableClick={true} mapSize={"300px"} zoom={13} />
                                    </div>


                                    <div>
                                        <button className="w-full py-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200" onClick={submit} >Add Venue</button>
                                    </div>

                                </div>
                            </div>
                            :
                            <div className='h-screen w-full flex justify-center align-middle items-center'>
                                <div class="relative flex justify-center items-center">
                                    <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#C0A04C]"></div>
                                    <img src="/images/logo/logo-main.png" class="h-16" />
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default AddVenueModal