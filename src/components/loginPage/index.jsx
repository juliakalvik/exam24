import { useState, useEffect } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { loginUser } from "../../lib/api";
import "./style.css";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isPageRefreshed = localStorage.getItem("isPageRefreshed");
    if (!isPageRefreshed) {
      localStorage.setItem("isPageRefreshed", "true");
      window.location.reload(); 
    }
  }, []);

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
    
      <div className="login-parent">
        <div className="login-container">
          {isSuccess ? (
            <section></section>
          ) : (
            <section>
              <div className="login-form">
                <div className="form-header-login">
                  <h2 className="form-title">Log in to your account</h2>
                  <form className="form-content-login" onSubmit={handleOnSubmit}>
                    <div className="form-group-login">
                      <label htmlFor="email" className="form-label">Email address</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Email"
                        autoComplete="email"
                        className="form-input"
                      />
                      {error && <span className="error-message">Wrong email, please try again.</span>}
                    </div>
  
                    <div className="form-group-login">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="Password"
                        autoComplete="current-password"
                        className={`form-input ${error ? 'form-input-error' : ''}`}
                      />
                      {error && <span className="error-message">Wrong password, please try again.</span>}
                    </div>
  
                    <button className="submit-button" type="submit">
                      {isLoading ? "Signing In" : "Login"}
                    </button>
                    <p className="signup-prompt">
                      Not a member yet?{" "}
                      <Link to="/register" className="signup-link">
                        Sign up now
                      </Link>
                    </p>
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
