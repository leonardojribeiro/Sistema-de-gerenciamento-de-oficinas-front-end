import { Box, IconButton, Menu, MenuItem,  Tooltip,  } from '@material-ui/core';
import React, { memo, useCallback, useState } from 'react';
import { Form, PhoneField } from '../Form';
import CpfCnpjField from '../Form/Fields/CpfCnpjField';
import EmailField from '../Form/Fields/EmailField';
import NameField from '../Form/Fields/NameField';
import FilterListIcon from '@material-ui/icons/FilterList';

export interface FormConsultaPessoaValues {
  consulta: string,
  filtro: string,
}

type Filter = "nome" | "nomeFantasia" | "cpfCnpj" | "cpf" | "email" | "telefone";

interface FormConsultaPessoaProps {
  onSubmit: (data: FormConsultaPessoaValues) => void;
}

const FormConsultaPessoa: React.FC<FormConsultaPessoaProps> = ({ onSubmit }) => {
  const [filter, setFilter] = useState<Filter>("nome");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleSubmit = useCallback((data) => {
    onSubmit({
      ...data,
      filtro: filter
    });
  }, [filter, onSubmit]);

  const getFieldForCurrentFilter = useCallback(() => {
    const props = { name: "consulta", fullWidth: true, label: `Consultar ${filter}`, noValidate: true };
    switch (filter) {
      case "nome": {
        return <NameField {...props} />
      }
      case "telefone": {
        return <PhoneField {...props} />
      }
      case "email": {
        return <EmailField {...props} />
      }
      case "cpfCnpj": {
        return <CpfCnpjField {...props} />
      }
    }
    return
  }, [filter]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleFilterChange = useCallback((filter: Filter) => {
    setFilter(filter);
    handleClose();
  }, [handleClose]);

  return (
    <Form onSubmit={handleSubmit} initialData={{ filtro: "nome" }}>
      <Box display="flex">
        {getFieldForCurrentFilter()}
        <IconButton onClick={handleClick}>
          <Tooltip title="Escolher filtro">
            <FilterListIcon />
          </Tooltip>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Box m={1}>
            <MenuItem onClick={() => handleFilterChange("nome")}>Nome</MenuItem>
            <MenuItem onClick={() => handleFilterChange("email")}>E-mail</MenuItem>
            <MenuItem onClick={() => handleFilterChange("cpfCnpj")}>CPF/CNPJ</MenuItem>
            <MenuItem onClick={() => handleFilterChange("telefone")}>Telefone</MenuItem>
          </Box>
        </Menu>
      </Box>
    </Form>
  );
}

export default memo(FormConsultaPessoa);