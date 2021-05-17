import React, { useState } from 'react'
import styled from 'styled-components';
import Layout from './Layout'

function App() {
  return (
    <div>
      <Title>Sticky Notes</Title>
      <Layout />
    </div>
  );
}

export default App;

const Title = styled.header`
  padding: 1%;
  font-size: 24px;
`;
