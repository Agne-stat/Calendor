import './App.css';
import Calendar from 'react-calendar';

function App() {
  function clickDay() {
    console.log("labas")
  }
  
  return (
    <div className="App">
      <Calendar onClickDay={clickDay}>
        
      </Calendar>
    </div>
  );
}

export default App;
