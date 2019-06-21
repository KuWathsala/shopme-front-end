import React,{Component} from 'react'
import Map from './Map';

class Map_home extends Component{
    render(){
        return(
            <div>
                <Map
                    google={this.props.google}
                    center={{lat:6.9271,lng:79.8612}}
                    height='300px'
                    zoom={15}
                />
            </div>            
        );
    }
}

export default Map_home;