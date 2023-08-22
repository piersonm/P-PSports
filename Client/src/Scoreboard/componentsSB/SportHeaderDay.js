import React, { useState, forwardRef } from 'react';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const breakPoint = '(max-width: 550px)';

const Container = styled.div`
    flex-direction: row;
    flex-flow: row wrap;
    padding-top: 1rem;
    font-size: 1.5rem;
    display: inline-block;
    white-space: nowrap;
    min-width: auto;
`

const CalendarButton = styled.button`
    display: flex;
    background-color: black;
    border: none;
    border-radius: 10px;
    color: white;
    padding: 10px 18px;
    text-align: center;
    margin: .5rem;
    margin-inline-start: 4.5rem;
    font-size: 14px;
    cursor: pointer;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    &:hover { box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19); }
`
export default function SportHeaderDay({sport, setDate}) {

    let value = new Date();

    function handleChange(nextValue) {
        let year = nextValue.getFullYear();
        let month = nextValue.getMonth() + 1;
        let date = nextValue.getDate();

        if (month < 10) {
            month = `0${month}`;
        }
        if (date < 10) {
            date = `0${date}`
        }
        setDate(`${year}${month}${date}`)
    }

    const [startDate, setStartDate] = useState(new Date());
    const DateInput = forwardRef(({ value, onClick }, ref) => (
        <CalendarButton onClick={onClick} ref={ref}>
          {value}
        </CalendarButton>
    ));
    return (
        <Container>
            {sport} Scores
            <DatePicker 
                selected={startDate}
                value={value}
                onChange={(date) => {setStartDate(date); handleChange(date)}} 
                customInput={<DateInput/>}/>
        </Container>
    )
}