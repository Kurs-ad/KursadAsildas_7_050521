import '../App.css';
import Banner from './Banner'
import Post from './Post'
import Sign from './Sign'
import News from './News'
import Friends from './Friends'
import Nav from './Nav'
import { useState } from 'react'
import TabletSideContent from './TabletSideContent';

function App() {
  const [isOpen, setIsOpen] = useState(true)
  return isOpen ? (
    <div className="App">
      <Banner />
      <Sign />
      <button className='boutons' onClick={() => setIsOpen(false)}>Connexion</button>
    </div> 
  )
  : <div className="App">
      <Banner />
      <div className='allContent'>
        <Friends />
        <Post />
        <News />
        <TabletSideContent />
      </div>
      <div className='allContentForMobile'>
        <Nav />
      </div>
  </div>
}

export default App;
