import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';

type renderInBodyProps = {
  children: any
}

const RenderInBody = ({ children }: renderInBodyProps) => {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    const newContainer = document.createElement('div');
    document.body.appendChild(newContainer);
    setContainer(newContainer);
    return () => {
      document.body.removeChild(newContainer);
    }
  }, []);

  if (!container) {
    return null;
  }

  return ReactDOM.createPortal(children, container);
}

export default RenderInBody;