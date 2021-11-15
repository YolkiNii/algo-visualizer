const Sorts = ({ data, onChange }) => {

    let scopeData = data;

    const changeBackground = (indicies, color) => {
        const newData = [...scopeData];

        for (let i = 0; i < indicies.length; i++) {
            newData[indicies[i]] = {...newData[indicies[i]], background: color};
        }

        scopeData = newData;
        onChange(newData);
    }

    const swap = (i, j) => {
        changeBackground([i, j], 'blue');

        return new Promise(resolve => {
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
            }, 500);

        });
    }

    const bubbleSort = async () => {
        let newData;
        for (let i = 0; i < scopeData.length - 1; i++) {
            for (let j = 0; j < scopeData.length - (i + 1); j++) {
                if (scopeData[j].value > scopeData[j + 1].value) {
                    newData = await swap(j, j + 1);
                    onChange(newData);
                }
            }
        }
    }

    const selectionSort = async () => {
        let newData;

        for (let i = 0; i < scopeData.length - 1; i++) {
            for (let j = i; j < scopeData.length; j++) {
                if (scopeData[j].value < scopeData[i].value)  {
                    newData = await swap(j, i);
                    onChange(newData);
                }
            }
        }
    }

    const insertionSort = async () => {
        let newData;

        for (let i = 1; i < scopeData.length; i++) {
            for (let j = 0; j < i; j++) {
                if (scopeData[i].value < scopeData[j].value) {
                    newData = await swap(i, j);
                    onChange(newData);
                }
            }
        }
    }

    const mergeSwap = (index, value) => {
        changeBackground([index], 'blue');

        return new Promise((resolve, reject) => {
            let newData = [...scopeData];

            newData[index] = {value: value, background: 'gray'};
            scopeData = newData;

            setTimeout(() => {
                resolve(newData);
            }, 500);
        })
    }

    // Reference: https://www.geeksforgeeks.org/iterative-merge-sort/
    const merge = async (left, middle, right) => {
        let newData;
        let leftArray;
        let rightArray;
        let leftIndex = 0;
        let rightIndex = 0;
        let mainIndex = left;

        // copy to left array and right array
        leftArray = scopeData.slice(left, middle + 1);
        rightArray = scopeData.slice(middle + 1, right + 1);
        console.log("In sub: " + left + " to " + right);
        changeBackground([right], 'red')

        // merge the two copy arrays
        while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
            if (leftArray[leftIndex].value < rightArray[rightIndex].value) {
                newData = await mergeSwap(mainIndex, leftArray[leftIndex].value);
                onChange(newData);
                leftIndex++;
                console.log("Merged: ", mainIndex);
            }
            else {
                newData = await mergeSwap(mainIndex, rightArray[rightIndex].value);
                onChange(newData);
                rightIndex++;
                console.log("Merged: ", mainIndex);
            }
            if (mainIndex === left)
                changeBackground([left], 'green');

            mainIndex++;
        }

        // get leftover from either array
        for (leftIndex; leftIndex < leftArray.length; leftIndex++) {
            newData = await mergeSwap(mainIndex, leftArray[leftIndex].value);
            onChange(newData);
            console.log("Merged: ", mainIndex);
            mainIndex++;
        }

        for (rightIndex; rightIndex < rightArray.length; rightIndex++) {
            newData = await mergeSwap(mainIndex, rightArray[rightIndex].value);
            onChange(newData);
            console.log("Merged: ", mainIndex);
            mainIndex++;
        }

        changeBackground([left], 'gray');
    }

    // Reference: https://www.geeksforgeeks.org/iterative-merge-sort/
    const mergeSort = async () => {
        let n = scopeData.length;
        let mergeSize = 0;
        let leftIndex = 0;
        let mid = 0;
        let rightEnd = 0;

        // bottom-up approach
        for (mergeSize = 1; mergeSize <= n - 1; mergeSize = 2 * mergeSize) {
            // find mid point for left and right arrays then merge
            for (leftIndex = 0; leftIndex < n - 1; leftIndex += 2 * mergeSize) {
                if (leftIndex + mergeSize - 1 < n - 1)
                    mid = leftIndex + mergeSize - 1;
                else
                    mid = n - 1;

                if (leftIndex + 2 * mergeSize - 1 < n - 1)
                    rightEnd = leftIndex + 2 * mergeSize - 1;
                else
                    rightEnd = n - 1;

                await merge(leftIndex, mid, rightEnd);
            }
        }
        
    }

    const quickChangeBackground = (indicies, background) => {
        return new Promise(resolve => {
            const copy = [...scopeData];

            for (let i = 0; i < indicies.length; i++)
                copy[indicies[i]] = {...copy[indicies[i]], background: background };

            scopeData = copy;

            onChange(copy);

            resolve();
        });

    }

    const quickSwap = (i, j) => {
        return new Promise(resolve => {
            setTimeout(() => {
                let temp;
                const copy = [...scopeData];

                copy[i] = {...copy[i], background: "gray"};
                copy[j] = {...copy[j], background: "gray"};
    
                temp = copy[i];
                copy[i] = copy[j];
                copy[j] = temp;

                scopeData = copy;

                onChange(copy);
                resolve();
            }, 1000);

        });

    }

    const quickEndSwap = (pivot, end) => {
        return new Promise(resolve => {
            setTimeout(() => {
                let temp;
                const copy = [...scopeData];

                copy[end] = {...copy[end], background: 'green'};
                copy[pivot] = {...copy[pivot], background: 'gray'};
    
                temp = copy[pivot];
                copy[pivot] = copy[end];
                copy[end] = temp;

                scopeData = copy;

                onChange(copy);

                resolve();
            }, 1000);
        })
    }

    const partition = async (start, end, dir, call) => {
        let left = start;
        let right = end;

        console.log('Before pivot:', end, ' dir:', dir, ' call:', call, ':', scopeData);

        await quickChangeBackground([end], 'red');

        // start from left and look for left > array[end]
        while (left < right) {
            while (scopeData[left].value < scopeData[end].value && left < right)
                left++;

            while (scopeData[right].value >= scopeData[end].value && right > left)
                right--;

            // check if left < right
            if(left < right) {
                await quickChangeBackground([left, right], 'blue');
                await quickSwap(left, right);
                left++;
                right--;
            }   
        }

        if (left === right && scopeData[left].value < scopeData[end].value)
            left++;

        // swap pivot with left
        await quickChangeBackground([left, end], 'blue');
        await quickEndSwap(left, end);

        console.log('After pivot:', left, ' dir:', dir, ' call:', call, ':', scopeData);

        return left;
    }

    /*
    Pivot will always be the end element
    Reference: https://www.geeksforgeeks.org/quick-sort/
    */
    const quickSort = async (start, end, dir, call) => {
        let pivotIndex;

        if (start < end) {
            // get pivot index
            pivotIndex = await partition(start, end, dir, call);

            // quicksort left and right partitions
            quickSort(start, pivotIndex - 1, "left", call + 1);
            quickSort(pivotIndex + 1, end, "right", call + 1);

        }
        else {
            quickChangeBackground([end], 'green');
        }
   
    }

    return (
        <div>
            <button onClick={() => bubbleSort()}>
                Bubble Sort
            </button>
            <button onClick={() => selectionSort()}>
                Selection Sort
            </button>
            <button onClick={() => insertionSort()}>
                Insertion Sort
            </button>
            <button onClick={() => mergeSort()}>
                Merge Sort (Iterative)
            </button>
            <button onClick={() => quickSort(0, scopeData.length - 1, "start", 0)}>
                Quick Sort
            </button>
        </div>
    )
}

export default Sorts;