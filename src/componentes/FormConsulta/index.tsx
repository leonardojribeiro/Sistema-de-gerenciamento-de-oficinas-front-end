import React, { memo, useCallback, useRef, useState } from 'react';
import Box from '@material-ui/core/Box';
import Chip, { ChipProps } from '@material-ui/core/Chip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles/';
import Tooltip from '@material-ui/core/Tooltip';
import { Form, PhoneField, PlacaField } from '../Form';
import CpfCnpjField from '../Form/Fields/CpfCnpjField';
import EmailField from '../Form/Fields/EmailField';
import NameField from '../Form/Fields/NameField';
import Query from '../../Types/Query';
import TextField from '../Form/Fields/TextField';
import AutoCompleteVeiculo from '../AutoComplete/AutoCompleteVeiculo';
import AutoCompleteMarca from '../AutoComplete/AutoCompleteMarca';
import AutoCompleteModelo from '../AutoComplete/AutoCompleteModelo';

export type Filter = "nome" | "nomeFantasia" | "cpfCnpj" | "cpf" | "email" | "telefone" | "descricao"
  | "placa" | "status" | "categoria" | "veiculo" | "marca" | "modelo";

interface FormConsultaPessoaProps {
  onSubmit: (query: Query[]) => void;
  filters: Filter[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chipContainer: {
      display: 'flex',
      flexWrap: 'wrap',

    },
    container: {
      border: `solid 1px ${theme.palette.divider}`,
      borderRadius: theme.spacing(0.5),
      padding: theme.spacing(1)
    },
    chip: {
      margin: theme.spacing(0.5),
    }
  }),
);

const FormConsulta: React.FC<FormConsultaPessoaProps> = ({ onSubmit, filters }) => {
  const classes = useStyles();
  const [filtersSelected, setFiltersSelected] = useState<Filter[]>([filters[0]]);
  const valuesSelected = useRef<string[]>([""]);
  const labelValuesSelected = useRef<any>({});
  const [tooltipOpen, setTooltipOpen] = useState<Filter | null>(null);

  const handleSubmit = useCallback((data) => {
    const d = filtersSelected.map((filter, index) => {
      return {
        name: filter,
        value: valuesSelected.current[index]
      }
    })
    console.log(d)
    onSubmit(d);
  }, [filtersSelected, onSubmit]);

  const isAlowMoreSelectable = useCallback((filter: Filter) => {
    const filtersSelectable = ['marca', 'modelo', 'veiculo'];
    let alowMoreSelectable: boolean = true;
    filtersSelected.forEach(filter => {
      if (!filtersSelectable.includes(filter)) {
        alowMoreSelectable = false;
      }
    })
    return alowMoreSelectable;
  }, [filtersSelected]);

  const handleFilterAdition = useCallback((filter: Filter) => {
    if (!filtersSelected.includes(filter)) {
      if (isAlowMoreSelectable(filter)) {
        console.log('aqsas')
        if (valuesSelected.current[filtersSelected.length - 1]) {
          setFiltersSelected(filters => [...filters, filter])
        }
        else {
          setTooltipOpen(filter);
        }
      }
      else {
        setFiltersSelected([filter]);
      }
    }
  }, [filtersSelected, isAlowMoreSelectable]);

  const handleFilterDelete = useCallback((filter: Filter) => {
    if (filtersSelected.length > 1) {
      valuesSelected.current[filtersSelected.length - 1] = "";
      labelValuesSelected.current[filter] = "";
      setFiltersSelected(filtersSelected.slice(0, filtersSelected.length - 1))
    }
    else {
      setFiltersSelected([filters[0]])
      valuesSelected.current[0] = ""
      labelValuesSelected.current[filter] = "";
    }
  }, [filters, filtersSelected])

  const handleValueChange = useCallback((value: string) => {
    valuesSelected.current[filtersSelected.length - 1] = value;
  }, [filtersSelected.length])

  const isAditionAllowed = useCallback((filter: Filter) => {
    return !filtersSelected.includes(filter) && (filtersSelected.length < 2 || isAlowMoreSelectable(filter))
  }, [filtersSelected, isAlowMoreSelectable])

  const getChipForCurrentFilter = useCallback((filter: Filter, insideField: boolean = false) => {
    const props: ChipProps = {
      onClick: isAditionAllowed(filter) ? () => handleFilterAdition(filter) : undefined,
      variant: filtersSelected.includes(filter) && filtersSelected[filtersSelected.length - 1] === filter ? "default" : "outlined",
      size: "small",
      key: filter,
      className: classes.chip,
      onDelete: filtersSelected.length > 0 && filtersSelected[filtersSelected.length - 1] === filter
        && filtersSelected[0] !== filters[0]
        ? () => {
          handleFilterDelete(filter)
        }
        : undefined
    }
    switch (filter) {
      case 'cpf': return <Chip label="CPF" {...props} />
      case 'nomeFantasia': return <Chip label="Nome fantasia" {...props} />
      case 'cpfCnpj': return <Chip label="CPF/CNPJ" {...props} />
      case 'placa': return <Chip label="Placa" {...props} />
      case 'descricao': return <Chip label="Descrição" {...props} />
      case 'nome': return <Chip label="Nome" {...props} />
      case 'telefone': return <Chip label="Telefone" {...props} />
      case 'email': return <Chip label="Email" {...props} />
      case 'status': return <Chip label="Status" {...props} />
      case 'veiculo': return <Chip label="Veículo" {...props} />
      case 'marca': return <Chip label={`Marca${labelValuesSelected.current['marca'] ? `: ${labelValuesSelected.current['marca']}` : ""}`} {...props} />
      case 'modelo': return <Chip label={`Modelo${labelValuesSelected.current['modelo'] ? `: ${labelValuesSelected.current['modelo']}` : ""}`} {...props} />
    }
    return <Chip {...props} />
  }, [classes.chip, filters, filtersSelected, handleFilterAdition, handleFilterDelete, isAditionAllowed])

  const getFieldForCurrentFilter = useCallback(() => {
    const props = {
      name: "value",
      fullWidth: true,
      noValidate: true,
      label: "",
      placeholder: 'Consultar',
      InputProps: {
        startAdornment: filtersSelected.map(filter => getChipForCurrentFilter(filter, true))
      },
      onChange: (event: any) => { handleValueChange(event.target.value) }
    };
    switch (filtersSelected[filtersSelected.length - 1]) {
      case ("nome"): return <NameField {...props} />
      case ("nomeFantasia"): return <NameField {...props} />
      case "telefone": return <PhoneField {...props} />
      case "email": return <EmailField {...props} />
      case "cpfCnpj": return <CpfCnpjField {...props} />
      case "placa": return <PlacaField {...props} />
      case "cpf": return <CpfCnpjField {...props} />
      case "descricao": return <TextField {...props} />
      case "veiculo": return <AutoCompleteVeiculo {...props} onChange={(_, value) => {
        if (value) {
          handleValueChange(value._id)
          labelValuesSelected.current['veiculo'] = value.descricao;
        }
      }} />
      case "marca": return <AutoCompleteMarca {...props} onChange={(_, value) => {
        if (value) {
          handleValueChange(value._id)
          labelValuesSelected.current['marca'] = value.descricao;
        }
      }} />
      case "modelo": return <AutoCompleteModelo {...props} onChange={(_, value) => {
        if (value) {
          handleValueChange(value._id)
          labelValuesSelected.current['modelo'] = value.descricao;
        }
      }} />
    }
  }, [filtersSelected, getChipForCurrentFilter, handleValueChange]);

  return (
    <Form onSubmit={handleSubmit}>
      <div className={classes.container} >
        <Box>
          {getFieldForCurrentFilter()}
        </Box>
        <div className={classes.chipContainer}>
          {filters.length > 1 ? filters.map((filter, key) => {
            return (
              <ClickAwayListener key={key} onClickAway={() => {
                filter === tooltipOpen && setTooltipOpen(null)
              }}>
                <Tooltip title="Escolha uma opção antes de selecionar outro filtro." open={filter === tooltipOpen}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  PopperProps={{
                    disablePortal: true,
                  }}
                >
                  {getChipForCurrentFilter(filter)}
                </Tooltip>
              </ClickAwayListener>
            )
          }) : ""}
        </div>
      </div>
    </Form>
  );
}

export default memo(FormConsulta);