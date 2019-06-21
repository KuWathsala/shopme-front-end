import React,{Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
  import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';


class Thirdtab extends Component{
  
  render(){
    const style = {
  width: '80%',
  height: '80%'
}
    return (
      <div style={{height:"800px", width:"100% "}}>
        <Map google={this.props.google} zoom={14} 
      initialCenter={{
        lat: 6.934256,
        lng: 79.844821
      }}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
             {/*} <h1>{this.state.selectedPlace.name}</h1>*/}
            </div>
        </InfoWindow>
      </Map>
      </div>
    );
  }
  }

  export default GoogleApiWrapper({
    apiKey: ("AIzaSyDfp50rT_iIa365h388F4TjLEWBS39S2kM")
  })(Thirdtab)
