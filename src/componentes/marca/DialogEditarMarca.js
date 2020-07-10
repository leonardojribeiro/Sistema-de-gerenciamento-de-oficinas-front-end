import React from 'react';
import Dialogo from '../Dialogo';
import useQuery from '../../hooks/useQuery';

function DialogoEditar() {
  const id = useQuery("id");
  console.log(id)
  return (
    <Dialogo titulo="Editar marca">
    {id}
    </Dialogo>
  );
}

export default DialogoEditar;