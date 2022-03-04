import logo from './jolimoi-logo.jpg'; 
import './App.css';
import { useState, useEffect }  from 'react';

const SERVER = 'http://localhost:5000'

function App() {
  const [ number, setNumber ] = useState('')
  const [ error, setError ] = useState(undefined)
  const [ romanNumberXHR, setRomanNumberXHR ] = useState('')
  const [ romanNumberSSE, setRomanNumberSSE ] = useState('')
  const [ listening, setListening ] = useState(false);

  useEffect( () => {
    if (!listening) {
      const source = new EventSource(`${SERVER}/sse`);
      
      source.addEventListener('open', (event) => {
        setListening(true);
      });

      source.addEventListener('close', (event) => {
        setListening(false);
        setRomanNumberSSE('')
        setNumber('')
      });

      source.onmessage = (event) => {
        if(event.data !== 'undefined'){
          let resp = JSON.parse(event.data)
          setRomanNumberSSE(resp.data)
        }
      };

      source.addEventListener('error', (event) => {
        if (event.readyState === EventSource.CLOSED) {
          setListening(false);
        }
      })
    }
  }, [listening, number]);

  const handleOnclick = (type) => {
    setError(undefined)
    setRomanNumberXHR('')
    if(type==='xhr'){
      getRomanNumeral('getRomanNumberXHR', number)
    }
    if(type==='sse'){
      getRomanNumeral('getRomanNumberSSE', number)
    }
  }

  const getRomanNumeral = async (route, params) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', SERVER+'/'+route+'?number='+params);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        let resp = JSON.parse(xhr.responseText)
        console.log(resp)
        if(xhr.status !== 200){
          setError(resp.error)
        } else {
          setRomanNumberXHR(resp.data);
        }
      }
    }
    xhr.send();
  }

  return (
    <div className="App">
      <img className='logo' src={logo} alt='jolimoi-logo'/>
      <div className='result'>
        <div className='roman-number'>
          XHR: {romanNumberXHR}
        </div>
        <div className='roman-number'>
          SSE: {romanNumberSSE}
        </div>
      </div>
      <input className='number-input' placeholder='Input any number' value={number} onChange={(event) => setNumber(event.target.value)}/>
      <button className='submit-btn' onClick={() => handleOnclick('xhr')}>
        Submit
      </button>
      <div className='error-msg'>
        {error}
      </div>
      <div className='status'>
        SSE status {
          listening ?
          <span className='sse-connected'>{'\u25CF'}</span>
          :
          <span className='sse-deconnected'>{'\u25CF'}</span>
        }
      </div>
    </div>
  );
}

export default App;
