import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
function App() {
  return (
    <main>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/landing" component={Landing} />
        <Route path="/" component={Login} />
      </Switch>
    </main>
  );
}

export default App;
