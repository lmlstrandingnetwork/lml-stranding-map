import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

function Faq() {
  return (
    <div>
      <h1>Frequently Asked Questions</h1>
      <Accordion defaultActiveKey="0">
        
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
            How often is there a stranding? 
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>There is no normal. Stranding events can be random. We have normal perks in spring due to pupping seasons, but the amount of stranding a year could be 40 or could be 100. On average we get about 50-60 stranding a year.</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="3">
            What do you mostly respond to?
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body>Our most frequent response is to California sea lions. We also respond to many harbor seals too. Our most frequent cetacean is the harbor porpoise, however we respond to a wide variety of whales and dolphins.</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="4">
            What do you do with the animals?
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="4">
            <Card.Body>Most of them we just take level A data on, but if they are fresh or a species of concern then we will perform a necropsy to take lots of samples and try to understand why the animal has died.</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}

export default Faq;
