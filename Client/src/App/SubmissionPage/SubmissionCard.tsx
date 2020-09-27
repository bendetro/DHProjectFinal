import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Box } from '@material-ui/core';
import { SubmissionForm } from './SubmissionForm/SubmissionForm';
import { MyDropzone } from './MyDropzone';
import { Progress } from './Progress';

export function SubmissionCard() {
  const [imageFile, setImageFile] = useState(null as any);
  const [data, setData] = useState(null as any);
  const [loading, setLoading] = useState(false as any);
  const [submitted, setSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  return !submitted ? (
    <Card>
      {!isError && imageFile ? (
        <CardMedia>
          <Box padding={1}>
            <img src={imageFile} width="350px" height="350px" alt="" />
          </Box>
        </CardMedia>
      ) : null}
      <CardContent>
        {data && !loading ? (
          <SubmissionForm
            content={data.content}
            id={data.id}
            submittedCB={() => setSubmitted(true)}
          />
        ) : !data && loading ? (
          <Progress />
        ) : !data && !isError ? (
          <MyDropzone
            setImageFile={(img: any) => setImageFile(img)}
            setIsError={(res: any) => setIsError(res)}
            setLoading={(res: any) => setLoading(res)}
            setData={(res: any) => setData(res)}
          />
        ) : isError ? (
          <div>OCR Error - Please Refresh the Page and Upload again</div>
        ) : null}
      </CardContent>
    </Card>
  ) : (
    <Card>
      <CardContent>
        <div style={{ color: '#000000' }}>Thanks For Submitting!</div>
      </CardContent>
    </Card>
  );
}
