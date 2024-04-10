import React, { useState } from 'react'


const EditPopupMessage = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [photo, setPhoto] = useState('')

    function capturePhoto(e) {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file)
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                setPhoto(reader.result);
                console.log(reader.result);
            };
        }
    }

    async function submit() {

    }

    return (
        <section className='md:mt-12 flex bg-white drop-shadow-2xl rounded-md'>
            <div className='w-96 md:w-[1000px] rounded-md'>
                <div className="modal bg-white px-3 py-4">
                    <div className='space-y-4 max-h-auto  overflow-y-auto'>
                        <div className='text-left flex justify-start items-start align-middle'>
                            <p className='text-md font-bold'>Edit Modal</p>
                        </div>


                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="Title" id='Title'
                                value={title} onChange={(e) => setTitle(e.target.value)}
                                placeholder="Category Name" />
                        </div>
                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="description" id='description'
                                value={description} onChange={(e) => setDescription(e.target.value)}
                                placeholder="Category Name" />
                        </div>


                        <div className="flex items-center justify-center w-full">
                            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ">
                                <div className="flex flex-col items-center justify-center ">
                                    <img src="/images/icons/upload-image.svg" alt="" />
                                    <p className="text-xs">{selectedFile ? `Selected File: ${selectedFile.name}` : 'Upload Category Banner'}</p>
                                </div>
                                <input onChange={capturePhoto}
                                    id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div>

                        <div>
                            <button className="w-full py-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200" onClick={submit} >Create Category</button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditPopupMessage