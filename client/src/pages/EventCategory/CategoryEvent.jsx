import React from 'react'
import { useParams } from 'react-router-dom';

const CategoryEvent = () => {
    const { category } = useParams();

    return (
        <div>
            <span>{category}</span>
        </div>
    )
}

export default CategoryEvent