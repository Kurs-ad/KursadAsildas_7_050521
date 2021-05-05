import '../App.css';
import Banner from './Banner'
import Post from './Post'
import Sign from './Sign'
import News from './News'
import Friends from './Friends'

function App() {
  return (
    <div className="App">
      <Banner />
      <div className='allContent'>
        <Friends />
        <Post />
        <News />
      </div>
      <Sign />
    </div>
  );
}

export default App;
