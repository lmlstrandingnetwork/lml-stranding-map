import React, {PureComponent} from 'react';
import "../App.css";
import classnames from "classnames";
import { Container, Row, Col } from "react-grid-system";
import styles from "./styles.module.css";

export default class Filter extends PureComponent {
  render() {
    const containerClasses = classnames(styles.container);
    const formClasses = classnames("form-horizontal", styles.form);

    return (
      <div className="filter">
        <form className={formClasses} noValidate>
          <Container>
            <Row>
              <Col>
                <label className="form-label" htmlFor="price-from">
                  Species:
                </label>

                <select
                  className="form-select"
                  id="price-from"
                  placeholder="Choose species"
                >
                  <option value="">California Sea Lion (330)</option>
                  <option value="">Dolphin (14)</option>
                  <option value="">Beaked Whale(3)</option>
                </select>
              </Col>
              </Row>

              <Row>
                <Col>
                  <label className="form-label" htmlFor="postcode">
                  Sex: 
                </label>
                <select className="form-select" id="postcode">
                  <option value="">Male</option>
                  <option value="">Female</option>
                </select>
                </Col>
              </Row>
              
              <Row>
                <Col>
                <label className="form-label" htmlFor="sortorder">
                  From:
                </label>

                <select className="form-select" id="sortorder">
                  <option value="">2010</option>
                  <option value="">2011</option>
                  <option value="">2012</option>
                  <option value="">2013</option>
                  <option value="">2014</option>
                  <option value="">2015</option>
                  <option value="">2016</option>
                  <option value="">2017</option>
                  <option value="">2018</option>
                  <option value="">2019</option>
                  <option value="">2020</option>
                </select>
              </Col>
              </Row>

              <Row>

              <Col>
                <label className="form-label" htmlFor="sortorder">
                  To:
                </label>
                <select className="form-select" id="sortorder">
                  <option value="">2010</option>
                  <option value="">2011</option>
                  <option value="">2012</option>
                  <option value="">2013</option>
                  <option value="">2014</option>
                  <option value="">2015</option>
                  <option value="">2016</option>
                  <option value="">2017</option>
                  <option value="">2018</option>
                  <option value="">2019</option>
                  <option value="">2020</option>
                </select>
              </Col>
              </Row>
           
          </Container>
        </form>
      </div>
    );
  }

}