import * as React from "react";

import { Typography, IconButton, Box, Drawer } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import { useState } from "react";

const Dashboard = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    return (
        <>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
        </IconButton>

        <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
        >
            <Box p={2} width="250px" textAlign="center" role="presentation">
                <Typography variant="h6" component="div"></Typography>
            </Box>
        </Drawer>  
        </>
    );
};
export default Dashboard;