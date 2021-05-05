import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandSpock } from '@fortawesome/free-solid-svg-icons'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import photo from "../assets/icon-above-font.png"

function Post(){
    const handSpock = <FontAwesomeIcon icon={faHandSpock} />
    const comments = <FontAwesomeIcon icon={faComments} />
    return <div className='post'>
        <div className='postHeader'>
            <div className='infosUtilisateur'>
                <img className='photoUtilisateur' src={photo} alt="photo de l'utilisateur"/>
                {/* {name}
                {post_date} */}
                Mon pseudo
            </div>
            <div className='datePost'>
                23/52/9528
            </div>
        </div>
        <div className='postMain'>
            {/* {text}
            {image} */}
            <div className='textMain'>dhihe aeifhiozeh fiofh iozfh hf uihf uihfoie</div>
            <div><img className='photoMain' src={photo} alt="image contenu"/></div>
        </div>
        <div className='postFooter'>
            <div>{handSpock}</div>
            <div>{comments} Commentaires</div>
        </div>
    </div>
}

export default Post