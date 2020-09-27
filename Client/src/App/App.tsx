import React, { useState } from 'react';
import './App.css';
import { SubmissionPage } from './SubmissionPage/SubmissionPage';
import ButtonAppBar from './AppBar/AppBar';
import { DescriptionPage } from './DescriptionPage/DescriptionPage';

function App() {
  const [pageToPresent, setPageToPresent] = useState('SubmissionPage');
  return (
    <div className="App">
      <ButtonAppBar
        setPageToPresent={(page: string) => setPageToPresent(page)}
      />
      {pageToPresent === 'SubmissionPage' ? (
        <div className="App-header">
          <SubmissionPage />
        </div>
      ) : (
        <div className="DescriptionPage">
          <DescriptionPage />
        </div>
      )}
    </div>
  );
}

export default App;
