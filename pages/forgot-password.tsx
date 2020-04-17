import React from "react";
import Layout from "../components/Layout";
import { Formik, Field } from "formik";
import { InputField } from "../components/fields/InputField";
import { ForgotPasswordComponent } from "../generated/apolloComponents";
import { useRouter } from "next/router";

export default () => {
  const router = useRouter();

  return (
    <Layout title="Forgot password page">
      <ForgotPasswordComponent>
        {forgotPassword => (
          <Formik
            onSubmit={async (data) => {
  
                const response = await forgotPassword({
                  variables: data
                });
                console.log(response);
                router.push("/check-email");
              }}
            initialValues={{
              email: "",
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="email"
                  placeholder="email"
                  component={InputField}
                />
                <button type="submit">forgot password</button>
              </form>
            )}
          </Formik>
        )}
      </ForgotPasswordComponent>
    </Layout>
  );
};
