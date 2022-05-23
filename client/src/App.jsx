import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Hotel from './pages/Hotel';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels/:id' element={<Hotel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
