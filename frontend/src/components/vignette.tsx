import '../styles/EmployeeList.css';

const OvalVignette = ({ src, alt }) => (
    <div className='headshot-selected'>
        <img src={src} alt={alt} className='headshot-selectedcard'/>
        
    </div>
);

export default OvalVignette;
