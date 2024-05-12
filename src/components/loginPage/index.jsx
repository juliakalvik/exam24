import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { loginUser } from "../../lib/api";


const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;
    const payload = {
      email: email.value,
      password: password.value,
    };

    try {
      setIsLoading(true);
      const res = await loginUser(payload);
      setData(res);
      setIsSuccess(true);
      navigate({
        to: "/userprofile",
      });
    } catch (error) {
      console.warn("Failed to fetch token", error.message);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" ">
      <div className="mx-auto max-w-2xl  pt-10">
        <div className="text-center">
          <h1 className="lg:text-4xl font-extrabold tracking-tight md:text-4xl text-gray-900 text-3xl">
            Welcome back to <br></br>
            <span className="inline-block pl-2 text-7xl transform skew-x-[-18deg]">
              G
              <span className="bg-gradient-to-tl from-turq to-black text-transparent bg-clip-text">
                AV
              </span>
              EL
            </span>{" "}
          </h1>
        </div>
      </div>

      <div className="mt-10 mx-auto ">
        {isSuccess ? (
          <section>
            <p className="text-center text-green-900">
              Hello {data?.name}. Good to see you again!
            </p>
          </section>
        ) : (
          <section>
            <div className="signup-form">
              <div className=" pt-4 pb-4">
                <h2 className="font-bold leading-tight tracking-tight text-gray-800 text-xl dark:text-white">
                  Log in to your account
                </h2>
                <form className="p-1 space-y-4" onSubmit={handleOnSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block pt-6 text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Email"
                        autoComplete="email"
                        className="bg-neutral-100 border-2 border-orange-100 text-gray-900 leading-tight tracking-tight text-sm rounded-3xl focus:ring-primary-600 focus:border-primary-600 block w-full min-w-[220px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="Password"
                      autoComplete="current-password"
                      minLength={8}
                      className={`bg-neutral-100 border-2 border-orange-100 text-gray-900 leading-tight tracking-tight text-sm rounded-3xl focus:ring-primary-600 focus:border-primary-600 block w-full min-w-[220px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        error ? "border-red-500" : ""
                      }`}
                    />
                    {error && (
                      <p className="mt-1 text-sm text-red-500">
                        Wrong password, please try again.
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 ml-2 border border-gray-100 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        />
                      </div>
                      <div className="ml-1 text-sm ">
                        <label
                          htmlFor="remember"
                          className="text-xs font-light text-turq dark:text-turq"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="w-full px-4 py-2 my-2 leading-tight tracking-tight text-white "
                    >
                      {isLoading ? "Signing In" : "Login"}
                    </button>
                    <p className="text-xs font-light text-gray-700 sm:text-sm dark:text-gray-400">
                      Not a member?{" "}
                      <Link
                        to="/signup"
                        className="font-semibold leading-6 text-turq hover:text-gray-800"
                      >
                        Sign up now
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
