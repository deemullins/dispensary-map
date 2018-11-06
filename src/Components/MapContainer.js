import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
  state = {
    bounds: {},
    selectedPlace: {},
    likes: '',
    img: '',
    url: '',
    hours: '',
    contact: '',
    rating: '',
    activeMarker: {},
    showingInfoWindow: true,
    center: {}
  };

  componentDidMount() {
    this.setBounds();
    this.setState({ center: this.props.centerCoords.location })
  }

  // Set map bounds
  setBounds = () => {
    const bounds = new this.props.google.maps.LatLngBounds();
    for (let place of this.props.places) {
      bounds.extend(place.location);
    }
    this.setState({ bounds });
  }

  // Display InfoWindow with marker data on click
  onMarkerClick = (props, marker) => {
    const place = this.props.places.filter((place) => place.name === props.title)
    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
      selectedPlace: place[0],
    });
  }

  render() {
    const mapStyle = {
      width: '100%',
      height: '100%'
    };

    return (
      <div>
        <Map 
          google={this.props.google} 
          zoom={14} 
          style={mapStyle} 
          center={this.state.center}
          bounds={this.state.bounds}
        >
          {this.props.places.map((place, i) => 
            <Marker 
              key={i}
              name={place.name}
              title={place.name}
              position={{lat: place.location.lat, lng: place.location.lng}}
              onClick={this.onMarkerClick}
              animation={this.state.activeMarker.name === place.name && this.props.google.maps.Animation.BOUNCE}
            />
          )}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
              <img src={this.state.selectedPlace.img} alt={this.state.selectedPlace.name}/>
              <h3>Website: {this.state.selectedPlace.url}</h3>
              <h3>Hours: {this.state.selectedPlace.hours}</h3>
              <h3>Contact: {this.state.selectedPlace.contact}</h3>
              <h3>Rating: {this.state.selectedPlace.rating}</h3>
              <h3>{this.state.selectedPlace.likes}</h3>
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDz8Lb7O02uGC1hF0WtlxMnZLjYEE9cZnM'
})(MapContainer);