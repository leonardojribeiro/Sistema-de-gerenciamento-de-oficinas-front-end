import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import React, { memo } from 'react'
import { formatarData, formatarPlaca } from '../../recursos/Formato';
import Veiculo from '../../Types/Veiculo';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';

interface ItemVeiculoProps {
  veiculo: Veiculo;
  baseURLToHistory: string;
}

function ItemVeiculo({ veiculo, baseURLToHistory }: ItemVeiculoProps): JSX.Element {
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  return (
    <ListItem button divider component={Link} to={`${baseURLToHistory}?veiculo=${veiculo._id}&placa=${veiculo.placa}`}>
      <ListItemAvatar>
        <Avatar src={`${imagensUrl}/${veiculo?.modelo?.marca?.uriLogo}`} alt={veiculo?.modelo?.marca?.descricao} />
      </ListItemAvatar>
      <ListItemText
        primary={`${formatarPlaca(veiculo.placa)}`}
        secondary={`Modelo: ${veiculo.modelo.descricao}. Ano/modelo: ${formatarData(veiculo.anoFabricacao, 'ano')}/${formatarData(veiculo.anoModelo, 'ano')}.`}
      />
      <ListItemSecondaryAction>
        <Tooltip title={`Nova ordem de serviço para este veículo`}>
          <IconButton component={Link} to={`/ordensdeservico/incluir?veiculo=${veiculo._id}`}>
            <AssignmentIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={`Alterar o veículo ${formatarPlaca(veiculo.placa)}`}>
          <IconButton component={Link} to={`/veiculos/alterarveiculo?id=${veiculo._id}`}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default memo(ItemVeiculo);