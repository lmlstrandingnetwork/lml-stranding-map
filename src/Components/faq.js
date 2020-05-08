import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

function Faq() {
  return (
    <div>
      <h1>Frequently Asked Questions</h1>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            What is a stranding?
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Lorem ipsum dolor sit amet, primis ornatus convenire vel id, nam ne placerat postulant comprehensam. Sit ad quod omnes, sanctus tractatos suavitate quo id.</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            What is the Marine Mammal Stranding Network?
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>The Long Marine Lab Marine Mammal Stranding Network responds to dead seals and sea lions (pinnipeds) and whales, dolphins, and porpoises (cetaceans) in Santa Cruz County.  We also serve as the rehabiliation center in the rare event of a live stranded dolphin or porpoise.</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            What do you do with a drunken sailor?
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>Put him in the boat until he sober</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="3">
            Where can I learn more?
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body>The Long Marine Lab Marine Mammal Stranding Network responds to dead seals and sea lions (pinnipeds) and whales, dolphins, and porpoises (cetaceans) in Santa Cruz County.  We also serve as the rehabiliation center in the rare event of a live stranded dolphin or porpoise.</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="4">
            How can I get involved?
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="4">
            <Card.Body>The Long Marine Lab Marine Mammal Stranding Network responds to dead seals and sea lions (pinnipeds) and whales, dolphins, and porpoises (cetaceans) in Santa Cruz County.  We also serve as the rehabiliation center in the rare event of a live stranded dolphin or porpoise.</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}

export default Faq;
