import './App.css';
import { Routes, Route,} from 'react-router-dom';
import Login from './components/pages/Login';
import SignupIndex from './components/pages/SignupIndex';
import Homepage from './components/pages/Homepage';
import Forget from './components/pages/Forget';
import Userauth from './components/pages/Emailauth';
import ClientDashboard from './components/Dashboard/clientDashboard';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup/*' element={<SignupIndex/>}/>
      <Route path='/forget' element={<Forget />} />
      <Route path='/userauth' element={<Userauth />} />
      <Route path='/clientdashboard/*' element={<ClientDashboard /> } />
      </Routes>
  );
}

export default App;
