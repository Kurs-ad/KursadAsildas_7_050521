import photo1 from '../assets/icon.png'
import photo2 from '../assets/icon-left-font.png'
import photoUser from '../assets/icon.png'

function TabletSideContent(){
    return <div className="tabletSideContent">
        <div className='newsTablet'>
            <a className='article'>
                    <img className='articleImage' src={photo1} alt='photo1' />
                
                <div className="articleDescription">
                    <h5 className='articleTitle'>
                        Du nouveau chez Groupomania !
                    </h5>
                    <p className='articleSubtitle'>
                        Nous vous présentons notre réseau social
                    </p>
                </div>
            </a>
            <a className='article'>
                    <img className='articleImage' src={photo2} alt='photo2' />
                
                <div className="articleDescription">
                    <h5 className='articleTitle'>
                        La grande distribution, c'est quoi ?
                    </h5>
                    <p className='articleSubtitle'>
                        Tout connaître sur votre secteur d'activité
                    </p>
                </div>
            </a>
        </div>
        <div className='friendsTablet'>
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
    </div>
}

export default TabletSideContent