import { signIn } from "next-auth/react";

function Login() {
  return <div onClick={() => signIn()}>log in</div>;
}

export default Login;
