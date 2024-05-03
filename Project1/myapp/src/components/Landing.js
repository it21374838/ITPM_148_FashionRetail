import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ChatbotPopup from "./ChatBot";
import "../components/CSS/Landing.css"// Imported CSS file 

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isParagraphVisible: false,
    };
  }

  componentDidMount() {
    // Delaying the visibility of the paragraph using a timeout
    setTimeout(() => {
      this.setState({ isParagraphVisible: true });
    }, 2000);
  }

  render() {
    const { isParagraphVisible } = this.state;
    return (
      <div className="landing-container">
        <Carousel className="landing-carousel">
          <Carousel.Item>
            <div className="carousel-image">
              <img
                className="d-block w-100"
                src="../img/Homepage1.jpeg"
                alt="First slide" />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-image">
              <img
                className="d-block w-100"
                src="../img/Homepage2.jpeg"
                alt="Second slide" />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-image">
              <img
                className="d-block w-100"
                src="../img/Homepage3.jpeg"
                alt="Third slide" />
            </div>
          </Carousel.Item>
        </Carousel>
        
        <div className="chatbot-container">
          <ChatbotPopup />
        </div>
        
        <div className="welcome-message">
          <h2>Welcome To LYDA Fashion!</h2>
          {isParagraphVisible && (
            <p>
              If you love something, wear it all the time... Find things that suit you. That's how you look extraordinary!
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Landing;
