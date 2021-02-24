import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import React, { memo } from 'react';

interface BotaoIncluirOuAlterarProps {
  isEdit: boolean;
}
const BotaoIncluirOuAlterar: React.FC<BotaoIncluirOuAlterarProps> = ({ isEdit }) => (
  <DialogActions >
    <Button type="submit">{isEdit ? "Alterar" : "Incluir"}</Button>
  </DialogActions>
)

export default memo(BotaoIncluirOuAlterar);