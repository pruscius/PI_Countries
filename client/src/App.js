import { Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import styles from './App.module.css';

function App() {
  return (
    <div>  
      <Switch>
        <Route exact path="/">
          <Link to="/home">
            <div className={styles.app}>
              <button>Home</button>
            </div>
          </Link>
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
