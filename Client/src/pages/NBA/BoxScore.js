import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead, { tableHeadClasses } from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';

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

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    [`&.${tableHeadClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        fontSize: 30,
    },
}));

const drawerWidth = 240;

export default function BoxScore({game}) {
    const [open, setOpen] = React.useState();
    // const [data, setData] = useState('');
    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);
    const [team1Players, setTeam1Players] = useState([]);
    const [team2Players, setTeam2Players] = useState([]);
    
    useEffect(() => {
        axios.get(`http://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${game.id}`)
        .then(res => {
            
            // setData(res.data);
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
        
    },[game.id]);
  
    const handleDrawerToggle = () => {
      setOpen(!open);
    };
  
    const drawer = (
      <div>
                <TableContainer>
            <Table aria-label="customized table">
            <StyledTableHead>
                    <img src={team1.teamLogo} height="100" width="100"></img>
                    {team1.teamDisplayName}
                </StyledTableHead>
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
                    {team1Players.map((data) => (
                        <StyledTableRow key={data.teamId}>
                            <StyledTableCell component="th" scope="row">
                              {data.shortName}
                            </StyledTableCell>
                            <StyledTableCell align="right">{data.minutes}</StyledTableCell>
                            <StyledTableCell align="right">{data.fieldGoals}</StyledTableCell>
                            <StyledTableCell align="right">{data.threePointFG}</StyledTableCell>
                            <StyledTableCell align="right">{data.freethrows}</StyledTableCell>
                            <StyledTableCell align="right">{data.offensiveRebounds}</StyledTableCell>
                            <StyledTableCell align="right">{data.defensiveRebounds}</StyledTableCell>
                            <StyledTableCell align="right">{data.rebounds}</StyledTableCell>
                            <StyledTableCell align="right">{data.assists}</StyledTableCell>
                            <StyledTableCell align="right">{data.steals}</StyledTableCell>
                            <StyledTableCell align="right">{data.blocks}</StyledTableCell>
                            <StyledTableCell align="right">{data.turnovers}</StyledTableCell>
                            <StyledTableCell align="right">{data.personalFouls}</StyledTableCell>
                            <StyledTableCell align="right">{data.plusminus}</StyledTableCell>
                            <StyledTableCell align="right">{data.points}</StyledTableCell>
                        </StyledTableRow>
                    )) }
                </TableBody>
                <StyledTableHead>
                    <img src={team2.teamLogo} height="100" width="100"></img>
                    {team2.teamDisplayName}
                </StyledTableHead>
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
                    {team2Players.map((data) => (
                        <StyledTableRow key={data.id}>
                            <StyledTableCell component="th" scope="row">
                              {data.shortName}
                            </StyledTableCell>
                            <StyledTableCell align="right">{data.minutes}</StyledTableCell>
                            <StyledTableCell align="right">{data.fieldGoals}</StyledTableCell>
                            <StyledTableCell align="right">{data.threePointFG}</StyledTableCell>
                            <StyledTableCell align="right">{data.freethrows}</StyledTableCell>
                            <StyledTableCell align="right">{data.offensiveRebounds}</StyledTableCell>
                            <StyledTableCell align="right">{data.defensiveRebounds}</StyledTableCell>
                            <StyledTableCell align="right">{data.rebounds}</StyledTableCell>
                            <StyledTableCell align="right">{data.assists}</StyledTableCell>
                            <StyledTableCell align="right">{data.steals}</StyledTableCell>
                            <StyledTableCell align="right">{data.blocks}</StyledTableCell>
                            <StyledTableCell align="right">{data.turnovers}</StyledTableCell>
                            <StyledTableCell align="right">{data.personalFouls}</StyledTableCell>
                            <StyledTableCell align="right">{data.plusminus}</StyledTableCell>
                            <StyledTableCell align="right">{data.points}</StyledTableCell>
                        </StyledTableRow>
                    )) }
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={!open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
        </Box>
        </Box>
)}

