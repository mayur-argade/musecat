import React, { useState } from 'react'
import { AdminCreateCategory } from '../../http/index'
import toast, { Toaster } from 'react-hot-toast';


const AddCategoryModel = ({ onClose }) => {

    const [name, setName] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [photo, setPhoto] = useState('')
    const [subCategories, setSubCategories] = useState('')
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)
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

        if (!name || !photo) {
            return toast.error("Category name and Photo are mandatory")
        }

        let subCategoriesArray = []
        if (subCategories.trim() === "") {
            subCategoriesArray = []
        }

        else {
            subCategoriesArray = subCategories.split(',').map(subcategory => subcategory.trim())
        }
        const categorydata = {
            name: name,
            photo: photo,
            subCategories: subCategoriesArray
        }

        // console.log(signupdata)
        try {
            setLoading(true)
            const { data } = await AdminCreateCategory(categorydata)

            console.log(data)

            setLoading(false)
            if (data.success == true) {
                setDone(true)
                toast.success("Category Added")
                onClose(); //
            }
            // window.location.reload()
        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error(error.response.data.data)
        }
    }

    return (
        <div>
            <div>
                <Toaster />
                <div>
                    {
                        !loading
                            ?
                            <section className='md:mt-12 flex bg-white drop-shadow-2xl rounded-md'>
                                <div className='w-96 md:w-[1000px] rounded-md'>
                                    <div className="modal bg-white px-3 py-4">
                                        <div className='space-y-4 max-h-auto  overflow-y-auto'>
                                            <div className='text-left flex justify-start items-start align-middle'>
                                                <p className='text-md font-bold'>Add Category </p>
                                            </div>


                                            <div>
                                                <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="firstname" id='firstname'
                                                    value={name} onChange={(e) => setName(e.target.value)}
                                                    placeholder="Category Name" />
                                            </div>
                                            <div>
                                                <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="firstname" id='firstname'
                                                    value={subCategories} onChange={(e) => setSubCategories(e.target.value)}
                                                    placeholder="subcategory1, subcategory2, subcategory3" />
                                                <label className='text-xss' htmlFor="subcategories">separate your Sub-Category Names with a Comma</label>
                                            </div>


                                            <div className="flex items-center justify-center w-full">
                                                <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div className="flex flex-col items-center justify-center ">
                                                        <img src="/images/icons/upload-image.svg" alt="" />
                                                        <p className="text-xs">{selectedFile ? `Selected File: ${selectedFile.name}` : 'Upload Category Banner'}</p>
                                                    </div>
                                                    <input onChange={capturePhoto}
                                                        id="dropzone-file" type="file" className="hidden" />
                                                </label>
                                            </div>

                                            <div>
                                                <button className="w-full py-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200" onClick={submit} >createCategory</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>
                            :
                            done
                                ?
                                <div className="h-screen w-full flex justify-center align-middle items-center">
                                    <img src="/images/icons/done.png" alt="" />
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

export default AddCategoryModel