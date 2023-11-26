import React, { useState } from 'react';

const WorkoutAddButton: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handlePlusButtonClick = () => {
    // Perform actions when the plus button is clicked
    // For this example, you can log the entered string
    console.log('Entered string:', inputValue);
  };

  return (
    <div>
      <button onClick={handlePlusButtonClick}>+</button>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a string"
      />
    </div>
  );
};

export default WorkoutAddButton;