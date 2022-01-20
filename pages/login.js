import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import GoogleIcon from "../components/GoogleIcon";
import DiscordIcon from "../components/DiscordIcon";
import {
  MdOutlineNightlight,
  MdOutlineWbSunny,
  MdOutlineErrorOutline,
} from "react-icons/md";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { getErrorMessage } from "../lib/oauth";
function Login() {
  const { theme, setTheme } = useTheme();
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { error } = router.query;
    if (error) {
      setErrorMessage(getErrorMessage(error));
    }
  });
  return (
    <div className="w-screen h-screen px-8 md:px-0 bg-lightBg dark:bg-darkBg flex items-center justify-center">
      <div className="w-full md:w-1/3 bg-white dark:bg-darkElevated  rounded-xl flex flex-col items-center p-8 relative">
        <ThemeToggle
          theme={theme}
          _setTheme={(_theme) => {
            setTheme(_theme);
            console.log(_theme);
          }}
        />
        {errorMessage && (
          <div className="w-5/6  bg-error dark:bg-darkError p-4 rounded-md flex justify-center items-center my-4">
            {/* <MdOutlineErrorOutline className="text-white" size={25} /> */}
            <h3 className=" ml-2 text-white">{errorMessage}</h3>
          </div>
        )}
        <Logo />
        <div className="w-16 border-y-[1px] border-divider dark:border-darkDivider my-4" />
        <h3 className="mt-2 text-textGrayed text-center">
          Unlock unlimited, fast-paced math practice for free.
        </h3>
        <div className="w-16 border-y-[1px] border-divider dark:border-darkDivider my-4" />
        <h3 className="text-text dark:text-darkText font-bold">
          Log in using a provider below
        </h3>
        <div className="my-2" />
        <ProviderButton
          Icon={GoogleIcon}
          text="Sign in with Google"
          providerId="google"
        />
        <div className="my-2" />
        <ProviderButton
          Icon={DiscordIcon}
          text="Sign in with Discord"
          providerId="discord"
        />
      </div>
    </div>
  );
}

function Logo() {
  return (
    <h1 className="text-primary text-3xl text-center font-bold lg:text-4xl dark:text-darkPrimary">
      MathMe
    </h1>
  );
}

function ProviderButton({ Icon, text, providerId }) {
  return (
    <div
      onClick={() => signIn(providerId, { callbackUrl: "/home" })}
      className="w-5/6 md:w-3/4 h-16 bg-white border-divider border-2 cursor-pointer rounded-md p-4 flex items-center hover:bg-gray-100 transition"
    >
      <Icon />
      <h3 className="text-text text-l  ml-6">{text}</h3>
    </div>
  );
}

function ThemeToggle({ theme, _setTheme }) {
  return (
    <div
      onClick={() => _setTheme(theme === "light" ? "dark" : "light")}
      className="absolute top-4 left-4"
    >
      {theme === "light" ? (
        <MdOutlineNightlight size={30} />
      ) : (
        <MdOutlineWbSunny size={30} />
      )}
    </div>
  );
}

export default Login;
