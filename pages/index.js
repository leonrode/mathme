import { useRouter } from "next/router";

import { useEffect } from "react";

import { getSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, []);
  return <div></div>;
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
