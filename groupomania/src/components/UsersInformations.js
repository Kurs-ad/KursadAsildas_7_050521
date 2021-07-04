import UsersAccount from './UsersAccount'
import UsersPosts from './UsersPosts'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons' 

function UsersInformations({usersMail, usersId}){
    console.log(usersMail)
    console.log(usersId)
    const [isOpen, setIsOpen] = useState(true)
    const userCircle = <FontAwesomeIcon icon={faUserCircle} />
    return isOpen ? <div>
        <button disabled="true">My Account</button>
        <button onClick={() => setIsOpen(false)}>My Posts</button>
        <UsersAccount usersId={usersId} usersMail={usersMail}/>
        </div>
        : <div className="usersInformations">
            <button onClick={() => setIsOpen(true)}>My Account</button>
            <button disabled="true">My Posts</button>
            <UsersPosts usersId={usersId} usersMail={usersMail}/>
    </div>
}

export default UsersInformations