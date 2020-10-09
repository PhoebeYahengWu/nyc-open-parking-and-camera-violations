import React, { Component } from "react";
import SearchForm from "./components/SearchForm/index";
import ResultList from "./components/ResultList/index";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    violations: [],
    sel_violation: "",
    results: [],
    filtered: []
  };

  componentDidMount() {
    this.setState(
      {
        sel_violation: "DOUBLE PARKING",
      },
      this.searchViolations
    );
    this.searchviolationType();
  }

  searchviolationType = async () => {
    try {
      const res = await axios.get(
        "https://data.cityofnewyork.us/resource/nc67-uf89.json?$group=violation&$select=violation"
      );
      this.setState({
        violations: res.data.map((x) => x.violation),
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  searchViolations = async () => { 
    const res = await axios.get(
      `https://data.cityofnewyork.us/resource/nc67-uf89.json`,
      {
        params: {
          violation: this.state.violation
        },
      }
    );
    this.setState({
      filtered: res.data,
    });
  };

  handleInputChange = (event) => {
    this.setState(
      {
        sel_ofns: event.target.value,
      },
      this.searchViolations
    );
  };

  render() {
    return (
      <>
        <nav className="navbar navbar-light bg-dark">
          <span className="navbar-brand mb-0 h1 text-white pt-1">
          NYC Open Parking and Camera Violations
          </span>
        </nav>
        <div className="container-fluid">
          <div className="row mt-2">
            <div className="col-md-12">
            <h5 className="text-center">Choose Another Violation Type</h5> 
              <SearchForm
                results={this.state.violations}
                handleInputChange={this.handleInputChange}
              />
              <div className="alert alert-danger" role="alert">
                Number of Violations: {this.state.filtered.length}
              </div>
            </div>

          </div>

          <div className="row">
          <div className="col-md-12 mt-2">
              <ResultList results={this.state.filtered} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
