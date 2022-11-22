import { withRouter } from "react-router";
import React from "react";
import Container from "react-bootstrap/Container";
import "./About.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import rd from '../Images/rd.jpg';
import jl from '../Images/jl.jpg';
import ms from '../Images/ms.jpeg';

function About() {
  return (     
    
    <div class="border-custom">
      <Container>
        <h1 class="h1-title">Meet the Teams</h1>

        <h2 class="h2-title"><u>Research Team:</u></h2>

        <div class="row justify-content-center">

          <div class="col-sm-3 custom-padding">
            <div class="card">
              <img class="card-img-top" src={rd} alt="Logo"/>
              <div class="card-body">
                <h5 class="card-title">Robin Dunkin</h5>
                <p class="card-text">Dr. Robin Dunkin is the Marine Mammal Stranding Operations manager for The Long Marine Lab Stranding Network.</p>
              </div>
            </div>
          </div>

          <div class="col-sm-3 custom-padding">
            <div class="card">
              <img class="card-img-top" src={jl} alt="Logo"/>
              <div class="card-body">
                <h5 class="card-title">Juliana Limon</h5>
                <p class="card-text">Juliana Limon is a Stranding Technician for the Long Marine Lab Stranding Network.</p>
              </div>
            </div>
          </div>

          <div class="col-sm-3 custom-padding">
            <div class="card">
              <img class="card-img-top" src={ms} alt="Logo"/>
              <div class="card-body">
                <h5 class="card-title">Maia Smith</h5>
                <p class="card-text">Maia Smith is a Stranding Technician for the Long Marine Lab Stranding Network.</p>
              </div>
            </div>
          </div>

        </div>

        <h2 class="h2-title"><u>Software Team 2022:</u></h2>

        <div class="row justify-content-center">
          <div class="col-sm-4 custom-padding">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Christopher Jensen</h5>
                <h6 class="card-subtitle mb-2 text-muted">chjjense@ucsc</h6>
                <p class="card-text">Computer Engineering student at UCSC</p>
                <div>
                    <Button href="https://www.linkedin.com/in/christopherjensen-998117177?trk=profile-badge" variant="primary">LinkedIn</Button>{' '}
                    <Button href="https://github.com/chrisjjensen12" variant="dark">Github</Button>
                </div>
              </div>
            </div>  
          </div>
          <div class="col-sm-4 custom-padding">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Anirudh Reddy</h5>
                <h6 class="card-subtitle mb-2 text-muted">akreddy@ucsc.edu</h6>
                <p class="card-text">Computer Engineering student at UCSC</p>
                <div>
                </div>
              </div>
            </div>  
          </div>
          <div class="col-sm-4 custom-padding">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Isha Manglik</h5>
                <h6 class="card-subtitle mb-2 text-muted">imanglik@ucsc.edu</h6>
                <p class="card-text">Computer Engineering student at UCSC</p>
                <div>
                    <Button href='https://www.linkedin.com/in/isha-manglik?trk=profile-badge' variant="primary">LinkedIn</Button>{' '}
                    <Button href="https://github.com/imanglik" variant="dark">Github</Button>
                </div>
              </div>
            </div>  
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-sm-4 custom-padding">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Sydney Deharo</h5>
                <h6 class="card-subtitle mb-2 text-muted">sdeharo@ucsc.edu</h6>
                <p class="card-text">Computer Engineering student at UCSC</p>
                <div>
                    <Button href="https://github.com/ssdeharo" variant="dark">Github</Button>
                </div>
              </div>
            </div>  
          </div>
          <div class="col-sm-4 custom-padding">
            <div class="card" >
              <div class="card-body">
                <h5 class="card-title">Ryoji Duey</h5>
                <h6 class="card-subtitle mb-2 text-muted">rduey@ucsc.edu</h6>
                <p class="card-text">Computer Science student at UCSC</p>
                <div>
                    <Button href="https://www.linkedin.com/in/ryojiduey?trk=profile-badge" variant="primary">LinkedIn</Button>{' '}
                </div>
              </div>
            </div>  
          </div>
        </div>

        <h2 class="h3-title"><u>Software Team 2021:</u></h2>

        <div class="row justify-content-center">
          <div class="col-sm-3 custom-padding">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Deeksha Manjunath</h5>
                <p class="card-text"></p>
                <div>
                    <Button href='https://www.linkedin.com/in/deeksha-manjunath-63ab18168?trk=profile-badge' variant="primary">LinkedIn</Button>{' '}
                </div>
              </div>
            </div>  
          </div>
          <div class="col-sm-3 custom-padding">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Benson Ho</h5>
                <p class="card-text"></p>
                <div>
                    <Button href='https://www.linkedin.com/in/benson-ho-4221a5149?trk=profile-badge' variant="primary">LinkedIn</Button>{' '}
                </div>
              </div>
            </div>  
          </div>
          <div class="col-sm-3 custom-padding">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Junru Zhou</h5>
                <p class="card-text"></p>
                <div>
                    <Button href='https://www.linkedin.com/in/junru-zhou?trk=profile-badge' variant="primary">LinkedIn</Button>{' '}
                </div>
              </div>
            </div>  
          </div>
          <div class="col-sm-3 custom-padding">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Ethan Perlada</h5>
                <p class="card-text"></p>
                <div>
                    <Button href='https://www.linkedin.com/in/ethan-perlada?trk=profile-badge' variant="primary">LinkedIn</Button>{' '}
                </div>
              </div>
            </div>  
          </div>
        </div>

        <h2 class="h3-title"><u>Software Team 2020:</u></h2>

        <div class="row justify-content-center">

          <div class="col-sm-3 custom-padding">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Pavel Yakovlev</h5>
                <p class="card-text"></p>
                <div>
                    <Button href='https://www.linkedin.com/in/yakovlevpavel?trk=profile-badge' variant="primary">LinkedIn</Button>{' '}
                </div>
              </div>
            </div>  
          </div>

          <div class="col-sm-3 custom-padding">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Ashley Pauley</h5>
                <p class="card-text"></p>
                <div>
                    <Button href='https://www.linkedin.com/in/ashley-pauley-862883199?trk=profile-badge' variant="primary">LinkedIn</Button>{' '}
                </div>
              </div>
            </div>  
          </div>

          <div class="col-sm-3 custom-padding">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Maya Apotheker</h5>
                <p class="card-text"></p>
                <div>
                    <Button href='https://www.linkedin.com/in/maya-apotheker-b7a139172?trk=profile-badge' variant="primary">LinkedIn</Button>{' '}
                </div>
              </div>
            </div>  
          </div>
          
          <div class="col-sm-3 custom-padding">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Natalie W.</h5>
                <p class="card-text"></p>
                <div>
                    <Button href='https://www.linkedin.com/in/natalie-w-08b4639b?trk=profile-badge' variant="primary">LinkedIn</Button>{' '}
                </div>
              </div>
            </div>  
          </div>
          <div class="col-sm-3 custom-padding">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Azizkhuja Asomiddinov</h5>
                <p class="card-text"></p>
                <div>
                    <Button href='https://www.linkedin.com/in/azizkhuja?trk=profile-badge' variant="primary">LinkedIn</Button>{' '}
                </div>
              </div>
            </div>  
          </div>
          <div class="col-sm-3 custom-padding">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Harrison Fox</h5>
                <p class="card-text"></p>
                <div>
                    <Button href='https://www.linkedin.com/in/harrison-fox-775323193?trk=profile-badge' variant="primary">LinkedIn</Button>{' '}
                </div>
              </div>
            </div>  
          </div>
        </div>

      </Container>
    </div>   
      
  );
}


export default withRouter(About);
