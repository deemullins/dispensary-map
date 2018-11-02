import React, { Component } from 'react';
import './App.css';
import MapContainer from './Components/MapContainer';
import MapNav from"./Components/MapNav";
import * as FourSquareAPI from './APIs/FourSquare';

class App extends Component {
  state = {
    places: [
      { 
        name: "Urban Greenhouse Dispensary",
        location: {
          lat: 33.495483, 
          lng: -112.115571
        },
        img: '',
        likes: '',
        url: '',
        hours: '',
        contact: '',
        rating: ''
      },
      { 
        name: "TruMed Dispensary",
        location: {
          lat: 33.466291, 
          lng: -111.995227
        },
        img: '',
        likes: '',
        url: '',
        hours: '',
        contact: '',
        rating: ''
      },
      { 
        name: "The Mint Dispensary",
        location: {
          lat: 33.3771857, 
          lng: -111.9637771 
        },
        img: '',
        likes: '',
        url: '',
        hours: '',
        contact: '',
        rating: ''
      },
      { 
        name: "Harvest of Tempe Dispensary",
        location: {
          lat: 33.349676, 
          lng: -111.947591
        },
        img: '',
        likes: '',
        url: '',
        hours: '',
        contact: '',
        rating: ''
      },
      { 
        name: "Bloom Dispensary Phoenix",
        location: {
          lat: 33.4475244, 
          lng: -111.9919034
        },
        img: '',
        likes: '',
        url: '',
        hours: '',
        contact: '',
        rating: ''
      }
    ],
    currentPlaces: []
  };

  componentDidMount() {
    this.getFourSquareData();
  }

  // Fetch FourSquare data from API
  getFourSquareData = () => {
    const newPlaces = this.state.places.map((place) => {
      const size = 150
      FourSquareAPI.getFourSquareVenueID(place.location.lat, place.location.lng, place.name)
        .then((venueId) => {
          FourSquareAPI.getFourSquareVenueInfo(venueId)
            .then((venueInfo) => {
              place.img = venueInfo.bestPhoto.prefix + size + venueInfo.bestPhoto.suffix
              place.likes = venueInfo.likes.summary
              place.url = venueInfo.url
              place.hours = venueInfo.hours.status
              place.contact = venueInfo.contact.formattedPhone
              place.rating = venueInfo.rating
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
      return place;
    });
    this.setState({ currentPlaces: newPlaces });
  }
  
  // Filter a new array of current places based on user query
  filterPlaces = (query) => {  
    if (!query) {
      this.setState({ currentPlaces: [] });
    }
    const filteredPlaces = this.state.places.filter((place) => place.name.toLowerCase().includes(query.toLowerCase()));  
    this.setState({ currentPlaces: filteredPlaces });
  }

  // Set active marker when clicking list item
  setActiveMarker = (marker) => {
    document.querySelector(`[title="${marker}"]`).click();
  }

  render() {
    return (
      <div className="App">
        <MapNav places={this.state.currentPlaces} onQuery={this.filterPlaces} setActiveMarker={this.setActiveMarker}/>
        <MapContainer places={this.state.currentPlaces} centerCoords={this.state.places[0].location} activeMarker={this.state.activeMarker} showingInfoWindow={this.state.showingInfoWindow}/>  
      </div>
    );
  }
}

export default App;
