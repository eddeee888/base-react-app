import Grid from '@material-ui/core/Grid';
import { Field, FieldProps, Form, Formik, FormikActions } from 'formik';
import React from 'react';
import { LoginInput } from 'src/__generated__/globalTypes';
import Button from 'src/common/components/Button';
import FormError, {
  checkIfError,
  FormErrorProps
} from 'src/common/components/FormError';
import Link from 'src/common/components/Link';
import Text from 'src/common/components/Text';
import TextInput from 'src/common/components/TextInput';
import { linkgen, Paths } from 'src/common/helpers/pathing';
import useUrlQuery from 'src/common/hooks/useUrlQuery';
import * as Yup from 'yup';

export type LoginFormikFn = (
  formValues: LoginInput,
  actions: FormikActions<LoginInput>
) => void;

interface Props {
  onSubmit: LoginFormikFn;
  generalFormError: FormErrorProps;
  isSubmitting: boolean;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required')
});

const LoginFormComponent: React.FunctionComponent<Props> = ({
  onSubmit,
  generalFormError,
  isSubmitting
}) => {
  const query = useUrlQuery();

  return (
    <Formik<LoginInput>
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Grid container>
            <Grid item xs={12}>
              <Field
                name="email"
                render={({ field }: FieldProps) => (
                  <TextInput
                    {...field}
                    label="Email"
                    error={checkIfError(errors.email, touched.email)}
                  />
                )}
              />
              <FormError error={errors.email} display={touched.email} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Field
                name="password"
                render={({ field }: FieldProps) => (
                  <TextInput
                    {...field}
                    type="password"
                    label="Password"
                    error={checkIfError(errors.password, touched.password)}
                  />
                )}
              />
              <FormError error={errors.password} display={touched.password} />
            </Grid>
          </Grid>

          <FormError {...generalFormError} />

          <Text gutterBottom>
            Don't have an account?{' '}
            <Link to={linkgen(Paths.signup, { query })}>Sign up</Link>
          </Text>

          <Button type="submit" disabled={isSubmitting}>
            Log in
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginFormComponent;
