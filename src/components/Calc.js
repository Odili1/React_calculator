import React, { useState } from 'react'

function Calc({buttons, total}) {
    let initialValue = [...buttons].reduce((acc, [key, ]) => {
        return acc = {...acc, [key]: {value: ''}, input: {value: 0,  disabled: false}}
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
                    return isNaN(num) ? {
                        ...prev.input,
                        value: (`${inputValue.value}${value}`)
                    } : {
                        ...prev.input,
                        value: Math.abs(num)
                    } 
                }

                if (arithSymbol.test(value)) {
                    setTotal((prev) => [...prev, (value=== 'x' ? '*' : value)])
                    return value === '.' ? ({
                        ...prev.input,
                        value: (inputValue.value + value)
                    }) : ({
                        ...prev.input,
                        value: `${inputValue.value} ${value} `
                    });
                }

                if (value === 'DEL') {
                    let stringNum = `${inputValue.value}`
                    let newNum = stringNum.slice(0, stringNum.length - 1).trim();
                    console.log(initTotal);
                    console.log(newNum);
                    let newTotal = initTotal.join('').slice(0, initTotal.join('').length - 1);
                    setTotal((prev) => ((newTotal.length === 0 && newTotal.length) || [newTotal]));
                    console.log(newTotal.length);
                    return newNum.length === 0 ? ({
                        ...prev.input,
                        value: 0
                    }) : ({
                        ...prev.input,
                        value: newNum
                    })
                }

                if (value === 'RESET') {
                    setTotal((prev)=>[])
                    console.log(prev.input);
                    return {
                        ...prev.input,
                        value: 0,
                        disabled: false
                    }
                }

                if (value === '='){
                    try{
                        // eslint-disable-next-line
                        let evaluate = eval(initTotal.join('')).toFixed(6);
                        setTotal((prev)=>[`${evaluate}`])
                        return {
                            ...prev.input,
                            value: evaluate
                        }
                    }catch (err){
                        return {
                            ...prev.input,
                            value: 'SyntaxError',
                            disabled: true
                        };
                    }
                }
            }

            return ({
                ...prev,
                input: math()
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
            {buttons.map(([classes, el], id) => <button onClick={handleClick} name={classes} disabled={(classes === 'reset') ? false : initState.input.disabled} className={classes} key={id} value={el} >{el}</button>)}
        </div>
    </div>
  )
}

export default Calc
