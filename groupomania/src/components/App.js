import '../App.css';
import { useState } from 'react'
import Banner from './Banner'
import Post from './Post'
import Sign from './Sign'
import News from './News'
import Friends from './Friends'
import Nav from './Nav'
import NewPost from './NewPost';
import GetAllPosts from '../ajax/allPosts';
import Logo from './Logo'
import UsersInformations from './UsersInformations';
import Footer from './Footer'

function App() {
  const [page, setPage] = useState("connectionPage");
  const [usersMail, setUsersMail] = useState([]);
  const [usersId, setUsersId] = useState(0);
  const [refresh, setRefresh] = useState(0);
  console.log(refresh)
  console.log(usersMail, usersId)
  if(page === "connectionPage"){
  return (
    <div className="App">
      <Logo />
      <Sign setUsersId={setUsersId} setUsersMail={setUsersMail} setPage={setPage}/>
      <button className='boutons' onClick={() => setPage("mainPage")}>Connexion</button>
    </div> 
  )
  } else if(page === "mainPage"){
    return <div className="App">
      <Banner refresh={refresh} setRefresh={setRefresh} usersId={usersId} setPage={setPage}/>
      <div className='allContent'>
        <Friends />
        <GetAllPosts usersId={usersId} refresh={refresh} />
        <News />
      </div>
      <div className='allContentForMobile'>
        <Nav />
      </div>
      <Footer />
  </div>
  } else if(page === "accountPage"){
    return <div className="App">
      <Banner setPage={setPage}/>
      <div className="usersInformations">
        <UsersInformations usersId={usersId} usersMail={usersMail} />
      </div>
      <Footer />
    </div>
  }
}

export default App;
