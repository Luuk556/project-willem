import logo from './logo.svg';
import './App.css';
import Login from './screens/Login/Login';
import CalendarScreen from './screens/calendar/calendar-screen.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CalendarScreen />
      </header>
    </div>
  );
}

export default App;
