import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import LoadsListPage from './pages/LoadsListPage';
import LoadDetailPage from './pages/LoadDetailPage';
import HandlerProfilePage from './pages/HandlerProfilePage';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={ <HomePage /> }
      />
      <Route
          path="/loads"
          element={ <LoadsListPage /> } 
        />
      <Route
          path="/loads/:loadId"
          element={  <LoadDetailPage />  }
        />
      <Route
          path="/handler"
          element={ <HandlerProfilePage /> }
        />
      <Route path="/signup" element={ <SignupPage /> } />
      <Route path="/login" element={ <LoginPage /> } />
      </Routes>
    </div>
  );
}

export default App;
