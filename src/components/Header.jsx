
import { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Header.css'
import logo from '/LogoStarBg.jpg'

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToAbout = (e) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      // If not on home page, navigate to home page first
      navigate('/', { state: { scrollToAbout: true } });
    } else {
      // If already on home page, just scroll
      const aboutSection = document.querySelector('.about-section');
      if (aboutSection) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const aboutPosition = aboutSection.offsetTop - headerHeight;
        window.scrollTo({
          top: aboutPosition,
          behavior: 'smooth'
        });
      }
    }
  };
   // Scroll function to scroll to the top of the page
   const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This will make the scrolling smooth
    });
  };


  const [scrolling, setScrolling] = useState(false);

  // Function to check the scroll position
  const handleScroll = () => {
    if (window.scrollY > 80) {  
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };


  // Add scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  return (
    <header className="site-header">
      <div className="site-branding">
        <nav className="site-navigation">
          <ul>
            <li>
              <NavLink 
                to="/blog"
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                PROJECTS OLD
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/" 
                onClick={scrollToTop}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                <img src={logo} alt="Logo" />
              </NavLink>
            </li>

            <li>
              <a 
                href="#about" 
                onClick={scrollToAbout}
              >
                A B O U T
              </a>
            </li>
            <li>
              <NavLink
                to="/Projects">PROJECTS
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
