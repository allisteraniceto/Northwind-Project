import downloadButton from '../assets/download.png'; // Import the trashcan image
import '../styles/DownloadButton.css'; // Import the CSS file

import '../styles/DownloadButton.css'; // Import the CSS file
interface DownloadButtonProps {
  fileUrl: string; // Define the type of fileUrl as string
}

function DownloadButton({ fileUrl }: DownloadButtonProps) {
  const handleClick = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank'); // Open the file URL in a new tab
    } else {
      console.error('File URL is missing.');
    }
  };

  return (
    <button className="download-button" onClick={handleClick}>
      <img src={downloadButton} alt="Download" className="download-icon" />
    </button>
  );
}

export default DownloadButton;
