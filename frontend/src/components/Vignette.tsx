import '../styles/EmployeeList.css';
//import PropTypes from 'prop-types';


interface OvalVignetteProps {
    src: string;
    alt: string;
  }
  
  function OvalVignette ({ src, alt }: OvalVignetteProps) {
    return (
      <div>
        <img src={src ? src : "dogedance.gif"} alt={alt} className='headshot-selected'/>
      </div>
      );
  };
  
  export default OvalVignette;
  