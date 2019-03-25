import Grid from '@material-ui/core/Grid';
import { Field, FieldProps, FormikProps } from 'formik';
import React from 'react';
import FormError, { checkIfError } from 'src/common/components/FormError';
import Select from 'src/common/components/Select';
import TextArea from 'src/common/components/TextArea';
import TextInput from 'src/common/components/TextInput';
import { HostClassInput } from './types';

interface Props {
  formikProps: FormikProps<HostClassInput>;
}

const ClassGeneralDetails: React.FunctionComponent<Props> = ({
  formikProps: { errors, touched }
}) => {
  // TODO: get this from backend!
  // TOTEST
  const options = [
    { value: '', label: '' },
    { value: '100', label: 'Accounting' },
    { value: '200', label: 'Programming' }
  ];

  return (
    <Grid container>
      <Grid item xs={12}>
        <Field name="className">
          {({ field }: FieldProps<HostClassInput>) => (
            <TextInput
              {...field}
              label="Class name*"
              placeholder="Choose your class name. e.g. Piano lession, Yoga class, etc."
              error={checkIfError(errors.className, touched.className)}
            />
          )}
        </Field>
        <FormError error={errors.className} display={touched.className} />

        <Field name="classCategory">
          {({ field }: FieldProps<HostClassInput>) => (
            <Select
              {...field}
              label="Class category*"
              options={options}
              error={checkIfError(errors.classCategory, touched.classCategory)}
            />
          )}
        </Field>
        <FormError
          error={errors.classCategory}
          display={touched.classCategory}
        />

        <Field name="classDescription">
          {({ field }: FieldProps<HostClassInput>) => (
            <TextArea
              label="Class description"
              error={checkIfError(
                errors.classDescription,
                touched.classDescription
              )}
              rows={5}
              placeholder={'Tell the learners what your class is about'}
              {...field}
            />
          )}
        </Field>
      </Grid>
    </Grid>
  );
};

export default ClassGeneralDetails;
