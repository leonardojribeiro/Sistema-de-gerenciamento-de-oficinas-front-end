import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Dominio } from '../../contexts/WebSocketContext';
import useListagemUnica from '../../hooks/useListagemUnica';
import useQuery from '../../hooks/useQuery';
import Dialog from '../Dialog';
import EditIcon from '@material-ui/icons/Edit';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import PersonIcon from '@material-ui/icons/Person';
//import CakeIcon from '@material-ui/icons/Cake';
import Formato from '../../recursos/Formato';
import SchoolIcon from '@material-ui/icons/School';
import Fornecedor from '../../Types/Fornecedor';
import Cliente from '../../Types/Cliente';
import Funcionario from '../../Types/Funcionario';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

interface ShowPessoaProps {
  title: string;
  dominio: Dominio;
  linkToEdit: string
}

const ShowPessoa: React.FC<ShowPessoaProps> = ({ title, dominio, linkToEdit }) => {
  const id = useQuery('id');
  const { listar, item } = useListagemUnica<Cliente & Funcionario & Fornecedor>(dominio, id);

  useEffect(() => {
    listar();
  }, [listar])

  return (
    <Dialog open title={title} maxWidth="xs" fullWidth>
      {item &&
        (<>
          <Grid container spacing={1}>
            {item.nome && (
              <>
                <Grid item>
                  <PersonIcon />
                </Grid>
                <Grid>
                  <Typography>{item.nome}</Typography>
                </Grid>
              </>
            )}
            {item.nomeFantasia && (
              <>
                <Grid item>
                  <LocalShippingIcon />
                </Grid>
                <Grid item>
                  <Typography>{item.nomeFantasia}</Typography>
                </Grid>
              </>
            )}
          </Grid>
          <Divider />
          <Box my={1}>
            <Grid container spacing={1}>
              {item.telefoneCelular && (
                <>
                  <Grid item>
                    <PhoneAndroidIcon />
                  </Grid>
                  <Grid item>
                    <Typography>{Formato.formatarTelefone(item.telefoneCelular)}</Typography>
                  </Grid>
                  <Grid item>

                  </Grid>
                </>
              )}
              {item.telefoneFixo && (
                <>
                  <Grid item>
                    <PhoneIcon />
                  </Grid>
                  <Grid item>
                    <Typography>{Formato.formatarTelefone(item.telefoneFixo)}</Typography>
                  </Grid>
                </>
              )}
            </Grid>
            {item.email && (
              <Grid container spacing={1}>
                <Grid item>
                  <EmailIcon />
                </Grid>
                <Grid item>
                  <Typography noWrap>{item.email}</Typography>
                </Grid>
              </Grid>
            )}
          </Box>
          <Divider />
          {
            item.especialidades && (
              <>
                <Box my={1}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <SchoolIcon />
                    </Grid>
                    <Grid item xs={10}>
                      <Grid container spacing={1}>
                        {item.especialidades.map((especialidade, key) => (
                          <Grid item key={key} >
                            <Chip label={especialidade.descricao} />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
              </>
            )
          }
          <Box my={1}>
            <Grid container spacing={1} alignItems="center">
              {item.endereco && (
                <>
                  <Grid item>
                    <HomeIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <Grid container spacing={1} >
                      <Grid item>
                        <Typography>
                          {`Logradouro: ${item.endereco.logradouro}, `}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>
                          {`Número: ${item.endereco.numero}, `}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>
                          {`Bairro: ${item.endereco.bairro}, `}
                        </Typography>
                      </Grid>
                      {item.endereco.complemento && (<Grid item>
                        <Typography>
                          {`Complemento: ${item.endereco.complemento} `}
                        </Typography>
                      </Grid>)}
                      <Grid item>
                        <Typography>
                          {`Cidade: ${item.endereco.cidade}-${item.endereco.estado} `}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography>
                          {`CEP: ${item.endereco.cep}`}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
          <Divider />
          <Box my={1}>
            <Grid container alignItems="flex-end" justify="flex-end" spacing={1}>
              {dominio === 'cliente' && (
                <Grid item>
                  <IconButton component={Link} to={`/clientes/veiculos?cliente=${id}`}>
                    <DriveEtaIcon />
                  </IconButton>
                </Grid>
              )}
              <Grid item>
                <IconButton component={Link} to={`${linkToEdit}?id=${id}`}>
                  <EditIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </>
        )}
    </Dialog>
  );
}

export default ShowPessoa;