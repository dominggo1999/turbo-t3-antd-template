import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "antd";
import { BiArrowBack } from "react-icons/bi";

import { PageMessage } from "@acme/ui";

const ServerError = () => {
  return (
    <>
      <Head>
        <title>500 | Server Error</title>
      </Head>
      <PageMessage
        title="Internal server error"
        code={500}
        message="Oops, something went wrong! Our team has been notified and is working to resolve the issue. Please try again later. Thank you for your patience."
      />
      <div className="mt-5 flex justify-center">
        <Link href="/" legacyBehavior passHref>
          <Button
            className="flex items-center gap-x-3"
            type="primary"
            size="small"
          >
            <BiArrowBack className="text-xl" />
            Back to Home
          </Button>
        </Link>
      </div>
    </>
  );
};

export default ServerError;
