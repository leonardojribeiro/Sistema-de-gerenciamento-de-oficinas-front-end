import React, { memo, useContext, useState } from 'react';
import { Avatar, AppBar, Toolbar, IconButton, Menu, MenuItem, Box, Typography, makeStyles, Container, List } from '@material-ui/core';
import AuthContext from '../../contexts/AuthContext';
import MiniDrawer from '../../componentes/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import Rodape from './Rodape';
import FolderIcon from '@material-ui/icons/Folder';
import SettingsIcon from '@material-ui/icons/Settings';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import ExtensionIcon from '@material-ui/icons/Extension';
import PersonIcon from '@material-ui/icons/Person';
import SchoolIcon from '@material-ui/icons/School';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import BuildIcon from '@material-ui/icons/Build';
import ItemDrawer from '../../componentes/ItemDrawer';
import GroupIcon from '@material-ui/icons/Group';
import Dashboard from '../Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment'

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: "relative",
  },
  btn: {
    position: "fixed",
    bottom: "64px",
    right: theme.spacing(3),
  },
  areaBtn: {
    height: "88px",
  },
  dashboardContainer:{
    height: `calc(100vh - 128px)`
  },
  toolbar:{
    display: 'flex',
    justifyContent: 'space-between'
  }
}));


const Home: React.FC = () => {
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
        <Toolbar className={classes.toolbar}>
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
            <Avatar src={`${process.env.REACT_APP_API_URL}/${usuario?.oficina.uriLogo}`} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
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
            <ItemDrawer icon={<AssignmentIcon/>} title="Ordens de Serviço" dominio="ordemdeservico" navigateTo="/ordensdeservico" />
            <ItemDrawer icon={<FolderIcon />} title="Marcas" dominio="marca" navigateTo="/marcas" />
            <ItemDrawer icon={<FolderIcon />} title="Modelos" dominio="modelo" navigateTo="/modelos" />
            <ItemDrawer icon={<ExtensionIcon />} title="Peças" dominio="peca" navigateTo="/pecas" />
            <ItemDrawer icon={<PersonIcon />} title="Clientes" dominio="cliente" navigateTo="/clientes" />
            <ItemDrawer icon={<DriveEtaIcon />} title="Veículos" dominio="veiculo" navigateTo="/veiculos" />
            <ItemDrawer icon={<LocalShippingIcon />} title="Fornecedores" dominio="fornecedor" navigateTo="/fornecedores" />
            <ItemDrawer icon={<SchoolIcon />} title="Especialidades" dominio="especialidade" navigateTo="/especialidades" />
            <ItemDrawer icon={<GroupIcon />} title="Funcionários" dominio="funcionario" navigateTo="/funcionarios" />
            <ItemDrawer icon={<BuildIcon />} title="Serviços" dominio="servico" navigateTo="/servicos" />
            <ItemDrawer icon={<SettingsIcon />} title="Opções" navigateTo="/opcoes" />
          </List>
        </MiniDrawer>
        <Container className={classes.dashboardContainer} maxWidth="xl" >
          <Dashboard/>
        </Container>
      </Box >
      <Rodape />
    </>
  );

}

export default memo(Home);