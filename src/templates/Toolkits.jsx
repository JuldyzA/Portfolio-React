import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'
import  './Toolkits.css'

const Toolkits= () => {
    const restPath = restBase + 'pages/111'
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
        <div className='toolkits'>
        { isLoaded ?
            <>
            <div className='toolkits-card'>
                <title>{`${restData.title.rendered} | Toolkits`}</title>
                <article id={`post-${restData.id}`}>
                    <h1>{restData.title.rendered}</h1>
                    <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                    </div>
                </article>
            </div>
            </>
        : 
            <Loading /> 
        }
        </div>            
    )
}

export default Toolkits
