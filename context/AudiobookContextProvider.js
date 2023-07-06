import React, { createContext, useState } from 'react';

export const AudiobookContext = createContext();

const AudiobookContextProvider = ({ children }) => {
  const [currentAudiobookData, setCurrentAudiobookData] = useState();

  const handleUpdateAudiobookData = (item) => {
    const newData = {
      id: item.id,
      writer: item.authors[0].first_name + ' ' + item.authors[0].last_name,
      image: item.bookCover,
      length: item.totaltimesecs,
      title: item.title,
      description: item.description
    };

    setCurrentAudiobookData(newData);
  };

  const clearContextData = () => {
    setCurrentAudiobookData(null);
  };

  return (
    <AudiobookContext.Provider value={{ currentAudiobookData, handleUpdateAudiobookData, clearContextData }}>
      {children}
    </AudiobookContext.Provider>
  );
};

export default AudiobookContextProvider;
