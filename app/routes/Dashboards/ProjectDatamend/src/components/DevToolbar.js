import React, { useState } from 'react';
//import { Button, Table  } from 'reactstrap';
import {
    Button,
    Row,
    Col,
    Table
} from './../../../../../components';

import DataStore from '../store/DataStore';

export const DevToolbar = () => {
  const [isMock, setIsMock] = useState(DataStore.getIsMock());

  function clkToggle(e) {
    console.log(isMock);
    DataStore.setIsMock(!isMock);
    setIsMock(!isMock);
  }
  function getMockFlag() {
    return isMock ? "yes" : "no"
  }
  return (
       <Row>
       <Col>
          <p>Dev. mock: {getMockFlag()} {' '}
            <Button outline size="sm" onClick={clkToggle} color="secondary">Toggle</Button>
          </p>
       </Col>
       </Row>
  );
}


