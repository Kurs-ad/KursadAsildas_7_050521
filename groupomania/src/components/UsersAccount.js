import { useState, useEffect } from 'react'
import axios from 'axios'

function UsersAccount({usersMail}){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState([]);
    console.log(usersMail)
console.log(user, user.length)
    useEffect(() => {
        fetch("http://localhost:3000/api/users/oneUser/"+usersMail)
            .then(res => res.json())
            .then((res) => {
                let myUser = [res];
                console.log(myUser);
                setIsLoaded(true);
                setUser(myUser);
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
    //axios.get("http://localhost:3000/api/users/"+usersMail).then(res => {console.log(res)})

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        console.log(typeof user, user.length)
        return <div className="myAccount">
            {user.map((myUser, index)=> (<form key={`${index}`}>
                <label for="mail">Changer le courriel<br/>
                    <input type="text" name="mail" id="email" placeholder={usersMail}/>
                </label><br/>
                <label for="password">Changer le mot de passe<br/>
                    <input type="password" name="password" id="password" />
                </label><br/>
                <label for="name">Changer le pseudo<br/>
                    <input type="text" name="name" id="name" placeholder={myUser.pseudo}/>
                </label><br/>
                <label for="photo">Changer la photo<br/>{myUser.photo}<br/>
                    <input type="file" accept="image/png image/jpg image/jpeg" name="photo" id="photo" />
                </label><br/>
            </form>))}
        </div>
    }
}

export default UsersAccount