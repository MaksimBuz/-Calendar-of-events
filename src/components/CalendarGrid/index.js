import moment from 'moment/moment';
import React from 'react';
import styled from 'styled-components';

// Стилизация
// Ячейка дня
const CellWrapper = styled.div`
    min-width:143px;
    min-height:120px;
    background-color:${props => props.isWeekend ?   '#191970':'#FFFFFF' };
    color:black;

`;
// Дата в ячейке RowInCell


const EventItemWrapper = styled('button')`
    position:relative;
    left:-14px;
    width:114px;
    margin:0;
    padding:0;
    cursor:pointer;
    border:unset;
    background-color:white;
    color:black;
    text-align:left;



`;

// Сам компонент
const CalendarGrid = ({start_day,events, openFormHandler})=>{
    const day =start_day.clone().subtract(1,'day');
    // Массив дней
    const daysArray =[...Array(35)].map(()=>day.add(1,'day').clone());
    const isCarentDay =(day)=>moment().isSame(day,'day');

    return(
        <div className='table'>
            {
            daysArray.map((dayItem)=>(
                <CellWrapper key={dayItem.format('DDMMYYYY')} isWeekend = {dayItem.day()===6 || dayItem.day()===0}   keys={dayItem.unix()} > 
                        <div className='ShowDayWarpper' > 
                            <div className='DayWrapper' onDoubleClick={()=>openFormHandler('Create',null,dayItem)}>
                                {isCarentDay(dayItem)?  <div className='CurentDay'>{dayItem.format('D')} </div >  : dayItem.format('D') }           
                            </div>
                        </div>
                          <li className='EventListWrapper'>  
                              {
                                events.filter(event => event.date >= dayItem.format('X') && event.date<= dayItem.clone().endOf('day').format('X') )
                                .map(event=>(
                                    <EventItemWrapper onDoubleClick={()=>openFormHandler('Update',event)}>
                                        <li key={event.id}>
                                            {event.title} 
                                    
                                        </li>
                                    </EventItemWrapper>
                                ))
                              } 
                            </li > 
                </CellWrapper>
            ))
            }
        </div>
    )
}
export {CalendarGrid}