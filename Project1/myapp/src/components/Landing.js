import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';

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
      <Carousel>
   <div style={{ backgroundColor: '#f2f2f2', padding: '20px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome To LYDA Fashion!</h2>
          {isParagraphVisible && (
            <p style={{ textAlign: 'center', fontSize: '18px', color: 'black', fontStyle: 'italic' }}>
            If you love something, wear it all the time... Find things that suit you. That's how you look extraordinary !
            </p>
          )}
        </div>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="../img/Homepage1.jpeg"
            alt="First slide"
          />
       
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="../img/Homepage2.jpeg"
            alt="Second slide"
          />
          
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="../img/Homepage3.jpeg"
            alt="Third slide"
          />
        
        </Carousel.Item>

      </Carousel>
      
      
    );
  }
}

export default Landing;
