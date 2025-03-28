import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'
import  './About.css'

const About = () => {
    const restPath = restBase + 'pages/107'
    const [restData, setData] = useState([])
    const [contentImages, setContentImages] = useState([])
    const [textContent, setTextContent] = useState('')
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if (response.ok) {
                const data = await response.json()
                
                // Create a temporary div to parse the HTML content
                const tempDiv = document.createElement('div')
                tempDiv.innerHTML = data.content.rendered

                // Extract all figures/images
                const figures = tempDiv.getElementsByTagName('figure')
                setContentImages(Array.from(figures))

                // Remove figures from content
                Array.from(figures).forEach(figure => figure.remove())
                
                // Get remaining text content
                setTextContent(tempDiv.innerHTML)
                
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])
    
    return (
        <div className='about'>
        { isLoaded ?
            <div className='about-card'>
                <title>{`${restData.title.rendered} | Portfolio`}</title>
                <article id={`post-${restData.id}`}>
                    
                        
                            <h1>{restData.title.rendered}</h1>
                            <div className="about-content-wrapper">
                            
                                <div className="about-images">
                                {contentImages.map((figure, index) => (
                                    <div key={index} dangerouslySetInnerHTML={{__html: figure.outerHTML}} />
                                ))}
                                </div>
                                <div className="about-me-content" dangerouslySetInnerHTML={{__html: textContent}}>
                                </div>
                            </div>
                       
                    
                </article>
            </div>
        : 
            <Loading /> 
        }
        </div>            
    )
}

export default About
