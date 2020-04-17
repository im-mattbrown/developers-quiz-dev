import Link from "next/link";
import * as React from "react";
import Layout from "../components/Layout";
import {  LoginComponent } from "../generated/apolloComponents";

const IndexPage: React.FunctionComponent = () => {
  return (
    <Layout title="Developers Quiz">
      <h1>hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <LoginComponent>
        {mutate => (
          <button
            onClick={async () => {
              const response = await mutate({
                variables: {email: "boob@boob.com", password: "boobies"}
              });
              
              console.log(response)
            }}
          >
            call login mutation
          </button>
        )}
      </LoginComponent>
    </Layout>
  );
};

export default IndexPage;
