import { useState, useEffect } from 'react'
import "./Slider.css"
import { restBase } from '../utilities/Utilities'
import { Link } from 'react-router-dom'
import Loading from '../utilities/Loading'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const Slider = () => {
    const restPath = restBase + 'posts?_embed'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if (response.ok) {
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
            
            <div className="slider-container">
                <title>{`Projects | Portfolio`}</title>
                {isLoaded ? (
                    <>
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay, EffectFade]}
                            effect={'fade'}
                            fadeEffect={{
                                crossFade: true
                            }}
                            slidesPerView={1}
                            navigation={true}
                            pagination={{
                                clickable: true,
                            }}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            className="mySwiper"
                        >
                            {restData.map((post) => (
                                <SwiperSlide key={post.id}>
                                    <div className="slide-content">
                                        {post._embedded && post._embedded['wp:featuredmedia'] && (
                                            <div className="slide-image">
                                                <img 
                                                    src={post._embedded['wp:featuredmedia'][0].source_url}
                                                    alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                                                />
                                            </div>
                                        )}
                                        <div className="slide-text">
                                            <h2>{post.title.rendered}</h2>
                                            <div className="slide-excerpt">
                                                {(() => {
                                                    const tempDiv = document.createElement('div');
                                                    tempDiv.innerHTML = post.excerpt.rendered; // Parse the HTML content
                                                    const h3Elements = tempDiv.querySelectorAll('h3'); // Get all <h3> elements
                                                    return Array.from(h3Elements).map((h3, index) => (
                                                        <h3 key={index}>{h3.innerHTML}</h3> // Render each <h3> tag
                                                    ));
                                                })()}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="more-info-container">
                            <Link to="/blog" className="more-info-button">
                                MORE INFO
                            </Link>
                        </div>
                    </>
                ) : (
                    <Loading />
                )}
            </div>
        </>
    )
}

export default Slider
