import Layout from "../components/Layout";

import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchCategories } from "../_api/api";

export default function Categories() {
  useEffect(() => {
    (async () => {
      const categories = await fetchCategories();
    })();
  }, []);
  return <Layout activeIndex={2}></Layout>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: session,
  };
}
