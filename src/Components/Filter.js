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
                    Species
                  </label>
                </div>
                <div className="col-9 col-sm-12">
                <select className="form-select" id="price-from">
                <option value="">Choose...</option>
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
                    Sex
                  </label>
                </div>
                <div className="col-9 col-sm-12">
                  <select className="form-select" id="postcode">
                    <option value="">Choose...</option>
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
                    Year
                  </label>
                </div>
                <div className="col-9 col-sm-12">
                  <select className="form-select" id="sortorder">
                    <option value="">Choose...</option>
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