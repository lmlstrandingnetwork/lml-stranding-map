import React from "react";
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
export default Filter;