import { Routes, Route } from 'react-router-dom';
import Explore from './pages/Explore';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Explore />}/>
    </Routes>
  );
}

export default App;
