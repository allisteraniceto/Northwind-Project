import '../styles/EmployeeList.css';
//import PropTypes from 'prop-types';


interface OvalVignetteProps {
    src: string;
    alt: string;
  }
  
  function OvalVignette ({ src, alt }: OvalVignetteProps) {
    return (
      <div className='headshot-selected'>
        <img src={src} alt={alt} className='headshot-selectedcard'/>
      </div>
      );
  };
  
  export default OvalVignette;
  