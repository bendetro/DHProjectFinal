import React from 'react';
import { Button } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { uploadImage } from '../../Adapters/API';

export function MyDropzone({
  setImageFile,
  setIsError,
  setLoading,
  setData,
}: any) {
  const onDrop = async (imageArray: any) => {
    setIsError(false);
    let reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      const binaryStr = reader.result;
      setImageFile(binaryStr);
    };
    reader.readAsDataURL(imageArray[0]);
    setLoading(true);

    const res = await uploadImage(imageArray).catch((e) => {
      setIsError(true);
      console.log(e);
    });

    setData(res?.data);
    setLoading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p style={{ color: '#000000' }}>Click Here to Upload Your Image</p>
      )}
      <input {...getInputProps()} />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </div>
  );
}
