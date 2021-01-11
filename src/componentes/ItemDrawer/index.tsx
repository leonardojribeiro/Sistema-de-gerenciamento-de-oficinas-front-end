import { Badge, ListItem, ListItemIcon, ListItemText, Tooltip, Typography } from '@material-ui/core';
import React, { memo, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import WebSocketContext, { Dominio, Notification } from '../../contexts/WebSocketContext';

interface ItemDrawerProps {
  title: string;
  icon: React.ReactChild;
  navigateTo: string;
  dominio?: Dominio;
}

const ItemDrawer: React.FC<ItemDrawerProps> = ({ icon, navigateTo, title, dominio }) => {
  const { getNotification, dismissNotification } = useContext(WebSocketContext);
  const notification = dominio ? getNotification(dominio) : {} as Notification
  const total = notification.changed + notification.inserted;

  const handleClick = useCallback(() => {
    if (dominio) {
      dismissNotification(dominio);
    }
  }, [dismissNotification, dominio])

  return (
    <ListItem button component={Link} to={navigateTo} onClick={handleClick}>
      <Tooltip title={title}>
        <ListItemIcon>
          <Badge color={total > 0 ? "primary" : "default"} badgeContent={total > 0 ? total : ""}>
            {icon}
          </Badge>
        </ListItemIcon>
      </Tooltip>
      <ListItemText>
        <Typography>
          {title}
        </Typography>
      </ListItemText>
    </ListItem >
  );
}

export default memo(ItemDrawer);