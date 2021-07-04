import photoUser from '../assets/icon.png'
import { useState, useEffect } from 'react'

function Friends(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:3000/api/users/allUsers")
            .then(res => res.json())
            .then(
                (users) => {
                setIsLoaded(true);
                setUsers(users);
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
    

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
    return <div className='friends'>
        <ul>
            {users.map((user, index) => <li className="puceUser" key={`${user}-${index}`}>
                <img src={user.photo} alt={`photo de ${user.pseudo}`}/>
                {user.pseudo}
            </li>)}
        </ul>
    </div>
    }
}

export default Friends