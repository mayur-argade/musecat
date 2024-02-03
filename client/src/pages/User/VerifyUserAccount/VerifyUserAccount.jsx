import React, { useState } from 'react'
import { useEffect } from 'react'
import { ClienVerify } from '../../../http/index'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const VerifyUserAccount = () => {

    let { token } = useParams();
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const verifyUser = async () => {
            try {
                setLoading(true)
                const res = await ClienVerify(token)
                console.log(res)
                setMessage(res.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
        }
        verifyUser()
    }, [])

    if (loading) {
        return (
            <div className='h-screen w-full flex justify-center align-middle items-center'>
                <div class="relative flex justify-center items-center">
                    <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#C0A04C]"></div>
                    <img src="/images/logo/logo-main.png" class="h-16" />
                </div>
            </div>
        )
    } else {
        return (
            <div className="bg-green-50 min-h-screen flex items-center justify-center">
                <div className="bg-white p-16 rounded-lg shadow-lg">
                    <div className="bg-lime-200 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4">
                        <i className="text-white text-5xl">✓</i>
                    </div>
                    <h1 className="text-center text-green-600 font-semibold text-4xl mb-2">Success</h1>
                    <p className="text-gray-700 text-xl">
                        {message}
                    </p>
                    <Link className='flex justify-center mt-5' to='/login'>
                        <button type="button" class="text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800" >Sign in</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default VerifyUserAccount