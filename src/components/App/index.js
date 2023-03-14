import React from 'react';
import moment from 'moment';
// import '../index.css'
import { Monitor } from '../monitor';
import { CalendarGrid } from '../CalendarGrid';
import styled from 'styled-components';
import { useEffect, useState } from "react"
import {Header} from '../header';




const url = 'http://localhost:5000';
const defaultEvent = {
  title:'',
  description:'',
  date:moment().format('X')
}

function App() {

  window.moment = moment;
  moment.updateLocale('en',{week:{dow :1}});

 // СТилизованные компоненты

// СОстояние для текущего дня
  const [today ,SetToday] = useState(moment());

// Измененине месяца
  // Предыдущий месяц
    const PrevHandler = ()=>{
      SetToday(prev => prev.clone().subtract(1, 'month'));
    }
  // Текущий день
    const TodayHandler = ()=>{
      SetToday(moment());
    }
  // Следуюший месяц
    const NextHandler = ()=>{
    SetToday(prev => prev.clone().add(1, 'month'));
    }


const start_day = today.clone().startOf('month').startOf('week');


// Для формы
const [event ,Setevent] = useState(true); 
const [isShowForm ,SetiShowForm] = useState(null); 
const [method ,Setmethod] = useState(null); 

// Мы вызываем openFormHandler из  мап календаря и кладем event в eventForUpdate
const  openFormHandler = (methodName,eventForUpdate,dayItem)=>{
  console.log(dayItem);
  // Передаем  event дня в состояние event либо передаем defaultEvent предварительно изменив в нем date на день 
  Setevent(eventForUpdate || { ...defaultEvent, date:dayItem.format('X')})
  SetiShowForm(true)
  Setmethod(methodName);

  }
  // Закрытие формы
  const  CancelButtonHandler =  ()=>{

    SetiShowForm(false);
    Setevent(null);
  }

// В  Setevent содержится event спасибо openFormHandler и мы меняем его на text
const ChangeEventHandler =(text,field)=>{
  Setevent(prevState=>({
...prevState,[field]:text

  }));

}
// Добавление и редактирование событий
const EventFetchHandler =()=>{
const fetchUrl= method==='Update' ? `${url}/events/${event.id}`:`${url}/events`;
const httpMethod = method==='Update'? 'PATCH':'POST';
fetch( fetchUrl,{
  method:httpMethod ,
  headers: {
    'Content-Type':'application/json'
  },
  body: JSON.stringify(event),



}).then(res=>res.json()).then(res=>{
   console.log(res)
   if (method==='Update') {
    Setevents(prevState=> prevState.map(eventEl=>eventEl.id == res.id ?res:eventEl  ))
   }
   else{
  Setevents(prevState=>[...prevState,res]) 

   }
   
  CancelButtonHandler()

 
}
 )
}


const RemoveEventHandler =  ()=>{
  const fetchUrl= `${url}/events/${event.id}`;
  const httpMethod = 'DELETE';
 fetch( fetchUrl,{
   method:httpMethod ,
   headers: {
     'Content-Type':'application/json'
   },
   
 

 }).then(res=>res.json()).then(res=>{
  Setevents(prevState=> prevState.filter(eventEl=>eventEl.id !== event.id  ))
   CancelButtonHandler()
  
 }
  )
  
  }
// Данные для ограничения месяца
const StartDateQuery = start_day.clone().format('X');
const EndDateQuery = start_day.clone().add(42, 'days').format('X');

// Запрос для передачи событий на текущий месяц 
const [events ,Setevents] = useState([]);
  useEffect(()=>{
    fetch(`http://localhost:5000/events?date_gte=${StartDateQuery}&date_lte=${EndDateQuery}`).then(res=>res.json()).then(response => {
      Setevents(response);
      
    })
  },[today])



  return (
    <div className='header'>

    {
      
      isShowForm ? (
          <div className='cell-popup'>
            <div className='Frame1'>
              <img src="./cross.png" alt="" onClick={CancelButtonHandler}/>
            </div>
              <input placeholder='Событие' className='Frame2' value={event.title} onChange={e=>ChangeEventHandler(e.target.value,'title')}/>
              <input  placeholder='День, месяц, год' className='Frame4'/>
              <div className='Frame5'>
                <input  placeholder='Имена участников'/>
              </div>
              <input placeholder='Описание' className='Frame6' EventTitle value={event.description} onChange={e=>ChangeEventHandler(e.target.value,'description')}/>
              
              <div className='Frame3'>
                <button  onClick={EventFetchHandler}>   {method}  </button>
                <button onClick={RemoveEventHandler}> Remove    </button>
              </div>
          </div>
        ) : null 
    }

    {/* Весь документ */}
      <Header/>
      <div className='main-container'>
      <Monitor today={today}  PrevHandler={PrevHandler} TodayHandler={TodayHandler}  NextHandler={NextHandler}/>
      <CalendarGrid start_day={start_day} events={events} openFormHandler={openFormHandler} />
      </div>
   </div> 
  );
}

export default App;
