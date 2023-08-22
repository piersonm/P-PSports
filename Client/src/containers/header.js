import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';


const pages = ['NBA', 'NFL', 'MLB', 'NCCAF', 'NCAAB'];
const options = ['News', 'Scores', 'Predictions'];

function ResponsiveAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [selectedSport, setSelectedSport] = React.useState();
  const open = Boolean(anchorEl);
  const handleClickListItem = (event, sport) => {
    setAnchorEl(event.currentTarget);
    setSelectedSport(sport);
    setSelectedIndex();
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          <HomeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 3 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DUTCH OVEN SPORTS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <><Button
                key={page}
                selected={page === selectedSport}
                onClick={(event) => handleClickListItem(event, page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button><Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'lock-button',
                  role: 'listbox',
                }}
              >
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      as={ Link }
                      to={`/${selectedSport}/${option}`}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                      
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu></>            
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
