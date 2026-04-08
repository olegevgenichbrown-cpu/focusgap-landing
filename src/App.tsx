import { BrowserRouter as Router } from 'react-router-dom';
import Dispatcher from './variants/Dispatcher';

// Unified Multi-Variant App Entry
function App() {
  return (
    <Router>
      <Dispatcher />
    </Router>
  );
}

export default App;
