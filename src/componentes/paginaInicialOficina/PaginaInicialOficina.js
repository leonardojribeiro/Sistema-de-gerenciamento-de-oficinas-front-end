import React, { useContext, useState } from 'react';
import { Avatar, AppBar, Toolbar, IconButton, Menu, MenuItem, Box, Typography, makeStyles, Container, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AuthContext from '../../contexts/AuthContext';
import MiniDrawer from '../Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import Rodape from './Rodape.js';
import FolderIcon from '@material-ui/icons/Folder';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: "relative",
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));


function PaginaInicialOficina() {
  const navigator = useHistory();

  const classes = useStyles();
  const { usuario, deslogar } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);


  const [open, setOpen] = useState(false);
  const opend = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    handleClose();
    deslogar()
  };

  return (
    <>
      <AppBar color="primary" position="relative" className={classes.appBar}>
        <Toolbar className="flex justify-between">
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <div>{usuario.idOficina.nomeFantasia}</div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar src={`${process.env.REACT_APP_API_URL}/files/${usuario.idOficina.uriLogo}`} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={opend}
            onClose={handleClose}
          >
            <MenuItem>{`Usuário: ${usuario.nomeUsuario}`}</MenuItem>
            <MenuItem onClick={handleClick} >Deslogar</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box display="flex">
        <MiniDrawer open={open} setOpen={setOpen}>
          <List onClick={()=>setOpen(false)}>
            <ListItem button onClick={()=>navigator.push("/marcas")}>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText>
                Marcas
              </ListItemText>
            </ListItem>
          </List>
        </MiniDrawer>
        <Container className="h-min-barra-rodape">
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
            facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
            gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
            donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
            Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
            imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
            arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
            </Typography>
        </Container>
      </Box>
      <Rodape />
    </>
  );
}

export default PaginaInicialOficina;