import { useState, useEffect } from 'react'

const Graph = () => {
    const [data, setData] = useState([]);

    const MAX_SIZE = 1000;
    const MAX_VALUE = 2500;
    const MIN_VALUE = 5;

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

    console.log(data);

    const dataItems = data.map((number, index) => 
        <div key={index}>
            {number}
        </div>
    )

    return (
        <div>
            {dataItems}
        </div>
    )
}

export default Graph;