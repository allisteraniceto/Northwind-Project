import "../styles/Form.css"

import Rectangle from './rectangle';


const SelectedEmployee = () => (
    <div style={{ position: 'relative', 
    transform: 'translate(-10%, 2%)',
    justifyContent: 'flex-end', 
    margin: '0',
    padding: '0'
    }}>
        <div style={{ position: 'relative', top: 0, left: 0 }}>
            <Rectangle />
            
        </div>
    </div>
);

export default SelectedEmployee;
