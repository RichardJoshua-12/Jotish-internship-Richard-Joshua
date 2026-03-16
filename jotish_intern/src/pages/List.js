import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import employees from "../data/employees";
import "./List.css";

function List() {
  const [data, setData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const containerRef = useRef(null);
  const navigate = useNavigate();

  const rowHeight = 50;
  const visibleRows = 10;
  const buffer = 5;

  useEffect(() => {
    setData(employees.TABLE_DATA.data);
  }, []);

  const handleScroll = () => {
    const scrollTop = containerRef.current.scrollTop;

    const firstVisibleRow = Math.floor(scrollTop / rowHeight);

    const newStartIndex = Math.max(0, firstVisibleRow - buffer);

    setStartIndex(newStartIndex);
  };

  const endIndex = Math.min(data.length, startIndex + visibleRows + buffer * 2);

  const visibleData = data.slice(startIndex, endIndex);

  const offsetY = startIndex * rowHeight;

  return (
    <div className="list-container">
      <h2>Employee List</h2>

      <div className="row header">
        <div className="cell">EMP ID</div>
        <div className="cell">Name</div>
        <div className="cell">Position</div>
        <div className="cell">Office</div>
        <div className="cell">Start Date</div>
        <div className="cell">Salary</div>
        <div className="cell">Action</div>
      </div>

      <div
        className="table-container"
        ref={containerRef}
        onScroll={handleScroll}
      >
        <div className="spacer" style={{ height: data.length * rowHeight }}>
          <div
            className="rows"
            style={{ transform: `translateY(${offsetY}px)` }}
          >
            {visibleData.map((emp, index) => (
              <div className="row" key={startIndex + index}>
                <div className="cell">{emp[3]}</div>
                <div className="cell">{emp[0]}</div>
                <div className="cell">{emp[1]}</div>
                <div className="cell">{emp[2]}</div>
                <div className="cell">{emp[4]}</div>
                <div className="cell">{emp[5]}</div>

                <div className="cell">
                  <button
                    className="verify-btn"
                    onClick={() => navigate(`/details/${emp[3]}`)}
                  >
                    Verify
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;