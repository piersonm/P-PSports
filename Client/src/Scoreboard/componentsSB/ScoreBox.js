import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {Button} from '@mui/material';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { styled as muiStyle } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead, { tableHeadClasses } from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BoxScore from '../../pages/NBA/BoxScore';


const StyledTableCell = muiStyle(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      
    },
  }));
  
const StyledTableRow = muiStyle(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    
  }));

const StyledTableHead = muiStyle(TableHead)(({ theme }) => ({
    [`&.${tableHeadClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        fontSize: 30,   
    },
}));

const breakPoint = '(max-width: 550px)'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '70vh',
  width: '60vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};
const Container = styled.div`
  display: inline-block;
  flex: 1 1 calc(33.3% - 2em);
  margin: 0.5em .5rem;
  max-width: 300px;
  min-width: 230px;
  transition: all .25s ease;
  box-shadow: 0px 7px 15px rgba(0,0,0,0.4);

  @media ${breakPoint} {
    width: 100%;
    min-width: auto;
    margin: 1em auto;
    
  }
`

const GameInfo = styled.div`
  display: flex;
  padding: .5em;
  background: white;

  @media ${breakPoint} {
    padding: .25em .5em;
    font-size: .8rem;
  }
`

const Date = styled.span`
  margin-right: 1em;
`

const Time = styled.span``

const TV = styled.span`
font-weight: 700;
margin-left: auto;
`

const LogoBackground = styled(Link)`
  width: 100%;
  height: 40px;
  background-color: ${props => props.color};
  display: inline-flex;
  align-items: center;
  transition: all .3s ease;
  text-decoration: none;

  :hover {
    transform: scale(1.03);
  }

  @media ${breakPoint} {
    height: 70px;
  }
`

const Logo = styled.img`
  height: 70%;
  margin-left: .5em;

  @media ${breakPoint} {
    height: 60%;
  }
`

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: .5em;
  height: 100%;
  position: relative;

  @media ${breakPoint} {
    margin-left: 1em;
  }
`

const Location = styled.div`
  font-size: .7rem;
  position: relative;
  top: 20%;
  color: black;
  white-space: nowrap;

  @media ${breakPoint} {
    font-size: .6rem;
    top: 20%;
  }
`

const TeamName = styled.span`
  text-align: center;
  font-size: 1.15rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  color: black;
  margin: auto 0;

  @media ${breakPoint} {
    font-size: 1rem;
  }
`

const Record = styled.span`
  font-size: .9rem;
  color: gray;
  margin-left: .5em;

  @media ${breakPoint} {
    font-size: .75rem;
  }
`

const Score = styled.span`
  font-size: 1.75rem;
  padding: .1em;
  text-align: center;
  margin-left: auto;
  margin-right: .5em;
  font-weight: 600;
  color: black;

  @media ${breakPoint} {
    font-size: 1.5rem;
  }
`

export default function ScoreBox({gameData}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);

  useEffect(() => {
      axios.get(`http://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${gameData.id}`)
      .then(res => {
          let team1 = {};
          let team2 = {};
          console.log(res.data);
          for (let i=0; i < res.data.boxscore.players.length; i++) {
            let rawPlayerData = res.data.boxscore.players[i].statistics[0].athletes;
            let playerData = [];
            let rawTeamData = res.data.boxscore.players[i].team;
            rawPlayerData.map((player) => (
              playerData.push({
                id: player.athlete.id,
                displayName: player.athlete.displayName,
                shortName: player.athlete.shortName,
                jerseyNumber: player.athlete.jersey,
                playerPosition: player.athlete.position.abbreviation,
                didNotPlay: player.didNotPlay,
                reason: player.reason,
                starter: player.starter,
                minutes: player.stats[0],
                fieldGoals: player.stats[1],
                threePointFG: player.stats[2],
                freethrows: player.stats[3],
                offensiveRebounds: player.stats[4],
                defensiveRebounds: player.stats[5],
                rebounds: player.stats[6],
                assists: player.stats[7],
                steals: player.stats[8],
                blocks: player.stats[9],
                turnovers: player.stats[10],
                personalFouls: player.stats[11],
                plusminus: player.stats[12],
                points: player.stats[13],
              })
            ));
            // eslint-disable-next-line default-case
            switch(i) {
              case 0:
                  team1 = {
                      teamID: rawTeamData.id,
                      teamDisplayName: rawTeamData.displayName,
                      playerStats: playerData,
                      teamLogo: rawTeamData.logo,
                      teamColor: rawTeamData.color
                  };
              // eslint-disable-next-line no-fallthrough
              case 1:
                  team2 = {
                      teamID: rawTeamData.id,
                      teamDisplayName: rawTeamData.displayName,
                      playerStats: playerData,
                      teamLogo: rawTeamData.logo,
                      teamColor: rawTeamData.color
                  };
              }
          }
          setTeam1(team1);
          setTeam1Players(team1.playerStats);
          setTeam2(team2);
          setTeam2Players(team2.playerStats);    
      })        
      .catch((error) => {
          console.log(error)
      });
      
  },[gameData.id]);

  const [view, setView] = React.useState('list');

  const handleChange = (event, nextView) => {
    setView(nextView);
  };


  return (
    <>
    <Container>
      <GameInfo name ='GameInfo' id={gameData.id}>
        <Date>{gameData.date}</Date>
        <Time>{gameData.time}</Time>
        <TV>{gameData.tv}</TV>
    
        <Button id="boxScoreButton" >Box Score</Button>



      </GameInfo>
      <LogoBackground color={gameData.awayColor} to={`/${gameData.league}/TeamPage/${gameData.awayAbbreviation}`}>
        <Logo src={gameData.awayLogo} alt={`${gameData.awayName} logo`}/>
        <NameWrapper>
          <Location league={gameData.league}>{gameData.awayLocation}</Location>
          <TeamName>{gameData.awayName} <Record>{gameData.awayRecord}</Record></TeamName>
        </NameWrapper>
        <Score>{gameData.awayScore}</Score>
      </LogoBackground>
      <LogoBackground color={gameData.homeColor} to={`/${gameData.league}/TeamPage/${gameData.homeAbbreviation}`}>
        <Logo src={gameData.homeLogo} alt={`${gameData.homeName} logo`}/>
        <NameWrapper>
          <Location>{gameData.homeLocation}</Location>
          <TeamName>{gameData.homeName} <Record>{gameData.homeRecord}</Record></TeamName>
        </NameWrapper>
        <Score>{gameData.homeScore}</Score>
      </LogoBackground>
    </Container>
    <ToggleButtonGroup
      key={gameData.id}
      gameData={gameData}
      orientation="vertical"
      value={view}
      exclusive
      onChange={handleChange}>

      <ToggleButton value="list" aria-label="list">
          <BoxScore key={gameData.id} game={gameData}/>
      </ToggleButton>
      <ToggleButton value="module" aria-label="module">
          <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton value="quilt" aria-label="quilt">
          <ViewQuiltIcon />
      </ToggleButton>

    </ToggleButtonGroup>
</>
  ) 
}