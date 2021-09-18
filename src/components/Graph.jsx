import { useState, useEffect } from 'react'
import Sorts from './Sorts';

import "./styles/Graph.css"

const Graph = () => {
    const [data, setData] = useState([]);

    const MAX_SIZE = 10;
    const MAX_VALUE = 2500;
    const MIN_VALUE = 100;

    useEffect(() => {
        setData(generateData());
    }, [])

    /*
    Creates an array of objects with keys: value and background. Value is the number and background is the color.
    
    Returns: { value: int, background: string }
    */
    const generateData = () => {
        const data = new Array(MAX_SIZE);

        for (var i = 0; i < MAX_SIZE; i++) {
            data[i] = { value: Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE) + MIN_VALUE),
                        background: 'gray'
            };
        }

        return data;
    }

    const dataItems = data.map((datum, index) => 
        <div className='bar' key={index} style={{height: `${(datum.value / MAX_VALUE) * 500}px`, background: datum.background}}>
        </div>
    )

    return (
        <div>
            <div className='bars'>
                {dataItems}
            </div>
            <button className='gen-button' onClick={() => setData(generateData())}>
                Generate new Array
            </button>
            <Sorts data={data} onChange={setData} />
        </div>
    )
}

export default Graph;