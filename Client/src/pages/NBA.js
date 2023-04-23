import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SportHeaderDay from '../Scoreboard/componentsSB/SportHeaderDay';
import styled from 'styled-components';
import ScoreBox from '../Scoreboard/componentsSB/ScoreBox.js';
import { formatTime } from '../Scoreboard/functionalSB/formatTime.js';
import { formatDate } from '../Scoreboard/functionalSB/formatDate.js';
import { formatBetting } from '../Scoreboard/functionalSB/formatBetting.js';
import { formatTV } from '../Scoreboard/functionalSB/formatTV.js';
import { formatSelectedData } from '../Scoreboard/functionalSB/formatSelectedData.js';

const breakPoint = '(max-width: 550px)';

const Container = styled.div`
    min-height: 100vh;
    background: rgb(240,240,240);
`

const ScoreListContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 1300px;
    width: 90%;
    margin: 0 auto;
    
    @media ${breakPoint} {
        flex-direction: column;
        flex-wrap: none;
    }
`

export default function NBA() {

    const [date, setDate] = useState('');
    const [games, setGames] = useState([]);

    useEffect(() => {
        axios.get(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=${date}`)
        .then(res => {
            let workingSetGames = [];
            for (let i=0; i < res.data.events.length; i++) {
                let rawGameData = res.data.events[i].competitions[0];
                let selectedGameData = {
                    id: rawGameData.id,
                    date: formatDate(rawGameData.date),
                    time: formatTime(rawGameData.date),
                    awayColor: `#${rawGameData.competitors[1].team.color}F2`,
                    awayLogo: rawGameData.competitors[1].team.logo,
                    awayName: `${rawGameData.competitors[1].team.name}`,
                    awayRecord: `(${rawGameData.competitors[1].records[0].summary})`,
                    awayScore: rawGameData.competitors[1].score,
                    awayLocation: rawGameData.competitors[1].team.location,
                    awayID: rawGameData.competitors[1].team.id,
                    homeColor: `#${rawGameData.competitors[0].team.color}F2`,
                    homeLogo: rawGameData.competitors[0].team.logo,
                    homeName: `${rawGameData.competitors[0].team.name}`,
                    homeRecord: `(${rawGameData.competitors[0].records[0].summary})`,
                    homeScore: rawGameData.competitors[0].score,
                    homeLocation: rawGameData.competitors[0].team.location,
                    status: rawGameData.status.type.description,
                    clock: rawGameData.status.displayClock,
                    period: rawGameData.status.period,
                    homeAbbreviation: rawGameData.competitors[0].team.abbreviation,
                    awayAbbreviation: rawGameData.competitors[1].team.abbreviation,
                    homeID: rawGameData.competitors[0].team.id,
                    league: res.data.leagues[0].abbreviation
                    
                }
                formatBetting(selectedGameData, rawGameData);
                formatTV(selectedGameData, rawGameData);
                formatSelectedData(selectedGameData);
                workingSetGames.push(selectedGameData);
            }
            setGames(workingSetGames);
        });
    }, [date])

    return (
        <Container>
            <SportHeaderDay sport='NBA' setDate={setDate}/>
            <ScoreListContainer>
                {games.map((game) => (
                    <ScoreBox key={game.id} gameData={game}/>
                ))}
            </ScoreListContainer>
        </Container>
    )
}