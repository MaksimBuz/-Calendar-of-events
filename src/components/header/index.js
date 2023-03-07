import React from 'react';
const Header = ()=>(
        <div className='Container'>
          <div className='Control'>
            <div className='control-buttons'>
                <button className='main-button'>Добавить </button>
                <button className='main-button'>Обновить</button>
            </div>  
            <div className='input-area'>
                <img src="./icon.png" alt=""/>
                <input placeholder='Placeholder'/>
            </div>    
                
          </div>   
          
        </div>

)    
export {Header};