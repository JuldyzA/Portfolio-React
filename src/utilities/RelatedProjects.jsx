import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import { restBase } from './Utilities'
import FeaturedImage from './FeaturedImage'

const RelatedProjects = ( {ids} ) => {
    // Update the restPath to query the Work post type
    // Only include posts that match the ids passed in: https://developer.wordpress.org/rest-api/reference/posts/#arguments
    // Make sure to get the featured image data too
    const restPath = restBase + ``
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])
    
    return (
        <>
        { isLoaded ?
            <section className="related-projects">
                <h2>Related Projects</h2>
                {/* 
                Map through the restData which should contain your 4 Work posts.
                Output the title and featured image of each post wrapped in an article tag.
                Use the provided component to output the featured image.
                After the Loop, add a link to the React app's Work page.
                */}
            </section>
        : 
            <Loading />
        }
        </>
    )

}

export default RelatedProjects
