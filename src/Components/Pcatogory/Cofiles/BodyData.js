import React, { Component } from 'react';
class BodyData extends React.Component {
    state = {
      query: "",
      data: [],
      filteredData: []
    };
  
    handleInputChange = event => {
      const query = event.target.value;
  
      this.setState(prevState => {
        const filteredData = prevState.data.filter(element => {
          return element.name.toLowerCase().includes(query.toLowerCase());
        });
  
        return {
          query,
          filteredData
        };
      });
    };
  
    getData = () => {
      fetch(`https://backend-webapi20191102020215.azurewebsites.net/api/products/`)
        .then(response => response.json())
        .then(data => {
          const { query } = this.state;
          const filteredData = data.filter(element => {
            return element.name.toLowerCase().includes(query.toLowerCase());
          });
  
          this.setState({
            data,
            filteredData
          });
        });
    };
  
    componentWillMount() {
      this.getData();
    }
  
    render() {
      return (
        <div className="searchForm">
          <form>
            <input
              placeholder="Search for..."
              value={this.state.query}
              onChange={this.handleInputChange}
            />
          </form>
          <div>{this.state.filteredData.map(i => <p>{i.name}</p>)}</div>
        </div>
      );
    }
  }
  export default BodyData;