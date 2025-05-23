import LogoTitle from '../../assets/images/logo-s.png'
import { Link } from 'react-router-dom'
import './index.scss'
import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Loader from 'react-loaders'

const Home=()=>{
    const[letterClass,setLetterClass] = useState('text-animate')
    const nameArray = ['h','y','a','n','i']
    const jobArray = ['D','a','t','a',' ','S','c','i','e','n','t','i','s','t.']
    
useEffect(() => {
    const timeoutId = setTimeout(() => {
        setLetterClass('text-animate-hover')
    }, 4000)

    return () => clearTimeout(timeoutId) 
}, [])

    
    return (
        <>
            <div className="container home-page">
            
                <div className="text-zone">
                    <h1>
                        <span className={letterClass}>H</span>
                        <span className={`${letterClass} _12`}>i,</span>
                    <br />
                    <span className={`${letterClass} _13`}>I</span>
                    <span className={`${letterClass} _14`}>'m</span>

                    <img src={LogoTitle} alt="developer" />
                    <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15} />

                    <br />
                    <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={20}  />
                    
                    </h1>
                    <h2>Data Scientist/Machine Learning Enthusiast</h2>
                    <Link to="/contact" className='flat-button'>CONTACT ME</Link>
                </div>
            </div>
            <Loader type="pacman" />
        </>
    )
}
export default Home