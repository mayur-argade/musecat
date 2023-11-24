import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/shared/Sidebar/Sidebar'
import { GetAllCategory, AdminDeleteCategory } from '../../http'
import { Link } from 'react-router-dom'
import AddCategoryModel from '../../components/EditEventModal/AddCategoryModel'
import EditCategoryModel from '../../components/EditEventModal/EditCategoryModel'


const AdminCategory = () => {

    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)
    const [showAddCategory, setShowAddCategory] = useState(false)
    const [showEditCategory, setShowEditCategory] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleEditCategoryClick = (category) => {
        setSelectedCategory(category)
        setShowEditCategory(true)
    }
    const closeEditCategoryModel = () => {
        setShowEditCategory(false)
    }

    const handleCategoryClick = () => {
        setShowAddCategory(true)
    }

    const closeCategoryModel = () => {
        setShowAddCategory(false)
    }

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true)
            try {
                const res = await GetAllCategory()
                setCategory(res.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

        fetchCategory()

    }, []);

    const DeleteCategory = async (categoryId) => {
        try {
            const body = {
                categoryId: categoryId
            }
            const { data } = await AdminDeleteCategory(body)
            if (data.success == true) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error)
        }
    }

    if (category.data == null) {
        return (<div className='h-screen w-full flex justify-center align-middle items-center'>
            <img src="/images/icons/loadmain.svg" alt="" />
        </div>)
    } else {
        return (
            <div>
                <div className='flex '>

                    <div>
                        <Sidebar />
                    </div>

                    <div className='pl-20 flex flex-col w-full'>
                        <div className="mt-7"></div>
                        <div className="headline ">
                            <div className="heading">
                                <div className="flex justify-between">
                                    <span className="text-2xl font-semibold">Categories</span>
                                    <button onClick={() => handleCategoryClick()} className='px-1.5 py-1 bg-blue-800 text-sm text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-5'>Add Category</button>
                                </div>

                                <hr className='mt-3 mb-3' />

                                <div className="maincontent flex flex-col">
                                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" class="px-6 py-3">
                                                        Name
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        category URL
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        Sub Categories
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        Photo
                                                    </th>
                                                    <th scope="col" class="px-6 py-3">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    category.data.map((cat, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                {cat.name}
                                                            </td>
                                                            {/* </Link> */}
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                {cat.categoryURL}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                {cat.subCategories.map(subcategory => subcategory.name).join(', ')}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <a href={cat.photo} target="_blank" rel="noopener noreferrer">Link</a>
                                                            </td>
                                                            <td className="flex space-x-2 px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <button onClick={() => DeleteCategory(cat._id)} className="h-6 w-6">
                                                                    <img src="/images/icons/delete.png" alt="" />
                                                                </button>
                                                                <button onClick={() => handleEditCategoryClick(cat)} className="h-6 w-6">
                                                                    <img src="/images/icons/adminEdit.png" alt="" />
                                                                </button>
                                                            </td>
                                                        </tr>

                                                    ))
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {showAddCategory && (
                    <div className="fixed inset-0 flex justify-center z-50 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm">
                        <div className="relative my-auto w-11/12 xl:w-1/2">
                            <AddCategoryModel
                                isOpen={showAddCategory}
                                onClose={closeCategoryModel} />
                            {/* Close button */}
                            <button
                                onClick={closeCategoryModel}
                                className="absolute top-3 -right-5 m-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                            >
                                <img src="/images/icons/cancel-icon.png" alt="" />
                            </button>
                        </div>
                    </div>
                )
                }

                {showEditCategory && (
                    <div className="fixed inset-0 flex justify-center z-50 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm">
                        <div className="relative my-auto w-11/12 xl:w-1/2">
                            <EditCategoryModel
                                isOpen={showEditCategory}
                                onClose={closeEditCategoryModel}
                                data={selectedCategory}
                            />
                            {/* Close button */}
                            <button
                                onClick={closeEditCategoryModel}
                                className="absolute top-3 -right-5 m-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                            >
                                <img src="/images/icons/cancel-icon.png" alt="" />
                            </button>
                        </div>
                    </div>

                )}
            </div>
        )
    }
}

export default AdminCategory