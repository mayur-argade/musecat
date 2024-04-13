import React from 'react';

const PopupBox = ({ data }) => {
    return (
        <a
            href="#"
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
            {data.photo && (
                <div>
                    <img
                        className="object-cover h-80 w-60 rounded-lg"
                        src={data.photo}
                        alt=""
                    />
                </div>
            )}
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {data.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {data.description}
                </p>
            </div>
        </a>
    );
};

export default PopupBox;
