
import { Route, Routes, Link, NavLink } from 'react-router-dom'
import ScrollToTop from './utilities/ScrollToTop'
import Home from './templates/Home'
import Posts from './templates/Posts'
import Post from './templates/Post'
import logo from '/LogoStarBg.jpg'
import Toolkits from './templates/Toolkits'
import Header from './components/Header'
import Projects from './templates/Projects'




function App() {
   // Scroll function to handle smooth scrolling
   const scrollToAbout = (e) => {
    e.preventDefault();
    // Look for the About section in the document
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
     <Header/>
      <main id="main">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blog' element={<Posts />} />
          <Route path='/blog/:slug' element={<Post />} />
          <Route path='/projects' element={<Projects />} /> 
        </Routes>       
      </main>
    </>
  )
}

export default App
