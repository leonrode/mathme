import { signIn } from "next-auth/react";

function Login() {
  return (
    <div onClick={() => signIn("google", { callBackUrl: "/home" })}>log in</div>
    // <div onClick={() => signIn}>log in</div>
  );
}

export default Login;
