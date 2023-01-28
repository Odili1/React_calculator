import './App.css';
import Calc from './components/Calc';

function App() {
  const button = [
    ['seven', 7], ['eight', 8], ['nine', 9], ['del', 'DEL'], ['four', 4], ['five', 5], ['six', 6], ['plus', '+'], ['one', 1], 
    ['two', 2], ['three', 3], ['minus', '-'], ['dot', '.'],  ['zero', 0],['divide', '/'], ['times', 'x'], ['reset', 'RESET'], ['equal', '=']
  ]

  let total = []

  return (
    <>
      <Calc buttons={button} total={total}/>
    </>
  );
}

export default App;
