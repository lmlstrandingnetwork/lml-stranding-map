import * as React from 'react'
import classnames from 'classnames'
import {Container, Row, Col } from 'react-grid-system';


import styles from './styles.module.css'

class Filter extends React.Component {
  render() {
    const containerClasses = classnames('container', 'mb-1', styles.container)
    const formClasses = classnames('form-horizontal', styles.form)

    return (
      <div className={containerClasses}>
        <form className={formClasses} noValidate>
          <div className="columns text-center">
          <Container>
        <Row>
          <Col>
            <div className="column col-4 col-xs-12">
              <div className="form-group">
                <div className="col-3 col-sm-12">
                  <label className="form-label" htmlFor="price-from">
                    Species:
                  </label>
                </div>
                <div className="col-9 col-sm-12">
                <select className="form-select" id="price-from" placeholder="Choose species"> 
                <option value="">California Sea Lion</option>
                <option value="">Dolphin</option>
                <option value="">Beaked Whale</option>
                </select>

                </div>
              </div>
            </div>
            </Col>
            <Col>
            <div className="column col-4 col-xs-12">
              <div className="form-group">
                <div className="col-3 col-sm-12">
                  <label className="form-label" htmlFor="postcode">
                    Sex:
                  </label>
                </div>
                <div className="col-9 col-sm-12">
                  <select className="form-select" id="postcode">
                    <option value="">Male</option>
                    <option value="">Female</option>
                  </select>
                </div>
              </div>
            </div>
            </Col>
            <Col>
            <div className="column col-4 col-xs-12">
              <div className="form-group">
                <div className="col-3 col-sm-12">
                  <label className="form-label" htmlFor="sortorder">
                    From:
                  </label>
                </div>
                <div className="col-9 col-sm-12">
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
                </div>
              </div>
            </div>
            </Col>

            <Col>
            <div className="column col-4 col-xs-12">
              <div className="form-group">
                <div className="col-3 col-sm-12">
                  <label className="form-label" htmlFor="sortorder">
                    To:
                  </label>
                </div>
                <div className="col-9 col-sm-12">
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
                </div>
              </div>
            </div>
            </Col>
            </Row>
      </Container>
          </div>
        </form>
      </div>

    )
  }
}

export default Filter