import LogoTitle from '../../assets/images/logo-s.png'
import { Link } from 'react-router-dom'
import './index.scss'
import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import Loader from 'react-loaders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact } from '@fortawesome/free-brands-svg-icons/faReact'
import { faPython } from '@fortawesome/free-brands-svg-icons/faPython'
import { faJava } from '@fortawesome/free-brands-svg-icons/faJava'
import { faCss3 } from '@fortawesome/free-brands-svg-icons'
import { faGit } from '@fortawesome/free-brands-svg-icons/faGit'
import { faDocker } from '@fortawesome/free-brands-svg-icons/faDocker'

const Home=()=>{
    const[letterClass,setLetterClass] = useState('text-animate')
    const nameArray = ['h','y','a','n','i']
    const jobArray = [['T','u','r','n','i','n','g',' ','D','a','t','a',' ','i','n','t','o',' ','R','e','a','l','-','W','o','r','l','d',' ','S','o','l','u','t','i','o','n','s']
]
    
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

                    <span class="logo-letter"><img src={LogoTitle} alt="developer" /></span>
                    <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15} />

                    <br />
                    <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={20}  />
                    
                    </h1>
                    <h2>Crafting AI powered Experiences.</h2>
                    <a
                        href="/portfolio/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flat-button"
                        >
                        GO TO MY RESUME
                    </a>

                    <Link to="/contact" className='flat-button'>CONTACT ME</Link>

                </div>
                <div className ='stage-cube-cont'>
                    <div className ='cubespinner'>
                        <div className='face1'>
                            <FontAwesomeIcon icon ={faReact} color='#DD0031'/>
                        </div>

                        <div className='face2'>
                            <FontAwesomeIcon icon ={faPython} color='#F06529'/>
                        </div>

                        <div className='face3'>
                            <FontAwesomeIcon icon ={faJava} color='#28A4D9'/>
                        </div>
                        
                        <div className='face4'>
                            <FontAwesomeIcon icon ={faCss3} color='#5ED4F4'/>
                        </div>
                                                
                        <div className='face5'>
                            <FontAwesomeIcon icon ={faDocker} color='#EFD81D'/>
                        </div>
                                                
                        <div className='face6'>
                            <FontAwesomeIcon icon ={faGit} color='#EC4D28'/>
                        </div>
                                            

                    </div>

                </div>
            </div>
            <Loader type="pacman" />
        </>
    )
}
export default Home