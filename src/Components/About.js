import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {Helmet} from "react-helmet";
import "./About.css"


function About() {
  return (     
    <div>
    <Container>
        <Helmet>
          <script type="text/javascript" src="https://platform.linkedin.com/badges/js/profile.js" async defer></script>
        </Helmet>

        <Row className="justify-content-md-center">
          <h1>Meet the Team</h1>
          <h3>We are a team of 6 software engineers who recently graduated from UCSC. Check out
            our LinkedIn profiles and hire us... jk... unless..
          </h3>
        </Row>

        <Row className="justify-content-md-center">
          <Col>
            <div class="LI-profile-badge"  data-version="v1" data-size="large" data-locale="en_US" data-type="vertical" data-theme="light" data-vanity="harrison-fox-775323193"><a class="LI-simple-link" href='https://www.linkedin.com/in/harrison-fox-775323193?trk=profile-badge'>Harrison Fox</a></div>
          </Col>
          <Col>
            <div class="LI-profile-badge"  data-version="v1" data-size="large" data-locale="en_US" data-type="vertical" data-theme="light" data-vanity="harrison-fox-775323193"><a class="LI-simple-link" href='https://www.linkedin.com/in/harrison-fox-775323193?trk=profile-badge'>Harrison Fox</a></div>
          </Col>
          <Col>
            <div class="LI-profile-badge" data-version="v1" data-size="medium" data-locale="en_US" data-type="vertical" data-theme="light" data-vanity="maya-apotheker-b7a139172"><a class="LI-simple-link" href='https://www.linkedin.com/in/maya-apotheker-b7a139172?trk=profile-badge'>Maya Apotheker</a></div>
          </Col>
        </Row>
        <Row>
          <p>  </p>
        </Row>

        <Row >
          <Col>
          <div class="LI-profile-badge"  data-version="v1" data-size="large" data-locale="en_US" data-type="vertical" data-theme="light" data-vanity="natalie-w-08b4639b"><a class="LI-simple-link" href='https://www.linkedin.com/in/natalie-w-08b4639b?trk=profile-badge'>Natalie W.</a></div>         
          </Col>
          <Col>
          <div class="LI-profile-badge"  data-version="v1" data-size="medium" data-locale="en_US" data-type="vertical" data-theme="light" data-vanity="azizkhuja"><a class="LI-simple-link" href='https://www.linkedin.com/in/azizkhuja?trk=profile-badge'>Azizkhuja Asomiddinov</a></div>          
          </Col>
          <Col>
            <div class="LI-profile-badge"  data-version="v1" data-size="large" data-locale="en_US" data-type="vertical" data-theme="light" data-vanity="harrison-fox-775323193"><a class="LI-simple-link" href='https://www.linkedin.com/in/harrison-fox-775323193?trk=profile-badge'>Harrison Fox</a></div>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <h1>Ackowledgements</h1>
          <h3>Thank you to our sponsors at the Long Marine Lab: Dr. Robin
          Dunkin, Karolina Wirga, and Amber Diluzio. We would also like to
          thank Professor Jullig and our TA’s Akila De Silva and Scott Davis
that have provided support and mentorship throughout this project.</h3>
        </Row>

      </Container>
  </div>   
      
  );
}




export default About;
