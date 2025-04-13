import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import AddCandidate from './components/AddCandidate';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/add-candidate' element={<AddCandidate />} />
      </Routes>
    </Router>
  );
}

export default App;
