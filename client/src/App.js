import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import Landing from './components/Landing/Landing.jsx';
// import styles from './App.module.css';
import CreateActivity from './components/CreateActivity/CreateActivity.jsx';
import CountryDetail from './components/CountryDetail/CountryDetail.jsx';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/about" component={About}/>
        <Route exact path="/postActivity" component={CreateActivity} />
        <Route path="/countries/:id" component={CountryDetail}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
