
import OvalVignette from './vignette';
import "../styles/Form.css"

import React from 'react';
import OvalVignette from './vignette';
import "../styles/Form.css";
import employees from '../path/to/employees.json';

const Rectangle = (EmployeeId): JSX.Element => {
    const employee = employees.find((emp) => emp.id === EmployeeId);
    const name = employee ? employee.name : '';

    return (
        <div>
            <div style={{
                width: '45vw',
                height: '15vh',
                backgroundColor: '#ffffff',
                position: "relative",
                padding: '5%',
                borderRadius: '10px',
            }}>
                <p>{first_name}</p>
                <p>{last_name}</p>
                <OvalVignette src="/pug.jpg" alt="Descriptive Alt Text" />
            </div>
        </div>
    );
};

export default Rectangle;
