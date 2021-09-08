import ReactDOM from 'react-dom';
import { Btn1, Btn2 } from './../index';

function App() {
  return (
    <div>
      <Btn1>
        Hello Btn1
      </Btn1>
      <Btn2>
        Hello Btn2
      </Btn2>
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))

