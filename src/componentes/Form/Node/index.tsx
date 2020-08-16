import React, { useContext, memo } from 'react';
import FormContext from '../Context/FormContext';

interface NodeProps {
  node: string;
  children: React.ReactNode;
}

const Node: React.FC<NodeProps> = ({ node, children}) => {
  const { nodePath, ...context } = useContext(FormContext);
  return (
    <FormContext.Provider value={{
      ...context,
      nodePath: nodePath.concat(nodePath ? `.${node}` : node)
    }}>
      {children}
    </FormContext.Provider>
  );
}

export default memo(Node);