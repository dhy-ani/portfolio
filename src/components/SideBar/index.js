import './index.scss'
import LogoS from '../../assests/images/logo-s.png'
import LogoSubtitle from '../../assests/images/logo-s.png'
const Sidebar = () => (
    <div className = 'nav-bar'>
        <Link className='logo' to='/'>
        <img src={LogoS} alt="logo" />
        <img className='subtitle' src={LogoSubtitle} alt="Soni" />
        </Link>
        <nav>
            <NavLink exact="true" activeclassname="active" to="/">
                <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="about-link" to="/about">
                <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="contact-link" to="/contact">
                <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
            </NavLink>
        </nav>
    </div>
)
export default Sidebar