import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui';

import { generateRows } from '../demo-data/generator';

export default () => {
  const [columns] = useState([
    { name: 'name', title: 'Species' },
    { name: 'gender', title: 'Sex' },
    { name: 'city', title: 'Year' },
    //{ name: 'car', title: 'Car' },
  ]);
  const [rows] = useState(generateRows({ length: 0 }));

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <Table />
        <TableHeaderRow />
        <TableFilterRow />
      </Grid>
    </Paper>
  );
};


//export default Filter;
/*import React from "react";
import {Container, Row, Col } from 'react-grid-system';
import {
    FilteringState,
    IntegratedFiltering,
  } from '@devexpress/dx-react-grid';
  
class Filter extends React.Component{
    render(){
        return(
        <Container>
            <Row>
                <Col sm={4}>
                    Species
                    </Col>
                <Col sm={4}>
                    Sex
                </Col>
                <Col sm={4}>
                    Year
                </Col>    
            </Row>
        </Container>
        );
    }
}
export default Filter;*/