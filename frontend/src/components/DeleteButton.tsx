import React from 'react';
import trashcan from '../assets/trash.png'; // Import the trashcan image
import '../styles/DeleteButton.css'; // Import the CSS file

const DeleteButton = () => {
  
    const handleClick = () => {
        // Add functionality for when the button is clicked
        console.log('Delete button clicked');
    };

    return (
        <button className="button" onClick={handleClick}>
        <img src={trashcan} alt="Trashcan" className="image" />
        </button>
    );
    };

export default DeleteButton;