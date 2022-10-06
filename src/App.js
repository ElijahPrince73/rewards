import { useEffect, useState } from 'react';
import mockData from './data'

import './App.css';

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const stall = async (stallTime = 3000) => {
    await new Promise(resolve => setTimeout(resolve, stallTime));
  }

  useEffect( () => {
    const fetchData = async () => {
      await stall(3000)
      setLoading(false)
      setData(mockData)
    }
    fetchData()
  }, [])

  const calculateRewardPoints = (amount) => {
    if (amount >=50 && amount < 100) {
        return amount-50;
    } else if (amount >100){
        return (2*(amount-100) + 50);
    }
    return 0;
  }

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='users'>
          {data.map((user) => {
              return (
                <div>
                  <p>{user.username}</p>
                  <div className='transactions'>
                    {user.transactions.map(({amount, month}) => {
                      return (
                        <div className='transactions-item'>
                          <p>Month: {month}</p>
                          <p>Total: ${amount}</p>
                          <p>Reward Points: {calculateRewardPoints(amount)}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
        </div>
      </header>
    </div>
  );
}

export default App;
