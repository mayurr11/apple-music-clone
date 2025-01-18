import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import MusicPlayer from './components/MusicPlayer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/player" element={<MusicPlayer />} />
      </Routes>
    </Router>
  );
};

export default App;
