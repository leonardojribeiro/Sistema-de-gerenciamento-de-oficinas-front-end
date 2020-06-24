import React, { useContext } from 'react';
import { Avatar, AppBar, Toolbar, IconButton, Menu, MenuItem } from '@material-ui/core';
import AuthContext from '../../contexts/AuthContext';
import AccountCircle from "@material-ui/icons/AccountCircle"

function PaginaInicialOficina() {
  const { usuario, deslogar } = useContext(AuthContext);
  console.log(usuario)
  const [anchorEl, setAnchorEl] = React.useState(null);


  const open = Boolean(anchorEl);

  

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    deslogar();
  };
  return (
    <>
      <AppBar color="transparent">
        <Toolbar className="flex justify-between">
          <Avatar src={`http://localhost:3333/files/${usuario.idOficina.uriLogo}`} />
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
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
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Deslogar</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default PaginaInicialOficina;