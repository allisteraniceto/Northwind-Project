

const BackButton = () => 

{
  const goBack = () => {
    window.history.back();
  };

  return 
  ( <button onClick={goBack}>Back</button>
  );

};

export default BackButton;