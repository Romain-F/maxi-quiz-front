import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './components/pages/Home';
import Game from './components/pages/Game';
import Quizzes from './components/pages/Quizzes';
import About from './components/pages/About';
import Quiz from './components/pages/Quiz';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li><Link to={'/'} className="nav-link"> Home </Link></li>
              <li><Link to={'/game'} className="nav-link">Jouer</Link></li>
              <li><Link to={'/quizzes'} className="nav-link">Créer un quiz</Link></li>
              <li><Link to={'/about'} className="nav-link">About</Link></li>
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/game' component={Game} />
            <Route path='/quizzes' component={Quizzes} />
            <Route path='/about' component={About} />
            <Route path={`/quiz/:quizId`} component={Quiz} />
          </Switch>       
     </div> 
    </BrowserRouter>
  );
}


export default App;
