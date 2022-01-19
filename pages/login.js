import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
function Login() {
  const router = useRouter();
  return (
    // <div onClick={() => signIn("google", { callBackUrl: "/home" })}>log in</div>
    <div onClick={() => router.push("/api/auth/signin")}>log in</div>
  );
}

export default Login;
