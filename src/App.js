import './App.css';
import { Routes, Route, } from 'react-router-dom';
import Login from './components/pages/Login';
import SignupIndex from './components/pages/SignupIndex';
import Homepage from './components/pages/Homepage';
import Forget from './components/pages/Forget';
import Userauth from './components/pages/Emailauth';
import Alert from './components/layouts/Alert';

function App() {
  return (
    <section className="container">
      {/* <Alert /> */}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup/*' element={<SignupIndex />} />
        <Route path='/forget' element={<Forget />} />
        <Route path='/verifyemail' element={<Userauth />} />
      </Routes>
    </section>

  );
}

export default App;