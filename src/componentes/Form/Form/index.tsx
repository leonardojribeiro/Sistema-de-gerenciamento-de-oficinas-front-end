import React, { memo, KeyboardEvent, RefForwardingComponent, forwardRef} from 'react';
import  FormProvider from '../Context/FormProvider';
import FormContext from '../Context/FormContext';
import { FormProviderHandles, FormProviderProps } from '../types';

const Formulario: RefForwardingComponent<FormProviderHandles, FormProviderProps> = (({initialData, onSubmit, children }, formRef) => {
  return (
    <FormProvider ref={formRef} onSubmit={onSubmit} initialData={initialData}>
      <FormContext.Consumer>
        {({ handleSubmit, clear }) =>{
          const handleKeyDown = (evento: KeyboardEvent)=>{
            if (evento.keyCode === 13) {
              evento.preventDefault();
              handleSubmit();
            }
          }
          return(
          <form noValidate onReset={clear} onSubmit={handleSubmit} onKeyPress={handleKeyDown}>
            {children}
          </form>
        )}}
      </FormContext.Consumer>
    </FormProvider>
  )
})

export default memo(forwardRef(Formulario));