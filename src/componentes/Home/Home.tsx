import React, { useContext, useState } from 'react';
import { Avatar, AppBar, Toolbar, IconButton, Menu, MenuItem, Box, Typography, makeStyles, Container, List, ListItem, ListItemIcon, ListItemText, } from '@material-ui/core';
import AuthContext from '../../contexts/AuthContext';
import MiniDrawer from '../Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import Rodape from './Rodape.js';
import FolderIcon from '@material-ui/icons/Folder';
import { Link } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import ExtensionIcon from '@material-ui/icons/Extension';
import PersonIcon from '@material-ui/icons/Person';
import SchoolIcon from '@material-ui/icons/School';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import BuildIcon from '@material-ui/icons/Build';
import ListagemOrdensDeServico from '../../pages/OrdemDeServico/ListagemOrdensDeServico';
import BotaoInserir from '../BotaoInserir';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: "relative",
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  btn: {
    position: "fixed",
    bottom: "64px",
    right: theme.spacing(3),
  }
}));


const PaginaInicialOficina: React.FC = () => {
  const classes = useStyles();
  const { usuario, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLAnchorElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const opend = Boolean(anchorEl);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    handleClose();
    logout()
  };

  return (
    <>
      <AppBar color="primary" position="relative" className={classes.appBar}>
        <Toolbar className="flex justify-between">
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography>{usuario?.oficina.nomeFantasia}</Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar src={`${process.env.REACT_APP_API_URL}/files/${usuario?.oficina.uriLogo}`} />
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
            <MenuItem>{`Usuário: ${usuario?.nomeUsuario}`}</MenuItem>
            <MenuItem onClick={handleClick} >Deslogar</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box display="flex">
        <MiniDrawer open={open} setOpen={setOpen}>
          <List onClick={() => setOpen(false)}>
            <ListItem button component={Link} to="/marcas">
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">
                  Marcas
              </Typography>
              </ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/modelos">
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">
                  Modelos
              </Typography>
              </ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/pecas">
              <ListItemIcon>
                <ExtensionIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">
                  Peças
              </Typography>
              </ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/clientes">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">
                  Clientes
              </Typography>
              </ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/veiculos">
              <ListItemIcon>
                <DriveEtaIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">
                  Veículos
              </Typography>
              </ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/fornecedores">
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">
                  Fornecedores
              </Typography>
              </ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/especialidades">
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">
                  Especialidades
              </Typography>
              </ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/funcionarios">
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">
                  Funcionários
              </Typography>
              </ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/servicos">
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">
                  Serviços
              </Typography>
              </ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/opcoes">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">
                  Opções
              </Typography>
              </ListItemText>
            </ListItem>
          </List>
        </MiniDrawer>
        <Container className="h-min-barra-rodape" maxWidth="xl" >
          <ListagemOrdensDeServico />
          <Box className={classes.btn}>
            <BotaoInserir titulo="Nova ordem de serviço" linkTo="ordensdeservico/inserir" />
          </Box>
        </Container>
      </Box>
      <Rodape />
    </>
  );
}

export default PaginaInicialOficina;