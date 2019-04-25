import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Tooltip from '@material-ui/core/Tooltip';
import { css } from 'emotion';
import { FormikErrors, FormikTouched } from 'formik';
import React from 'react';
import FormFieldArray from 'src/common/components/FormFieldArray';
import IconButton from 'src/common/components/IconButton';
import Select from 'src/common/components/Select';
import Text from 'src/common/components/Text';
import TextInput from 'src/common/components/TextInput';
import { spacingRem } from 'src/common/helpers/spacing';
import { dayOptions, sessionTimeOptions } from '../../constants';
import { ClassSession, ClassSessionsInput } from '../../types';

const sessionContainerClassName = css`
  margin-bottom: ${spacingRem(2)}rem;
`;

interface Props {
  index: number;
  duplicateSession: () => void;
  removeSession: () => void;
  errors: FormikErrors<ClassSessionsInput>;
  touched: FormikTouched<ClassSessionsInput>;
}

const SessionBlock: React.FunctionComponent<Props> = ({
  index,
  duplicateSession,
  removeSession,
  errors,
  touched
}) => {
  const actionButtons = (
    <>
      <Tooltip title="Duplicate session">
        <IconButton
          buttonType="button"
          icon="duplicate"
          aria-label="Duplicate session"
          onClick={duplicateSession}
        />
      </Tooltip>
      <Tooltip title="Delete session">
        <IconButton
          buttonType="button"
          icon="delete"
          aria-label="Delete session"
          onClick={removeSession}
        />
      </Tooltip>
    </>
  );

  return (
    <div className={sessionContainerClassName}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={6} sm={12}>
          <Text>Session #{index + 1}</Text>
        </Grid>
        <Hidden smUp>
          <Grid item xs>
            <Grid container justify="flex-end">
              <Grid item>{actionButtons}</Grid>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
      <Grid container justify="space-between" spacing={8}>
        <Grid item xs={12} sm={3}>
          <FormFieldArray<ClassSessionsInput, ClassSession>
            name="sessions"
            property="day"
            index={index}
            errors={errors}
            touched={touched}
          >
            {({ field }) => (
              <Select {...field} options={dayOptions} label="Day of the week" />
            )}
          </FormFieldArray>
        </Grid>

        <Grid item xs={6} sm={2}>
          <FormFieldArray<ClassSessionsInput, ClassSession>
            name="sessions"
            property="startTime"
            index={index}
            errors={errors}
            touched={touched}
          >
            {({ field }) => (
              <Select
                {...field}
                options={sessionTimeOptions}
                label="Start time"
              />
            )}
          </FormFieldArray>
        </Grid>

        <Grid item xs={6} sm={2}>
          <FormFieldArray<ClassSessionsInput, ClassSession>
            name="sessions"
            property="endTime"
            index={index}
            errors={errors}
            touched={touched}
          >
            {({ field }) => (
              <Select
                {...field}
                options={sessionTimeOptions}
                label="End time"
              />
            )}
          </FormFieldArray>
        </Grid>

        <Grid item xs={12} sm={2}>
          <FormFieldArray<ClassSessionsInput, ClassSession>
            name="sessions"
            property="capacity"
            index={index}
            errors={errors}
            touched={touched}
          >
            {({ field }) => (
              <TextInput {...field} type="number" label="No. of learners" />
            )}
          </FormFieldArray>
        </Grid>

        <Grid container item xs={12} sm={2} alignItems="center">
          <Hidden xsDown>
            <Grid item xs>
              {actionButtons}
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
    </div>
  );
};

export default SessionBlock;