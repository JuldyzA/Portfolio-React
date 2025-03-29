import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Loading from '../utilities/Loading';
import { restBase } from '../utilities/Utilities';
import "./Projects.css";

const Projects = () => {
    const restPath = restBase + 'fwd-projects?_embed&acf_format=standard';
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);

    const [activeIndex, setActiveIndex] = useState(0);

    //create scrollBar effect
    useEffect(()=>{
        const calculateScrollProgress = ()=>{
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollProgress = (window.scrollY / totalHeight) * 100;
            const progressBar = document.getElementById('progressBar');
            if (progressBar) {
                progressBar.style.height = `${scrollProgress}%`;
            }
        }
        window.addEventListener('scroll', calculateScrollProgress);
        calculateScrollProgress();
        //cleanup scrollBar effect
        return () => {
            window.removeEventListener('scroll', calculateScrollProgress);
        };
        
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();
                console.log('Fetched Data:', data); // Debugging: Log the fetched data
                setData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [restPath]);

    return (
        <div className="projects-page-swiper-container">
            <title>{`Projects | Portfolio`}</title>
            {isLoaded ? (
                <Swiper
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    modules={[EffectFade, Autoplay]}
                    effect={'fade'}
                    fadeEffect={{
                        crossFade: true
                    }}
                    autoplay={{
                        delay: 5500,
                        disableOnInteraction: false,
                    }}
                    className="projects-page-swiper"
                >
                    {restData.map((post, index) => (
                        <SwiperSlide 
                            key={post.id} 
                            className={`projects-page-slide ${index=== activeIndex ? 'projects-page-content-active' :''}`}>
                            {post._embedded && post._embedded['wp:featuredmedia'][0] ? (
                                <img 
                                    
                                    src={post._embedded['wp:featuredmedia'][0].source_url} 
                                    alt={post.title.rendered} 
                                />
                            ) : (
                                <div className="no-image-placeholder">No Image Available</div>
                            )}
                            
                            
                
                            
                            <div className="projects-page-content">
                                <div className="headings-container">
                                    <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }}></h1>
                                    {post.acf?.main_headings_h1 && (
                                        <h2>{post.acf.main_headings_h1}</h2>
                                    )}
                                    
        
                                </div>
        
                            </div>
                            <div>
                            <a className="more-details-button" href="#" style={{'--clr':'#4733daeb'}}><span>MORE ABOUT PROJECT</span><i></i></a>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default Projects;