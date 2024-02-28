import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import EventCard from '../../../../components/Cards/EventCard'
import SkeletonCard from '../../../../components/shared/skeletons/SkeletonCard'
import { getCategoryEvents } from '../../../../http'

const EditorsPick = () => {
    const [editorpick, setEditorpick] = useState('')
    const [editorpickLoading, setEditorpickLoading] = useState(false)

    useEffect(() => {
        const fetchdata = async () => {
            setEditorpickLoading(true)
            try {
                const categorydata = {
                    category: "editorspick",
                    query: `?search=${null}`,
                    filterdate: null
                }

                const { data } = await getCategoryEvents(categorydata, `?search=${null}`)
                // console.log(data.data)
                setEditorpick(data)
                setEditorpickLoading(false)
            } catch (error) {
                console.log(error)
                setEditorpickLoading(false)
            }
        }

        fetchdata()
    }, []);

    return (
        <div>
            {
                editorpick.data == null || editorpick.data == undefined
                    ?
                    <>
                    </>
                    :
                    editorpickLoading
                        ?
                        <section className='flex justify-center items-center align-middle mt-5'>
                            <section className='w-full md:w-full sm:mx-5 md:mx-5 md:w-10/12 xl:w-9/12 2xl:w-7/12'>
                                <div className='flex justify-between '>
                                    <div className="left"><span className='text-xl font-bold md:text-2xl md:font-[700]'>Editors Pick</span></div>
                                    <div className="right"></div>
                                </div>

                                <div>
                                    <div className='md:flex md:justify-start carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide space-x-3'>
                                        <>
                                            <div className='h-30'>
                                                <SkeletonCard />
                                            </div>
                                        </>
                                    </div>

                                </div>
                                <div className='flex justify-end space-x-2 '>
                                    <Link to="/category/editorspick">
                                        <p className='underline underline-offset-1 text-sm pr-2 '>view all</p>
                                    </Link>
                                </div>
                            </section>
                        </section>
                        :
                        editorpick.data.length === 0
                            ?
                            <>
                            </>
                            :
                            <section className='flex justify-center items-center align-middle mt-5'>
                                <section className='w-full md:w-full sm:mx-5 md:mx-5 md:w-10/12 xl:w-9/12 2xl:w-7/12'>
                                    <div className='flex justify-between '>
                                        <div className="left"><span className='text-xl font-bold md:text-2xl md:font-[700]'>Editors Pick</span></div>
                                        <div className="right"></div>
                                    </div>

                                    <div>
                                        <div className='md:flex md:justify-start carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide space-x-3'>
                                            {editorpickLoading
                                                ?
                                                <>
                                                    <div className='h-30'>
                                                        <SkeletonCard />
                                                    </div>
                                                </>
                                                : editorpick.data.length === 0
                                                    ?
                                                    <div className='flex justify-center'>
                                                        <img className='h-60' src="/images/assets/logo-main.png" alt="" />
                                                    </div>
                                                    :
                                                    editorpick.data.map((event) => (
                                                        <Link to={`/events/${event._id}`}>
                                                            <EventCard width={'w-52'} data={event} />
                                                        </Link>
                                                    ))
                                            }
                                        </div>

                                    </div>
                                    <div className='flex justify-end space-x-2 '>
                                        <Link to="/category/editorspick">
                                            <p className='underline underline-offset-1 text-sm pr-2 '>view all</p>
                                        </Link>
                                    </div>
                                </section>
                            </section>
            }

        </div>
    )
}

export default EditorsPick