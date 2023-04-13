import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import "./AppBar.css"
import {Link} from 'react-router-dom'

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }} className = "box">
      <AppBar position="static" className = 'app-bar'>
        <Toolbar className='tool-bar'>
          <IconButton
            size="large"
            edge="start"
            //color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" className="home-link" >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
               Expense Tracker
            </Typography>
          </Link>

          <div className='nav-menu-options'>
          <Link to="/login" className="login-link">
            <Button color="inherit">Login</Button>
          </Link>

          <Link to="/register" className="register-link">
            <Button color="inherit">Register</Button>
          </Link>
          </div>

        </Toolbar>
      </AppBar>
    </Box>
  );
}