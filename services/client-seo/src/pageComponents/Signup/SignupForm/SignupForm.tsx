import { useState, FunctionComponent } from "react";
import { Grid } from "@material-ui/core";
import { useFetch, FormError, FormikTextInput } from "@/shared/frontend-components";
import { Anchor, StandardSpace, Text } from "@/shared/ui";
import { ButtonX } from "@/common";
import { signupSchema } from "@/shared/validations";
import { useFormik } from "formik";
import { LinkLogin, generateUrlPrivacyPolicy, generateUrlTermAndConditions, generateUrlXhrSignup } from "@/routes";

export interface SignupFormProps {
  redirectDestination: string;
  onCompleted: () => void;
}

const SignupForm: FunctionComponent<SignupFormProps> = ({ redirectDestination, onCompleted }) => {
  const [generalError, setGeneralError] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [post, { loading }] = useFetch({
    url: generateUrlXhrSignup(),
    method: "POST",
    onError: () => setGeneralError("Please fill in all the details"),
    onCompleted: (data) => {
      if (data === "email already exists") {
        setGeneralError("Email already exists");
      } else {
        setIsCompleted(true);
        onCompleted();
      }
    },
  });
  const formik = useFormik<{ firstName: string; lastName: string; email: string; password: string }>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (data) => {
      post({
        body: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <FormikTextInput formik={formik} name="email" label="Email" />
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <FormikTextInput formik={formik} name="firstName" label="First name" />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormikTextInput formik={formik} name="lastName" label="Last name" />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <FormikTextInput formik={formik} name="password" type="password" label="Password" />
        </Grid>
      </Grid>

      <FormError error={generalError} />

      <Text gutterBottom>
        Already have an account? <LinkLogin urlParams={{ query: { redirect: redirectDestination } }}>Log in</LinkLogin>
      </Text>

      <StandardSpace size={1} />

      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <ButtonX type="submit" loading={loading || isCompleted}>
            Sign Up
          </ButtonX>
        </Grid>
      </Grid>

      <StandardSpace size={1} />

      <Text variant="body2">
        By clicking Sign Up, you agree to our{" "}
        <Anchor target="_blank" href={generateUrlTermAndConditions()}>
          Terms {`&`} Conditions
        </Anchor>{" "}
        ,{" "}
        <Anchor target="_blank" href={generateUrlPrivacyPolicy()}>
          Privacy Policy
        </Anchor>
      </Text>
    </form>
  );
};

export default SignupForm;
