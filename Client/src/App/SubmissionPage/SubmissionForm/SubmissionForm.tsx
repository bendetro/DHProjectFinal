import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateDB } from '../../../Adapters/API';
import { Grid, Box, Button } from '@material-ui/core';
import {
  CustomEmailTextField,
  CustomNameTextField,
  CustomContentTextField,
} from './CustomFields';

export const SubmissionForm = ({ content, id, submittedCB }: any) => (
  <div>
    <Formik
      initialValues={{ email: '', name: '', content }}
      validate={(values) => {
        const errors = {} as any;
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        } else if (!values.name) {
          errors.name = 'Required';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        console.log('submitting');
        updateDB({ id, ...values });
        setTimeout(() => {
          console.log(JSON.stringify(values));
          setSubmitting(false);
          submittedCB();
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box maxWidth="350px">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  type="text"
                  name="content"
                  component={CustomContentTextField}
                  content={content}
                />
                <ErrorMessage name="content" component="div" />
              </Grid>
              <Grid item xs={6}>
                <Field
                  type="text"
                  name="name"
                  component={CustomNameTextField}
                />
                <ErrorMessage name="name" component="div" />
              </Grid>
              <Grid item xs={6} alignContent="flex-end">
                <Field
                  type="email"
                  name="email"
                  component={CustomEmailTextField}
                />
                <ErrorMessage name="email" component="div" />
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  </div>
);
