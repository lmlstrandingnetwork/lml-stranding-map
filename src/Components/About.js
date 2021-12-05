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
          <h3>We are a team of 4 software engineers who continued the development of this website in 2021.
          </h3>
        </Row>

        <Row className="justify-content-md-center">
          <Col>
            <div class="LI-profile-badge"  data-version="v1" data-size="medium" data-locale="en_US" data-type="vertical" data-theme="light" data-vanity="deeksha-manjunath-63ab18168"><a class="LI-simple-link" href='https://www.linkedin.com/in/deeksha-manjunath-63ab18168?trk=profile-badge'>Deeksha Manjunath</a></div> 
          </Col>
          <Col>
            <div class="LI-profile-badge"  data-version="v1" data-size="medium" data-locale="en_US" data-type="vertical" data-theme="light" data-vanity="benson-ho-4221a5149"><a class="LI-simple-link" href='https://www.linkedin.com/in/benson-ho-4221a5149?trk=profile-badge'>Benson Ho</a></div> 
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col>
            <div class="LI-profile-badge"  data-version="v1" data-size="medium" data-locale="en_US" data-type="vertical" data-theme="light" data-vanity="junru-zhou"><a class="LI-simple-link" href='https://www.linkedin.com/in/junru-zhou?trk=profile-badge'>Junru Zhou</a></div> 
          </Col>
          <Col>
            <div class="LI-profile-badge"  data-version="v1" data-size="medium" data-locale="en_US" data-type="vertical" data-theme="light" data-vanity="ethan-perlada"><a class="LI-simple-link" href='https://www.linkedin.com/in/ethan-perlada?trk=profile-badge'>Ethan Perlada</a></div> 
          </Col>
        </Row>

        <h3>The original team of 6 software engineers who recently graduated from UCSC in 2020.
        </h3>
        <Row className="justify-content-md-center">
          <Col>
            <div class="LI-profile-badge"  data-version="v1" data-size="medium" data-locale="en_US" data-type="vertical" data-theme="light" data-vanity="yakovlevpavel"><a class="LI-simple-link" href='https://www.linkedin.com/in/yakovlevpavel?trk=profile-badge'>Pavel Yakovlev</a></div> 
          </Col>
          <Col>
            <div class="LI-profile-badge"  data-version="v1" data-size="medium" data-locale="en_US" data-type="vertical" data-theme="light" data-vanity="ashley-pauley-862883199"><a class="LI-simple-link" href='https://www.linkedin.com/in/ashley-pauley-862883199?trk=profile-badge'>Ashley Pauley</a></div>
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
          Dunkin, Karolina Wirga, Amber Diluzio, Juli Limon, and Maia Smith. We would also like to
          thank Professor Jullig and our TA’s Akila De Silva and Scott Davis
that have provided support and mentorship throughout this project.</h3>
        </Row>

      </Container>
  </div>   
      
  );
}




export default About;
