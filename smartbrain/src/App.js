import React, { Component } from 'react';
import Nav from './components/Nav';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition';
import './App.css';
import particlesConfig from './particles';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '00901fec7bca497c985778eb0a680ef5'
 });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  } 
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({
      box: box
    })
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value,
    })
  }

  btnClick = () => {
    this.setState({
      imageUrl: this.state.input,
    })
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response))
          .catch(err => console.log(err))
      );
  }

  render() {
    return (
      <div className="App">
        <Particles 
          className='particles'
          params={particlesConfig}
        />
        <Nav />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          btnClick={this.btnClick}  
        />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
