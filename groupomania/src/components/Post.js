import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandSpock } from '@fortawesome/free-solid-svg-icons'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import photo from "../assets/icon-above-font.png"
import { useState } from 'react'
import AjaxRequest from './AjaxRequest'

function Post(){
  const [commentClosed, setComment] = useState(true);
    const handSpock = <FontAwesomeIcon icon={faHandSpock} />
    const comments = <FontAwesomeIcon icon={faComments} />
    let containt = commentClosed ? <div className='post'>
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
            <div  className='showComments' onClick={() => setComment(false)}>{comments} Commentaires</div>
        </div>
    </div>
    : <div className="post">
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
        <button className="stopComment" onClick={() => setComment(true)}>X</button>
        <div className="postComments">
            <input id="postInput" type="text" placeholder="Partagez vos pensées" />
        </div>
    </div>
    return <div>
        {/* <AjaxRequest url="http://localhost:3000/api/posts" /> */}
        {containt}
    </div>
}

export default Post