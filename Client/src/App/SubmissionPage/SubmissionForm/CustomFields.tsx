import React from 'react';
import { TextField, Box, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const CustomEmailTextField = ({ form }: any) => {
  return (
    <Box>
      <TextField
        required
        id="standard-required"
        label="Email"
        defaultValue={''}
        multiline
        onChange={(e: { currentTarget: { value: any } }) =>
          form.setFieldValue('email', e.currentTarget.value)
        }
      />
    </Box>
  );
};

export const CustomNameTextField = ({ form }: any) => {
  return (
    <Box>
      <TextField
        required
        id="standard-required"
        label="Name"
        defaultValue={''}
        multiline
        onChange={(e: { currentTarget: { value: any } }) =>
          form.setFieldValue('name', e.currentTarget.value)
        }
      />
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  customWidth: {
    maxWidth: 350,
  },
}));

export const CustomContentTextField = ({ form, content }: any) => {
  const classes = useStyles();

  return (
    <Box marginTop="24px">
      <Tooltip
        classes={{ tooltip: classes.customWidth }}
        title={
          'This Content has been extracted by Google Cloud Vision API.\nPlease Edit it to match Image content Correctly.'
        }
        placement="top"
        arrow
      >
        <TextField
          style={{ textAlign: 'center' }}
          required
          id="standard-required"
          label="Content"
          defaultValue={content}
          multiline
          onChange={(e: { currentTarget: { value: any } }) =>
            form.setFieldValue('content', e.currentTarget.value)
          }
          variant="filled"
          fullWidth
        />
      </Tooltip>
    </Box>
  );
};
