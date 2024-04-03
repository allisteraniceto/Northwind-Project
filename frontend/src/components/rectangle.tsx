
import OvalVignette from './vignette';
import "../styles/Form.css"
import React from 'react';
import axios from 'axios';
import "../styles/Form.css";
import employees from '../dummy-employees.json';

const Rectangle = (EmployeeId: number): JSX.Element => {
    const employee = employees.employees.find(emp => emp.employee_id === EmployeeId);
    const name = employee ? `${employee.first_name} ${employee.last_name}` : '';

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
                <p>{name}</p>
                <OvalVignette src="/pug.jpg" alt="Descriptive Alt Text" />
            </div>
        </div>
    );
};

export default Rectangle;
