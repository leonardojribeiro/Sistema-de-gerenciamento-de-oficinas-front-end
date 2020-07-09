import React, { forwardRef } from 'react';
import FormContext, { FormProvider } from '../../contexts/FormContext';

const Form = forwardRef(({dadosIniciais, onSubmit, children }, formRef) => {
  return (
    <FormProvider ref={formRef} onSubmit={onSubmit} dadosIniciais={dadosIniciais}>
      <FormContext.Consumer>
        {({ handleSubmit }) =>(
          <form onSubmit={handleSubmit}>
            {children}
          </form>
        )}
      </FormContext.Consumer>
    </FormProvider>
  )
})

export default Form;