import Layout from "../components/Layout";

import { getSession, useSession } from "next-auth/react";

function Analytics() {

  return <Layout activeIndex={2}></Layout>
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


export default Analytics;


