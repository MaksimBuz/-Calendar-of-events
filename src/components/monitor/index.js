import React from 'react';

const Monitor = ({today ,PrevHandler,TodayHandler, NextHandler})=>(

    <div className='bottow-row'>
            <div className='month-contol'> 
                 <img src="./button-l.png"  className= 'button-icon' onClick={PrevHandler}/>
                 <span>{today.format('MMMM')}</span> <span>{today.format('YYYY')}</span>
                 <img src="./button-r.png"  className= 'button-icon'  onClick={NextHandler}/>
            </div>
            <button onClick={TodayHandler} className='extra-button'>Сегодня</button>
    </div>
);

export {Monitor};