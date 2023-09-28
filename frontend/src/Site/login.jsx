import React, { useEffect, useState } from "react";
import { Button, Input, Spinner } from "reactstrap";
import { ValidateField } from "../helpers/ValidationHelper";
import { disableButton, enableButton } from "../helpers/ButtonHelper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, reset } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userToken, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    //Check if there's an error
    console.log(isError, message);
    if (isError) toast.error(message);

    //Check if is successfully or already have token
    if (isSuccess || userToken) navigate("/admin");

    //Resetting data
    dispatch(reset());
  }, [userToken, isError, isSuccess, message, navigate, dispatch]);

  const onLoginUser = async (e) => {
    e.preventDefault();
    let isValid = true;
    isValid &= ValidateField(username, "errUsername", "* Required");
    isValid &= ValidateField(password, "errPassword", "* Required");

    if (isValid) {
      const userData = {
        username,
        password,
      };
      dispatch(loginUser(userData));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 col-lg-4 m-auto">
          <div className="card">
            <div className="card-header text-center">
              <h3>Admin Login</h3>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label>
                  Username
                  <span id="errUsername" className="ErrorText" />
                </label>
                <Input
                  type="text"
                  className="form-control-sm"
                  autoCorrect="false"
                  autoComplete="false"
                  onChange={(e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      username: e.target.value,
                    }));
                    ValidateField(e.target.value, "errUsername", "* Required");
                  }}
                />
              </div>
              <div className="mb-3">
                <label>
                  Password
                  <span id="errPassword" className="ErrorText" />
                </label>
                <Input
                  type="password"
                  className="form-control-sm"
                  onChange={(e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      password: e.target.value,
                    }));
                    ValidateField(e.target.value, "errPassword", "* Required");
                  }}
                />
              </div>
              <div className="text-end">
                <Button
                  type="button"
                  size="sm"
                  color="primary"
                  onClick={onLoginUser}
                >
                  {isLoading ? (
                    <>
                      <Spinner color="light" size={"sm"} /> Processing
                    </>
                  ) : (
                    <>Login</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
