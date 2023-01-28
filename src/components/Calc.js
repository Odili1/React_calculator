import React, { useState } from 'react'

function Calc({buttons, total}) {
    let initialValue = [...buttons].reduce((acc, [key, ]) => {
        return acc = {...acc, [key]: {value: ''}, input: {value: 0}}
    }, {});
    // console.log(initialValue);

    const [initState, setState] = useState(initialValue);
    const [initTotal, setTotal] = useState(total)

    console.log(initTotal);
    
    const handleClick = (ev) => {
        const {value} = ev.target;
        console.log(typeof value);

        setState((prev) => {
            let inputValue = prev.input;

            const math = () => {
                let patternNum = /[0-9]/gi
                let arithSymbol = /[+-/x.]/gi
                let num;
                if (patternNum.test(value)){
                    num = +(`${inputValue.value}` + `${value}`);
                    setTotal((prev)=> [[...prev, value].join('')])
                    console.log(num);
                    return isNaN(num) ? +((`${inputValue.value}` + `${value}`).slice(-1)) : Math.abs(num)
                }

                if (arithSymbol.test(value)) {
                    setTotal((prev) => [...prev, (value=== 'x' ? '*' : value)])
                    return value === '.' ? inputValue.value + value : value
                }

                if (value === 'DEL') {
                    let stringNum = `${inputValue.value}`
                    let newNum = stringNum.slice(0, stringNum.length - 1);
                    setTotal((prev) => [newNum])
                    console.log(newNum);
                    return newNum;
                }

                if (value === 'RESET') {
                    setTotal((prev)=>[])
                    return 0;
                }

                if (value === '='){
                    let evaluate = eval(initTotal.join(''));
                    setTotal((prev)=>[])
                    return evaluate
                }

            }

            return ({
                ...prev,
                input: {
                    ...prev.input,
                    value: math()
                }
            })
        })
    }


  return (
    <div className='container'>
        <div className='calc-top'>
            <p className='calc'>calc</p>
            <div className='theme'>
                <p>THEME</p>
                <div className='level'>
                    <div className='num'>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                    </div>
                    <div className='theme-bar'>
                        <div className='switch'></div>
                    </div>
                </div>
            </div>
        </div>
        <div className='calc-input'>
            <input onChange={handleChange} name={'input'} type={'text'} value={initState.input.value}/>
        </div>
        <div className='calc-buttons'>
            {buttons.map(([classes, el]) => <button onClick={handleClick} name={classes} className={classes} value={el} >{el}</button>)}
        </div>
    </div>
  )
}

export default Calc