import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons' 
import logoDesktop from '../assets/icon-left-font-monochrome-white.png'
import logoMobile from '../assets/monIconeMobile.png'
import NewPost from './NewPost'

function Banner({setPage, usersId, refresh, setRefresh}){
    const home = <FontAwesomeIcon icon={faHome} />
    const userCircle = <FontAwesomeIcon icon={faUserCircle} />
    return <div className="banniere">
        <img src={logoDesktop} alt="logo groupomania" className='logoDesktop' />
        <img src={logoMobile} alt="logo groupomania" className='logoMobile' />
        <NewPost refresh={refresh} setRefresh={setRefresh} usersId={usersId}/>
        <div className="icones_banniere">
            <div className="homeIcon" onClick={() => setPage("mainPage")}>
                {home}
            </div>
            <div className="userIcon" onClick={() => setPage("accountPage")}>
                {userCircle}
            </div>
        </div>
    </div>
}

export default Banner