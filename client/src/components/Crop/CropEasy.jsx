import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './utils/cropImage';

const CropEasy = ({ photoURL, setOpenCrop, setPhotoURL, setFile, onCropComplete }) => {
    //   const { setAlert, setLoading } = useAuth();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };


    const cropImage = async () => {
        // setLoading(true);
        try {
            const { file, url } = await getCroppedImg(
                photoURL,
                croppedAreaPixels,
                rotation
            );
            console.log(url)
            setPhotoURL(url);
            setFile(file);
            setOpenCrop(false);
            onCropComplete(url, file);
        } catch (error) {
            //   setAlert({
            //     isAlert: true,
            //     severity: 'error',
            //     message: error.message,
            //     timeout: 5000,
            //     location: 'modal',
            //   });
            console.log(error);
        }

        // setLoading(false);
    };

    return (
        <div className='flex'>
            <div
                className="bg-gray-800 relative h-96 overflow-hidden"
                style={{ width: 'auto', minWidth: '500px' }}
            >
                <Cropper
                    image={photoURL}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={1}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropChange={setCrop}
                    onCropComplete={cropComplete}
                />
            </div>
            <div className="flex flex-col mx-6 my-4 space-y-4">
                <div className="w-full mb-4">
                    <p>Zoom: {zoomPercent(zoom)}</p>
                    <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.1"
                        value={zoom}
                        onChange={(e) => setZoom(e.target.value)}
                    />
                </div>
                <div className="w-full mb-4">
                    <p>Rotation: {rotation + '°'}</p>
                    <input
                        type="range"
                        min="0"
                        max="360"
                        value={rotation}
                        onChange={(e) => setRotation(e.target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <button
                        className="border border-red-500 px-4 py-2 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition duration-300"
                        onClick={() => setOpenCrop(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600 transition duration-300"
                        type="button"
                        onClick={cropImage}
                    >
                        Crop
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CropEasy;

const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`;
};