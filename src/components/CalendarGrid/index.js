import moment from 'moment/moment';
import React from 'react';
import styled from 'styled-components';

// Стилизация
const GridWrapper = styled.div`
    display: grid;
    grid-template-columns:repeat(7 , 1fr);
    grid-template-rows:repeat(6 , 1fr);
    background-color:404040;
    grid-gap:1px;
    width:1200px;
`;
// Ячейка дня
const CellWrapper = styled.div`
    min-width:140px;
    min-height:80px;
    background-color:${props => props.isWeekend ?   '#191970':'#1E1F21' };
    color:white;

`;


// КОлонка для даты в ячейке дня
// ?? Зачем  создавать пропс под флекс старт который отвечает за то что число дня справа
const RowInCell = styled.div`
    display:flex;
    justify-content: ${ props => props.justifyContent ? props.justifyContent : 'flex-start'};
`;

const CurentDay = styled.div`
    height: 100%;
    width:31px;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:50%;
    background-color:red;



`;
// Дата в ячейке RowInCell
const DayWrapper= styled.div`
    height:33px;
    width:33px;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:2px;
    cursor: pointer;



`;
const ShowDayWarpper= styled.div`
    display:flex;
    justify-content:flex-end;
    flex-direction:row;
    


`;

const EventListWrapper = styled('ul')`
    padding-left:4px;
    list-style-position:inside;
    margin:unset;


`;

const EventItemWrapper = styled('button')`
    position:relative;
    left:-14px;
    width:114px;
    margin:0;
    padding:0;
    cursor:pointer;
    border:unset;
    background-color:#1E1F21;
    color:white;
    text-align:left;



`;

// Сам компонент
const CalendarGrid = ({start_day,events, openFormHandler})=>{
    const day =start_day.clone().subtract(1,'day');
    // Массив дней
    const daysArray =[...Array(42)].map(()=>day.add(1,'day').clone());
    const isCarentDay =(day)=>moment().isSame(day,'day');

    return(
        <GridWrapper>
            {
            daysArray.map((dayItem)=>(
                <CellWrapper key={dayItem.format('DDMMYYYY')} isWeekend = {dayItem.day()===6 || dayItem.day()===0}   keys={dayItem.unix()} > 
                    <ShowDayWarpper>
                        <RowInCell justifyContent={'flex-end'}> 
                                <DayWrapper onDoubleClick={()=>openFormHandler('Create',null,dayItem)}>
                                    {isCarentDay(dayItem)?  <CurentDay >{dayItem.format('D')} </CurentDay>  : dayItem.format('D') }           
                                </DayWrapper>
                        </RowInCell>
                   </ShowDayWarpper> 
                          <EventListWrapper> Start{dayItem.format('X')} 
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
                            </EventListWrapper> End   {dayItem.clone().endOf('day').format('X')}
                </CellWrapper>
            ))
            }
        </GridWrapper>
    )
}
export {CalendarGrid}