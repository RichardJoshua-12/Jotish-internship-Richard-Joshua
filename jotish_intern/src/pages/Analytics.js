import { useEffect, useState } from "react";
import employees from "../data/employees";
import "./Analytics.css";

function Analytics() {

  const [auditImage, setAuditImage] = useState(null);
  const [citySalary, setCitySalary] = useState({});

  useEffect(() => {

    const storedImage = localStorage.getItem("auditImage");
    setAuditImage(storedImage);

    const data = employees.TABLE_DATA.data;

    const cityMap = {};

    data.forEach(emp => {

      const city = emp[2];
      const salary = parseInt(emp[5].replace(/[$,]/g, ""));

      if (!cityMap[city]) {
        cityMap[city] = 0;
      }

      cityMap[city] += salary;

    });

    setCitySalary(cityMap);

  }, []);

  const maxSalary = Math.max(...Object.values(citySalary));

  return (
    <div className="analytics-container">

      <h2>Employee Analytics</h2>

      <div className="audit-section">

        <h3>Audit Image</h3>

        {auditImage && (
          <img src={auditImage} alt="Audit Result" className="audit-image"/>
        )}

      </div>

      <div className="chart-section">

        <h3>Salary Distribution by City</h3>

        <svg width="600" height="300">

          {Object.entries(citySalary).map(([city, salary], index) => {

            const barHeight = (salary / maxSalary) * 200;
            const x = index * 80 + 50;
            const y = 250 - barHeight;

            return (
              <g key={city}>

                <rect
                  x={x}
                  y={y}
                  width="40"
                  height={barHeight}
                  fill="#2f80ed"
                />

                <text
                  x={x + 20}
                  y="270"
                  textAnchor="middle"
                  fontSize="12"
                >
                  {city}
                </text>

              </g>
            );

          })}

        </svg>

      </div>

    </div>
  );
}

export default Analytics;