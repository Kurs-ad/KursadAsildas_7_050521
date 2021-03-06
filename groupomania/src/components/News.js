import photo1 from '../assets/icon.png'
import photo2 from '../assets/icon-left-font.png'

function News(){
    return <div className='news'>
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
}

export default News