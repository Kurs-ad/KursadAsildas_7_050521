import photoUser from '../assets/icon.png'

function Friends(){
    return <div className='friends'>
        <ul>
            <li className='puceUser'>
                <img className='photoUser' src={photoUser} alt='photo user' />
                User 1
            </li>
            <li className='puceUser'>
                <img className='photoUser' src={photoUser} alt='photo user' />
                User 2
            </li>
            <li className='puceUser'>
                <img className='photoUser' src={photoUser} alt='photo user' />
                User 3
            </li>
            <li className='puceUser'>
                <img className='photoUser' src={photoUser} alt='photo user' />
                User 4
            </li>
        </ul>
    </div>
}

export default Friends