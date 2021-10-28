import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';

type renderInBodyProps = {
  children: any
}

/**
 * HOC that renders the children outside the current document area
 * and append it to the body
 * @param {object} renderInBodyProps only the children will be used
 * @returns {React.ReactElement} RnederInBody
 */
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