import { memo } from "react";
import Quote from "../components/Quote";
import AuthForm from "../components/AuthForm";

const SignIn = memo(() => {
  return (
    <div className="flex flex-row">
      <AuthForm type="login" />
      <Quote />
    </div>
  );
});

export default SignIn;
