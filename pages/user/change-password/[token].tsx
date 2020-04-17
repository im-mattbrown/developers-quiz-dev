import React from "react";
import Layout from "../../../components/Layout";
import { Formik, Field } from "formik";
import  { NextPageContext } from 'next'
import { InputField } from "../../../components/fields/InputField";
import { ChangePasswordComponent } from "../../../generated/apolloComponents";
import { useRouter } from "next/router";

const ChangePassword = ({token}: {token: string}) => {
  const router = useRouter();

  return (
    <Layout title="Change password page">
      <ChangePasswordComponent>
        {changePassword => (
          <Formik
            onSubmit={async data => {
              const response = await changePassword({
                variables: {
                  data: {
                    password: data.password,
                    token
                  }
                }
              });
              console.log(response);
              router.push("/");
            }}
            initialValues={{
              password: ""
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="password"
                  placeholder="password"
                  component={InputField}
                  type="password"
                />
                <button type="submit">change password</button>
              </form>
            )}
          </Formik>
        )}
      </ChangePasswordComponent>
    </Layout>
  );
};

ChangePassword.getInitialProps = ({query: {token}
}: NextPageContext) => {
  return {
    token
  }
}

export default ChangePassword;
