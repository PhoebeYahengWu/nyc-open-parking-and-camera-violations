import React from "react";
import { Pie, Bar, Line } from "react-chartjs-2";

function ResultList(props) {
  var colorArray = [
    "#FFB399",
    "#E6B3B3",
    "#6680B3",
    "#FF99E6",
    "#1AB399",
    "#4D8066",
  ];

  const LineChart = ({ type }) => {
    const obj = {};

    let options = {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Number of Violations Over Time",
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 0,
              stepSize: 1,
            },
            stacked: true,
          },
        ],
      },
    };

    props.results.forEach((arrest) => {
      const key = arrest[type];
      if (key)
        if (obj[key]) {
          obj[key] += 1;
        } else {
          obj[key] = 1;
        }
    });

    let entries =
      Object.entries(obj).sort((a, b) => (a[0] > b[0] ? 1 : -1)) || [];
    return (
      <Line
        data={{
          labels: entries.map((x) => x[0]),
          datasets: [
            {
              data: entries.map((x) => x[1]),
              backgroundColor: colorArray,
            },
          ],
        }}
        options={options}
      />
    );
  };

  const BarChart = ({ type, chart_title }) => {
    const obj = {};

    let options = {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: chart_title,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 0,
              stepSize: 1,
            },
            stacked: true,
          },
        ],
      },
    };

    props.results.forEach((arrest) => {
      const key = arrest[type];
      if (key)
        if (obj[key]) {
          obj[key] += 1;
        } else {
          obj[key] = 1;
        }
    });

    let entries =
      Object.entries(obj).sort((a, b) => (a[0] > b[0] ? 1 : -1)) || [];
    return (
      <Bar
        data={{
          labels: entries.map((x) => x[0]),
          datasets: [
            {
              data: entries.map((x) => x[1]),
              backgroundColor: colorArray,
            },
          ],
        }}
        options={options}
      />
    );
  };


  const PieChart = ({ type, chart_title }) => {
    const obj = {};

    let options = {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: chart_title,
      }
    };

    props.results.forEach((arrest) => {
      const key = arrest[type];
      if (key)
        if (obj[key]) {
          obj[key] += 1;
        } else {
          obj[key] = 1;
        }
    });

    let entries =
      Object.entries(obj).sort((a, b) => (a[0] > b[0] ? 1 : -1)) || [];
    return (
      <Pie
        data={{
          labels: entries.map((x) => x[0]),
          datasets: [
            {
              data: entries.map((x) => x[1]),
              backgroundColor: colorArray,
            },
          ],
        }}
        options={options}
      />
    );
  };


  return (
    <div className="container-fluid mb-2">
      <div className="row mt-2">
        <div
          className="col-md-6"
          style={{ paddingLeft: "2px", paddingRight: "2px" }}
        >
          <div className="card" style={{ paddingBottom: "2px" }}>
            <LineChart type="issue_date" />
          </div>
        </div>

        <div
          className="col-md-6"
          style={{ paddingLeft: "2px", paddingRight: "2px" }}
        >
          <div className="card" style={{ paddingBottom: "2px" }}>
            <BarChart type="fine_amount" chart_title="Fine Amount" />
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <div
          className="col-md-6"
          style={{ paddingLeft: "2px", paddingRight: "2px" }}
        >
          <div className="card" style={{ paddingBottom: "2px" }}>
            <PieChart type="issuing_agency" chart_title="Issuing Agency" />
          </div>
        </div>

        <div
          className="col-md-6"
          style={{ paddingLeft: "2px", paddingRight: "2px" }}
        >
          <div className="card" style={{ paddingBottom: "2px" }}>
            <BarChart type="reduction_amount" chart_title="Reduction Amount" />
          </div>
        </div>
      </div>

      <div className="row mt-2">
      <div
          className="col-md-6"
          style={{ paddingLeft: "2px", paddingRight: "2px" }}
        >
          <div className="card" style={{ paddingBottom: "2px" }}>
            <PieChart type="license_type" chart_title="License Type" />
          </div>
        </div>

        <div
          className="col-md-6"
          style={{ paddingLeft: "2px", paddingRight: "2px" }}
        >
          <div className="card" style={{ paddingBottom: "2px" }}>
            <BarChart type="violation_status" chart_title="Violation Status" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultList;
