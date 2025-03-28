import { useState, useEffect, useRef } from 'react';
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'
import About from './About'
import './Home.css'
import AOS from "aos"
import "aos/dist/aos.css"
import Toolkits from './Toolkits'
import * as THREE from 'three'
import FOG from "vanta/dist/vanta.fog.min";
import Slider from './Slider'


const Home = () => {

    const restPath = restBase + 'pages/42'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)
    const [vantaEffect, setVantaEffect] = useState(null)
    const vantaRef = useRef(null)
    
    const [currentH2Index, setCurrentH2Index] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [h2Contents, setH2Contents] = useState([]);

    // Vanta.js effect
    useEffect(() => {
        if (!vantaEffect && vantaRef.current) {
            setVantaEffect(
                FOG({
                    el: vantaRef.current,
                    THREE: THREE,
                    // mouseControls: true,
                    // touchControls: true,
                    // gyroControls: false,
                    // minHeight: window.innerHeight, // Changed back to single viewport height
                    // minWidth: window.innerWidth,
                    // baseColor: 0x0,
                    // backgroundColor: 0x0,
                    // amplitudeFactor: 0.70,
                    // xOffset: 0.0,
                    // yOffset: 0.0,
                    // size: 2,
                    // speedValue: 0.1,
                    // rings: 4,
                    // scale: 1.0,
                    // scaleMobile: 1.0,
                    // mouseEase: true,
                    // mouseFactor: 0.6,
                    // mouseCoeffX: 2,
                    // mouseCoeffY: 2,
                    // wingSpan: 10.0,
                    // waveHeight: 0.5,
                    // waveSpeed: 0.1,
                    // zoom: 0.65

                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    lowlightColor: 0x2d00ff,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    highlightColor: 0xffc300,
                    baseColor: 0xeddbdb,
                    midtoneColor: 0xff00e0,

                    blurFactor: 0.74,
                    speed: 1.5,
                    zoom: 0.3,
                })
            )
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])

    // AOS initialization
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            offset: 100,
            mirror: true,
            anchorPlacement: 'top-bottom'
        })
    }, [])

    // this is to refresh AOS on scroll
    useEffect(() => {
        window.addEventListener('scroll', () => {
            AOS.refresh();
        });

        return () => {
            window.removeEventListener('scroll', () => {
                AOS.refresh();
            });
        };
    }, []);

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if (response.ok) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)

                // Extract h2 elements from the content
                const tempDiv = document.createElement('div')
                tempDiv.innerHTML = data.content.rendered
                
                // Extract h1 if present
                const h1s = Array.from(tempDiv.getElementsByTagName('h1'))
                if (h1s.length > 0) {
                    // Update title if h1 exists in content
                    data.title.rendered = h1s[0].innerHTML
                }

                //Extract h2s
                const h2s = Array.from(tempDiv.getElementsByTagName('h2'))
                                .map(h2 => h2.innerHTML)
                if (h2s.length > 0) {
                    setH2Contents(h2s)
                }

            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])

      // H2 animation interval
      useEffect(() => {
        if (h2Contents.length <= 1) return;

        const intervalId = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentH2Index((prevIndex) => 
                    prevIndex === h2Contents.length - 1 ? 0 : prevIndex + 1
                );
                setIsAnimating(false);
            }, 500);
        }, 6000);

        return () => clearInterval(intervalId);
    }, [h2Contents]);

    return (
        <div className="home-root">
            {/* Home Section */}
            <div className="section home-section">
                <div ref={vantaRef} className="vanta-layer"></div>
                {/* <div className="overlay-layer"></div> */}
                <div className="content-layer">
                    {isLoaded ? (
                        <>
                            <title>{`${restData.title.rendered} | Portfolio`}</title>
                            <div className="hero-content">
                                {h2Contents.length > 0 && (
                                    <h2 
                                        className={`animated-h2 ${isAnimating ? 'fade-out' : 'fade-in'}
                                        color-${currentH2Index % 4}`}
                                        data-aos-delay="1000"
                                        dangerouslySetInnerHTML={{ 
                                            __html: h2Contents[currentH2Index] 
                                        }}
                                    />
                                )}
                            </div>
                        </>
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>

            {/* About Section */}
            <div id="about" className="section about-section" data-aos="fade-up" data-aos-delay="1000">
                
                <About />
            </div>
            
            {/* {Project Slider Pojects} */}
            <div className='section projects-section'>
                <Slider />
            </div>
            {/* Toolkits Section */}
            <div className="section toolkits-section" data-aos="fade-left" data-aos-delay="1000">
                <Toolkits />
            </div>

            {}
        </div>
    )
}

export default Home
