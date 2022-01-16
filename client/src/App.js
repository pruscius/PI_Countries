import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Landing from './components/Landing/Landing.jsx';
import CreateActivity from './components/CreateActivity/CreateActivity.jsx';
import CountryDetail from './components/CountryDetail/CountryDetail.jsx';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/postActivity" component={CreateActivity} />
        <Route path="/countries/:id" component={CountryDetail} />
        <Route path="/">
          <h1>404 Not Found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
