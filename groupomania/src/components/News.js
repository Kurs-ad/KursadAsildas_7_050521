import photo1 from '../assets/icon.png'
import photo2 from '../assets/icon-left-font.png'

function News(){
    return <div className='news'>
            <a className='article'>
                    <img className='articleImage' src={photo1} alt='photo1' />
                
                <div>
                    <h4 className='articleTitle'>
                        Du nouveau chez Groupomania !
                    </h4>
                    <p className='articleDescription'>
                        Nous vous présentons notre réseau social
                    </p>
                </div>
            </a>
            <a className='article'>
                    <img className='articleImage' src={photo2} alt='photo2' />
                
                <div>
                    <h4 className='articleTitle'>
                        La grande distribution, c'est quoi ?
                    </h4>
                    <p className='articleDescription'>
                        Tout connaître sur votre secteur d'activité
                    </p>
                </div>
            </a>
    </div>
}

export default News