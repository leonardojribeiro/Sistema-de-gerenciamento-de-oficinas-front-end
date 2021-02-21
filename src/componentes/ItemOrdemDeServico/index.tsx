import React, { memo } from 'react'
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Tooltip } from '@material-ui/core';
import { formatarData, formatarMoeda, formatarPlaca } from '../../recursos/Formato';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import OrdemDeServico from '../../Types/OrdemDeServico';
import CircularProgressWithLabel from '../CircularProgressWithLabel';

interface ItemOrdemDeServicoProps {
  ordemDeServico: OrdemDeServico;
}

function ItemOrdemDeServico({ ordemDeServico }: ItemOrdemDeServicoProps): JSX.Element {
  return (
    <ListItem button divider component={Link} to={`/ordensdeservico/exibirordemdeservico?id=${ordemDeServico._id}`}>
      <ListItemAvatar>
        <Avatar>
          <CircularProgressWithLabel value={ordemDeServico.andamento} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${formatarPlaca(ordemDeServico.veiculo.placa)} - ${formatarData(ordemDeServico.dataDeRegistro)}`}
        secondary={`Sintoma: ${ordemDeServico.sintoma}. Valor total: R$${formatarMoeda(ordemDeServico.valorTotal)}`}
      />
      <ListItemSecondaryAction>
        <Tooltip title={`Alterar essa ordem de serviço`}>
          <IconButton component={Link} to={`/ordensdeservico/alterarordemdeservico?id=${ordemDeServico._id}`}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default memo(ItemOrdemDeServico)