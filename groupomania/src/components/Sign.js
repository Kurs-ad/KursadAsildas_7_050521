import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

function Sign(){
    const [inputValue, setInputValue] = useState(0)
    const [isOpen, setIsOpen] = useState(true)
    const userPlus = <FontAwesomeIcon icon={faUserPlus} />
    const userCircle = <FontAwesomeIcon icon={faUserCircle} />
    //useEffect()
    return  isOpen ? 
        <div>
            <button className='boutons' onClick={() => setIsOpen(true)}>
                {userCircle}<br/>Authentification
            </button>  
            <button className='boutons' onClick={() => setIsOpen(false)}>
                {userPlus}<br/>Inscription
            </button><br/>
            <label for="mail">Courriel<br/><input type="text" name="mail" id="mail" /></label><br/>
            <label for="password">Mot de passe<br/><input type="password" name="password" id="password" /></label><br/>
            <button className='boutons'>Accéder au réseau</button>
        </div>
    : <div>
        <button className='boutons' onClick={() => setIsOpen(true)}>
            {userCircle}<br/>Authentification
        </button>  
        <button className='boutons' onClick={() => setIsOpen(false)}>
            {userPlus}<br/>Inscription
        </button><br/>
        <label for="mail">Courriel<br/><input type="text" name="mail" id="mail" value={inputValue} onBlur={(e) => setInputValue(e.target.value)}/></label><br/>
        <label for="password">Mot de passe<br/><input type="password" name="password" id="password" /></label><br/>
        <label for="name">Nom (ou pseudo ;) )<br/><input type="text" name="name" id="name" /></label><br/>
        <label for="photo">Photo<br/><input type="file" accept="image/png image/jpg image/jpeg" name="photo" id="photo" /></label><br/>
        <button className='boutons'>S'inscrire au réseau</button>
    </div>
}

export default Sign