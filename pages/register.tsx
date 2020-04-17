import React from 'react';
import Layout from '../components/Layout';
import { Formik, Field } from "formik";
import { InputField } from "../components/fields/InputField"
import { RegisterComponent } from '../generated/apolloComponents';
import { useRouter } from 'next/router'

export default () => {
  const router = useRouter();

  return (
    <Layout title="register page">
      <RegisterComponent>
        {register => (
          <Formik
          validateOnBlur={false}
          validateOnChange={false}
            onSubmit={async (data, { setErrors }) => {
              try {
              const response = await register({
                variables: {
                  data
                }
              });
              console.log(response);
              router.push('/check-email')
              } catch (err) {
              console.log('err: ', err.graphQLErrors);
              const errors: { [key: string]: string} = {};
              err.graphQLErrors[0].extensions.exception.validationErrors.forEach(
                (validationErr: any) => {
                  Object.values(
                    validationErr.constraints
                  ).forEach((message: any) => {
                    errors[validationErr.property] = message;
                  });
                }
              );
             console.log(errors);
             setErrors(errors)
              }
            }}
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              password: ""
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="firstName"
                  placeholder="firstName"
                  component={InputField}
                />
                <Field
                  name="lastName"
                  placeholder="lastName"
                  component={InputField}
                />
                <Field
                  name="email"
                  placeholder="email"
                  component={InputField}
                />
                <Field
                  name="password"
                  placeholder="password"
                  type="password"
                  component={InputField}
                />
                <button type="submit">submit</button>
              </form>
            )}
          </Formik>
        )}
      </RegisterComponent>
    </Layout>
  );
}