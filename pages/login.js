import { signIn } from "next-auth/react";

function Login() {
  return (
    <div
      onClick={() =>
        signIn("google", { callbackUrl: "http://localhost:3000/home" })
      }
    >
      log in
    </div>
  );
}

export default Login;
