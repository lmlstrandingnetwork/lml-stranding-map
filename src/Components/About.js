import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Helmet} from "react-helmet";

function About() {
  return (
    <div>
      <h1>Meet the Team!</h1>
      <Helmet>
        <script type="text/javascript" src="https://platform.linkedin.com/badges/js/profile.js" async defer></script>
      </Helmet>
    
      <div class="LI-profile-badge"  data-version="v1" data-size="large" data-locale="en_US" data-type="vertical" data-theme="light" data-vanity="harrison-fox-775323193"><a class="LI-simple-link" href='https://www.linkedin.com/in/harrison-fox-775323193?trk=profile-badge'>Harrison Fox</a></div>
      <div class="LI-profile-badge"  data-version="v1" data-size="large" data-locale="en_US" data-type="vertical" data-theme="light" data-vanity="harrison-fox-775323193"><a class="LI-simple-link" href='https://www.linkedin.com/in/harrison-fox-775323193?trk=profile-badge'>Harrison Fox</a></div>
      <div class="LI-profile-badge"  data-version="v1" data-size="large" data-locale="en_US" data-type="vertical" data-theme="light" data-vanity="azizkhuja"><a class="LI-simple-link" href='https://www.linkedin.com/in/azizkhuja?trk=profile-badge'>Azizkhuja Asomiddinov</a></div>
      <div class="LI-profile-badge"  data-version="v1" data-size="large" data-locale="en_US" data-type="vertical" data-theme="light" data-vanity="azizkhuja"><a class="LI-simple-link" href='https://www.linkedin.com/in/azizkhuja?trk=profile-badge'>Azizkhuja Asomiddinov</a></div>
    </div>
  );
}




export default About;
