import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/icon-left-font-monochrome-white.png'

function Banner(){
    const home = <FontAwesomeIcon icon={faHome} />
    const bell = <FontAwesomeIcon icon={faBell} />
    return <div className="banniere">
        <img src={logo} alt="logo groupomania" className='logo' />
        <input type="text" className='champs_de_recherche' />
        <div className="icones_banniere">
            {home} {bell}
        </div>
    </div>
}

export default Banner