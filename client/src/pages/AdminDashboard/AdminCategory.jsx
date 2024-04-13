import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/shared/Sidebar/Sidebar'
import { GetAllCategory, AdminDeleteCategory } from '../../http'
import { Link } from 'react-router-dom'
import AddCategoryModel from '../../components/EditEventModal/AddCategoryModel'
import EditCategoryModel from '../../components/EditEventModal/EditCategoryModel'
import toast, { Toaster } from 'react-hot-toast';
import AdminNavbar from '../../components/shared/Navbar/AdminNavbar'

const AdminCategory = () => {

    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)
    const [showAddCategory, setShowAddCategory] = useState(false)
    const [showEditCategory, setShowEditCategory] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [refresh, setRefresh] = useState(false)

    const apiRefreshstate = () => {
        setRefresh(!refresh)
    }

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
        setRefresh(!refresh)
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

    }, [refresh]);

    const DeleteCategory = async (categoryId) => {
        const confirm = window.confirm("Are you sure you want to delete this category ?")

        if (confirm) {
            try {
                // Display a confirmation dialog
                const userConfirmed = window.confirm('Are you sure you want to delete this category?');

                if (!userConfirmed) {
                    // User canceled the deletion
                    return;
                }

                const body = {
                    categoryId: categoryId
                };

                // Use toast.promise to display a promise-based toast
                const promise = AdminDeleteCategory(body);
                const { data } = await toast.promise(promise, {
                    loading: 'Deleting Category...',
                    success: 'Category Deleted Successfully',
                    error: (error) => `Error: ${error.response.data.data}`,
                });

                // Refresh or update the UI as needed after successful deletion
                if (data.success === true) {
                    setRefresh(!refresh);
                }
            } catch (error) {
                console.error(error);
                // No need for a separate toast.error here; it's handled in the promise configuration
            }
        }
    };

    return (
        <div>
            <div className='flex '>

                <div className='z-10'>
                    <Sidebar />
                </div>
                <Toaster />
                <div className='pl-20 flex flex-col w-full'>
                    <div className='mx-4'>
                        <AdminNavbar />
                        <hr className='mb-3' />
                    </div>
                    <div className="headline ">
                        <div className="heading">
                            <div className="flex justify-between">
                                <span className="text-2xl font-semibold">Categories</span>
                                <button onClick={() => handleCategoryClick()} className='px-1.5 py-1 bg-blue-800 text-sm text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-5'>Add Category</button>
                            </div>

                            <hr className='mt-3 mb-3' />

                            <div className="z-10 mx-4 maincontent flex flex-col pb-20">
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
                                        {
                                            category.data == null
                                                ?
                                                <tbody>
                                                    <tr >
                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                            <div class="flex items-center justify-between">
                                                                <div>
                                                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        {/* </Link> */}
                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900 w-96">
                                                            <div class="flex items-center justify-between">
                                                                <div>
                                                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                            <div class="flex items-center justify-between">
                                                                <div>
                                                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                            <div class="flex items-center justify-between">
                                                                <div>
                                                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                </div>
                                                            </div>                                                        </td>
                                                        <td className="space-x-3 px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                            <div class="flex items-center justify-between">
                                                                <div>
                                                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                :

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
                                        }
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
                            onClose={closeCategoryModel}
                            apiRefreshstate={apiRefreshstate}
                        />
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
                            apiRefreshstate={apiRefreshstate}
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

export default AdminCategory