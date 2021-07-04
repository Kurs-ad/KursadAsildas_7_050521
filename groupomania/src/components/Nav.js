import { useState } from 'react'
import Post from './Post'
import News from './News'
import Friends from './Friends'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faIcons } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

function Nav() {
    const news = <FontAwesomeIcon icon={faNewspaper} />
    const posts = <FontAwesomeIcon icon={faIcons} />
    const amis = <FontAwesomeIcon icon={faUsers} />
    const [onglet, setIsOpen] = useState(0)

        if(onglet === 0){
            return <div>
                <div className="navMobile">
                <button>
                    {posts}
                </button>
                <button onClick={() => setIsOpen(1)}>
                    {news}
                </button>
                <button onClick={() => setIsOpen(2)}>
                    {amis}
                </button>
                </div>
                <Post />
        </div>
        } else if(onglet === 1){
            return <div>
                <div className="navMobile">
                    <button onClick={() => setIsOpen(0)}>
                        {posts}
                    </button>
                    <button>
                        {news}
                    </button>
                    <button onClick={() => setIsOpen(2)}>
                        {amis}
                    </button>
                </div>
                <News />
            </div>
        } else {
            return <div>
                <div className="navMobile">
                    <button onClick={() => setIsOpen(0)}>
                        {posts}
                    </button>
                    <button onClick={() => setIsOpen(1)}>
                        {news}
                    </button>
                    <button>
                        {amis}
                    </button>
                </div>
                <Friends />
            </div> 
    }
}

export default Nav