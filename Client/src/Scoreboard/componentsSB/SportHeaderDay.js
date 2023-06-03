import React, { useState, forwardRef } from 'react';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const breakPoint = '(max-width: 550px)';

const Header = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 0em;
    padding-bottom: 3em;

    @media ${breakPoint} {
        padding-top: calc(3em + 60px);
        padding-bottom: 1em;
    }
`

const Title = styled.h1`
    display: flex;
    flex-direction: column;
    font-size: 1.45em;
    font-weight: 500;
    text-align: left;
    margin-top: 0.5rem;
    margin-bottom: 0.5em;
    
    @media ${breakPoint} {
        font-size: 2.5rem;
    }
`

const DayWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 5%;
    margin: 0;
    
    @media ${breakPoint} {
        flex-direction: column;
    }
`
const CalendarButton = styled.button`
  background-color: black;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
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
        <Header>
            <Title>{sport} Scores </Title>
            <DayWrapper>
                <DatePicker 
                selected={startDate}
                value={value}
                onChange={(date) => {setStartDate(date); handleChange(date)}} 
                customInput={<DateInput/>}/>
            </DayWrapper>
        </Header>
    )
}