import { useState, useEffect } from 'react'

import "./styles/Graph.css"

const Graph = () => {
    const [data, setData] = useState([]);

    const MAX_SIZE = 250;
    const MAX_VALUE = 2500;
    const MIN_VALUE = 100;

    useEffect(() => {
        setData(generateData());
    }, [])

    
    const generateData = () => {
        const data = new Array(MAX_SIZE);

        for (var i = 0; i < MAX_SIZE; i++) {
            data[i] = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE) + MIN_VALUE);
        }

        return data;
    }

    const dataItems = data.map((number, index) => 
        <div className='bar' key={index} style={{height: `${(number / MAX_VALUE) * 500}px`}}>
        </div>
    )

    return (
        <div className='bars'>
            {dataItems}
        </div>
    )
}

export default Graph;