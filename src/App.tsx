import React, { useEffect } from 'react';

import axios from 'axios';

const App: React.FC = () => {
  const formData = {
    title: '11'
  };
  useEffect(() => {
    axios
      .post('/posts', formData)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [formData]);

  return (
    <div
      className='App'
      style={{ marginTop: '100px', marginLeft: '100px' }}
    ></div>
  );
};

export default App;
