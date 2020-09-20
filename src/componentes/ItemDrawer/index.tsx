import { ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

interface ItemDrawerProps {
  title: string;
  icon: React.ReactChild;
  navigateTo: string;
}

const ItemDrawer: React.FC<ItemDrawerProps> = ({ icon, navigateTo, title }) => {
  return (
    <ListItem button component={Link} to={navigateTo}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText>
        <Typography>
          {title}
        </Typography>
      </ListItemText>
    </ListItem>
  );
}

export default memo(ItemDrawer);