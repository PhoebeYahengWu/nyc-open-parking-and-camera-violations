import React, { Component } from "react";
import SearchForm from "./components/SearchForm/index";
import ResultList from "./components/ResultList/index";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    violations: [],
    sel_violation: "",
    offet: 0,
    limit: 100,
    results: [],
    filtered: [],
  };

  componentDidMount() {
    this.setState(
      {
        sel_violation: "FRONT OR BACK PLATE MISSING",
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

  // advanceOffset = (val) => {
  //   if (val) {
  //     this.setState(
  //       {
  //         offet: this.state.offet + this.state.limit,
  //       },
  //       this.searchViolations
  //     );
  //   } else if (this.state.offet - this.state.limit >= 0) {
  //     this.setState(
  //       {
  //         offet: this.state.offet - this.state.limit,
  //       },
  //       this.searchViolations
  //     );
  //   }
  // };

  searchViolations = async () => {
    const res = await axios.get(
      `https://data.cityofnewyork.us/resource/nc67-uf89.json`,
      {
        params: {
          $offset: this.state.$offset,
          $limit: this.state.limit,
          violation: this.state.sel_violation
        },
      }
    );

    // const year = res.data.reduce(
    //   (a, y, i) =>
    //     (a = i
    //       ? (a + parseInt(y.issue_date.split("").splice(6).join(""))) / 2
    //       : parseInt(y.issue_date.split("").splice(6).join(""))),
    //   0
    // );
    // console.log(year);

    // console.log(res.data);

    this.setState({
      filtered: res.data,
    });
  };

  handleInputChange = (event) => {
    this.setState(
      {
        sel_violation: event.target.value,
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
              <h5>Choose Another Violation Type</h5>
              <SearchForm
                results={this.state.violations}
                handleInputChange={this.handleInputChange}
              />
              {/* <div className="alert alert-danger" role="alert">
                Number of Violations: {this.state.filtered.length}
              </div> */}
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <ResultList results={this.state.filtered} />
            </div>
          </div>

          {/* <div className="row">
          <div className="col-md-12 text-center mb-2">
            <button className="btn btn-outline-dark mr-1" onClick={() => this.advanceOffset(true)}>Prev</button>
              <button className="btn btn-outline-dark ml-1" onClick={() => this.advanceOffset(false)}>Next</button>
            </div>
          </div> */}
        </div>
      </>
    );
  }
}

export default App;
