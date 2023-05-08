import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export default function BoxScore() {
    let url = window.location.href;
    let removePath = url.split('D/')[1];
    let id = removePath.split('/')[0];
    // const [data, setData] = useState('');
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        axios.get(`http://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${id}`)
        .then(res => {
            console.log(res.data);
            // setData(res.data);
            let teamData = [];
            let playerData = [];
            for (let i=0; i < res.data.boxscore.players.length; i++) {
              let rawPlayerData = res.data.boxscore.players[i].statistics[0].athletes;
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
              teamData.push({
                teamID: rawTeamData.id,
                teamDisplayName: rawTeamData.displayName,
                playerStats: playerData
              });
           }
           setTeams(teamData);
        })
        .catch((error) => {
            console.log(error)
        });
    }, [id]);
  
    return (
        <>
        <>
            {[teams] ? 
                [teams].map(data => {
                    console.log(data);
                    return(
                    //    <div className="data" key={data}>
                    //      <h6>{JSON.stringify(data)}</h6>
                    //    </div>
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Player</StyledTableCell>
                          <StyledTableCell align="right">MIN</StyledTableCell>
                          <StyledTableCell align="right">FG</StyledTableCell>
                          <StyledTableCell align="right">3FG</StyledTableCell>
                          <StyledTableCell align="right">FT</StyledTableCell>
                          <StyledTableCell align="right">OREB</StyledTableCell>
                          <StyledTableCell align="right">DREB</StyledTableCell>
                          <StyledTableCell align="right">REB</StyledTableCell>
                          <StyledTableCell align="right">AST</StyledTableCell>
                          <StyledTableCell align="right">STL</StyledTableCell>
                          <StyledTableCell align="right">BLK</StyledTableCell>
                          <StyledTableCell align="right">TO</StyledTableCell>
                          <StyledTableCell align="right">PF</StyledTableCell>
                          <StyledTableCell align="right">+/-</StyledTableCell>
                          <StyledTableCell align="right">PTS</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {teams[0].playerStats.map((row) => (
                          <StyledTableRow key={row.teamDisplayName}>
                            <StyledTableCell component="th" scope="row">
                              {row.shortName}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.minutes}</StyledTableCell>
                            <StyledTableCell align="right">{row.fieldGoals}</StyledTableCell>
                            <StyledTableCell align="right">{row.threePointFG}</StyledTableCell>
                            <StyledTableCell align="right">{row.freethrows}</StyledTableCell>
                            <StyledTableCell align="right">{row.offensiveRebounds}</StyledTableCell>
                            <StyledTableCell align="right">{row.defensiveRebounds}</StyledTableCell>
                            <StyledTableCell align="right">{row.rebounds}</StyledTableCell>
                            <StyledTableCell align="right">{row.assists}</StyledTableCell>
                            <StyledTableCell align="right">{row.steals}</StyledTableCell>
                            <StyledTableCell align="right">{row.blocks}</StyledTableCell>
                            <StyledTableCell align="right">{row.turnovers}</StyledTableCell>
                            <StyledTableCell align="right">{row.personalFouls}</StyledTableCell>
                            <StyledTableCell align="right">{row.plusminus}</StyledTableCell>
                            <StyledTableCell align="right">{row.points}</StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                    )
                }) : <h3>No data yet</h3> }
        </>

      </>
    )
    
  }

