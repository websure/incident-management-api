import React from 'react';
import { Loader as SemanticLoader } from 'semantic-ui-react';

const TEXT = 'Loading';

const Loader = ({ text = TEXT }) => (
  <SemanticLoader active inline="centered">
    {text}
  </SemanticLoader>
);

export default Loader;
