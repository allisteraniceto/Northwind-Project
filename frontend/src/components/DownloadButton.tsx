import downloadButton from '../assets/download.png'; // Import the trashcan image
import '../styles/DownloadButton.css'; // Import the CSS file

const DownloadButton= () => {
    const handleClick = () => {
      // Add functionality for when the button is clicked
      console.log('Delete button clicked');
    };
  
    return (
      <button className="button" onClick={handleClick}>
        <img src={downloadButton} alt="downloadButton" className="download image" />
      </button>
    );
  };
  
  export default DownloadButton;