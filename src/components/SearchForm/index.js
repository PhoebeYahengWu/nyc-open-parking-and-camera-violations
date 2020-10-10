import React from "react";
import "./style.css";

function SearchForm({ results, handleInputChange }) {
  return (
    <div className="input-group mb-2">
      <select
        className="custom-select"
        id="inputGroupSelect01"
        onChange={handleInputChange}
      >
       <option value="FRONT OR BACK PLATE MISSING" selected="selected">FRONT OR BACK PLATE MISSING</option>
        {results.map((ele, i) => (
          <option key={i + "-el"} value={ele}>
            {ele}
          </option>
        ))}
      </select>
    </div>
  );
}



export default SearchForm;
