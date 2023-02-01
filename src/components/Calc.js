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
                    num = +(`${inputValue.value}${value}`);
                    setTotal((prev)=> [[...prev, value].join('')])
                    console.log(num);
                    return isNaN(num) ? ((`${inputValue.value} ${value}`)) : Math.abs(num)
                }

                if (arithSymbol.test(value)) {
                    setTotal((prev) => [...prev, (value=== 'x' ? '*' : value)])
                    return value === '.' ? inputValue.value + value : `${inputValue.value} ${value}`;
                }

                if (value === 'DEL') {
                    let stringNum = `${inputValue.value}`
                    let newNum = stringNum.slice(0, stringNum.length - 1);
                    setTotal((prev) => ((newNum.length === 0 && newNum.length) || [newNum]));
                    console.log(newNum.length);
                    return newNum.length === 0 ? 0 : newNum;
                }

                if (value === 'RESET') {
                    setTotal((prev)=>[])
                    return 0;
                }

                if (value === '='){
                    try{
                        // eslint-disable-next-line
                        let evaluate = eval(initTotal.join(''));
                        setTotal((prev)=>[`${evaluate}`])
                        return evaluate
                    }catch (err){
                        return 'SyntaxError'
                    }
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
            <input name={'input'} type={'text'} onChange={null} value={initState.input.value}/>
        </div>
        <div className='calc-buttons'>
            {buttons.map(([classes, el], id) => <button onClick={handleClick} name={classes} className={classes} key={id} value={el} >{el}</button>)}
        </div>
    </div>
  )
}

export default Calc
