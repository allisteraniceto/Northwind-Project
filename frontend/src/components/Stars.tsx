// /src/components/Star.tsx
import React from 'react';
import { FaStar } from 'react-icons/fa';

interface StarProps {
  selected: boolean;
  onClick: () => void;
}

const Star: React.FC<StarProps> = ({ selected, onClick }) => (
  <FaStar
    className={selected ? 'star full' : 'star empty'}
    onClick={onClick}
  />
);

export default Star;
