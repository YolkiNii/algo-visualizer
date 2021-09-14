const Sorts = ({ data, onChange }) => {

    let scopeData = data;

    const changeBackground = (indicies) => {
        const newData = [...scopeData];

        for (let i = 0; i < indicies.length; i++) {
            newData[indicies[i]] = {...newData[indicies[i]], background: 'blue'};
        }

        scopeData = newData;
        onChange(scopeData);
    }

    const swap = (i, j) => {
        changeBackground([i, j]);

        return new Promise((resolve, reject) => {
            let newData = [...scopeData];
            let temp;


            newData[i] = {...newData[i], background: 'gray'};
            newData[j] = {...newData[j], background: 'gray'};
            temp = newData[i];
            newData[i] = newData[j];
            newData[j] = temp;

            scopeData = newData;

            setTimeout(() => {
                resolve(newData);
            }, 500)

        })
    }

    const bubbleSort = async () => {
        for (let i = 0; i < scopeData.length - 1; i++) {
            for (let j = 0; j < scopeData.length - (i + 1); j++) {
                if (scopeData[j].value > scopeData[j + 1].value) {
                    let newData = await swap(j, j + 1);
                    onChange(newData);
                }
            }
        }
    }

    return (
        <div>
            <button onClick={() => bubbleSort()}>
                Bubble Sort
            </button>
        </div>
    )
}

export default Sorts;