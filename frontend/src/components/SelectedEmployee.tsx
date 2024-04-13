
import OvalVignette from './Vignette';

import "../styles/Form.css";
import employees from '../dummy-employees.json';
import "../styles/InteractionsPane.css"

interface SelectedEmployeeProps {
    EmployeeId: number | null;
}

function SelectedEmployee ({ EmployeeId }: SelectedEmployeeProps) {
    const employee = employees.employees.find(emp => emp.employee_id === EmployeeId);
    const name = employee ? `${employee.first_name} ${employee.last_name}` : '';
    const headshot = employee ? `${employee.headshot}` : '';

    return (
            <div className="selected-employee">
                <p>{name}</p>
                <OvalVignette src={headshot} alt="Descriptive Alt Text" />
            </div>
    );
};

export default SelectedEmployee;
