import '../styles/EmployeeList.css';
//import PropTypes from 'prop-types';




interface OvalVignetteProps {
    src: string;
    alt: string;
  }
  
  const OvalVignette: React.FC<OvalVignetteProps> = ({ src, alt }) => (
    <div className='headshot-selected'>
      <img src={src} alt={alt} className='headshot-selectedcard'/>
    </div>
  );
  
  export default OvalVignette;
  