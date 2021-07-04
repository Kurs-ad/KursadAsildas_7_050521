import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandSpock } from '@fortawesome/free-solid-svg-icons'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function UsersPosts({usersMail, usersId}){
    const handSpock = <FontAwesomeIcon icon={faHandSpock} />
    const comments = <FontAwesomeIcon icon={faComments} />
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [usersPosts, setUsersPosts] = useState([]);
console.log(usersPosts)
console.log(typeof usersId, usersId)
    useEffect(() => {
        fetch("http://localhost:3000/api/posts/"+usersId)
            .then(res => res.json())
            .then(
                (res) => {
                    console.log(typeof res, res.length, res)
                    setIsLoaded(true);
                    if(typeof res === "array"){
                        setUsersPosts(res);
                    } else {
                        setUsersPosts([res]);
                    }
                },
            // Remarque : il faut gérer les erreurs ici plutôt que dans
            // un bloc catch() afin que nous n’avalions pas les exceptions
            // dues à de véritables bugs dans les composants.
                (error) => {
                setIsLoaded(true);
                setError(error);
                }
            )
    }, []);
    //axios.get("http://localhost:3000/posts/"+usersId).then(res => {console.log(res); setUsersPosts(res); setIsLoaded(true)})

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        console.log(usersPosts)
        if(usersPosts.length > 0){
            return <div className="myAccount">
            <div className="allUsersPosts">
                {usersPosts[0].map(usersPost => (
                        <div className='post'>
                            <div className='postHeader'>
                                <div className='infosUtilisateur'>
                                    <img className='photoUtilisateur' src={usersPost.imageUrl} alt="utilisateur"/>
                                    {usersPost.pseudo}
                                </div>
                                <div className='datePost'>
                                    {usersPost.createdAt}
                                </div>
                            </div>
                            <div className='postMain'>
                                <div className='textMain'>
                                    {usersPost.text}
                                </div>
                                <div>
                                    <img className='photoMain' src={usersPost.imageUrl} alt="contenu"/>
                                </div>
                            </div>
                            <div className='postFooter'>
                                <div>{handSpock}</div>
                                <div  className='showComments' >{comments} Commentaires</div>
                            </div>
                        </div>
                    )
                )}  
                </div> 
        </div>
        } else {
            return <div>
                Aucun post pour le moment, mais vous pouvez en créer un en haut de page !
            </div>
        }
        
    }
}

export default UsersPosts