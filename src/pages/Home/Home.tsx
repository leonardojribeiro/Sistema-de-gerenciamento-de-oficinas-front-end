import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
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
import { useMediaQuery, useTheme } from '@material-ui/core';

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
  dashboardContainer: {
    height: `calc(100vh - 128px)`
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  drawerToolbar: {
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }
}));


const Home: React.FC = () => {
  const theme = useTheme();
  const query = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles();
  const { usuario, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLAnchorElement | null>(null);
  const [open, setOpen] = useState<boolean>(query);
  const opend = Boolean(anchorEl);

  useEffect(() => {
    setOpen(query);
  }, [query])

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

  const handleDrawerClose = useCallback(() => {
    if (!query) {
      setOpen(false)
    }
  }, [query]);

  return (
    <>
      <AppBar color="primary" position="relative" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {!query &&
            <IconButton onClick={() => !query && setOpen(!open)}>
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          }
          <Typography>{usuario?.oficina.nomeFantasia}</Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar src={`${process.env.REACT_APP_IMAGES_URL}/${usuario?.oficina.uriLogo}`} />
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
      <MiniDrawer open={open} setOpen={setOpen}>
        <Toolbar className={classes.drawerToolbar} >
          {!query &&
            <IconButton onClick={() => !query && setOpen(!open)}>
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          }
        </Toolbar>
        <List onClick={handleDrawerClose}>
          <ItemDrawer icon={<AssignmentIcon />} title="Ordens de Serviço" dominio="ordemdeservico" navigateTo="/ordensdeservico" />
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
        <Dashboard />
      </Container>
      <Rodape />
    </>
  );

}

export default memo(Home);