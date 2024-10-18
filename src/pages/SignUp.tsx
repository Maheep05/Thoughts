import { memo } from "react";
import Quote from "../components/Quote";
import SignupForm from "../components/AuthForm";

const SignUp = memo(() => {
  return (
    <div className="flex flex-row">
      <SignupForm type="signup" />
      <Quote />
    </div>
  );
});

export default SignUp;
