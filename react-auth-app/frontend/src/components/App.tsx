import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" exact>
            <h1>Welcome to the Auth App</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;