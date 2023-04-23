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
    font-size: 3rem;
    font-weight: 500;
    text-align: center;
    margin-bottom: 1em;
    
    @media ${breakPoint} {
        font-size: 2.5rem;
    }
`

const DayWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 5%;
    margin: 0 auto;
    
    @media ${breakPoint} {
        flex-direction: column;
    }
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
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="example-custom-input" onClick={onClick} ref={ref}>
          {value}
        </button>
    ));
    return (
        <Header>
            <Title>{sport} Scores </Title>
            <DayWrapper>
                <DatePicker 
                selected={startDate}
                value={value} 
                onChange={(date) => {setStartDate(date); handleChange(date)}} 
                customInput={<ExampleCustomInput/>}/>
            </DayWrapper>
        </Header>
    )
}