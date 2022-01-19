import { signIn } from "next-auth/react";

function Login() {
  return <div onClick={() => signIn("google")}>log in</div>;
}

export default Login;
