
import React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

function SubForm() {
  const [value, setValue] = React.useState<number | null>(null);
  const [hover, setHover] = React.useState<number>(-1);

  const labels: Record<number, string> = {
    0.5: 'Terrible',
    1: 'Bad',
    1.5: 'Poor',
    // ... Add labels for other values
    5: 'Excellent',
  };

  const getLabelText = (value: number): string => {
    return labels[value];
  };

  return (
    <>
      <h2>Submission Form</h2>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(_, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
  
    </>
  );
}

export default SubForm;
