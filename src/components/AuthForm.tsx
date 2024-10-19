import { FC, memo, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation, useLoginMutation } from "../services/authApi/auth";
import { toast } from "sonner";
import { useHandleToken } from "../hooks/useHandleToken";
import { AppDispatch } from "../services/redux/store";
import { useDispatch } from "react-redux";
import { setlogin } from "../services/features/authSlice";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginFormValues {
  email: string;
  password: string;
}

type AuthFormValues = SignUpFormValues | LoginFormValues;

type AuthType = "signup" | "login";

interface AuthFormProps {
  type: AuthType;
}

const AuthForm: FC<AuthFormProps> = memo(({ type }) => {
  const [signup] = useSignupMutation();
  const [login] = useLoginMutation();
  const { setToken } = useHandleToken();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const inputConfig = useMemo(() => {
    const commonFields = [
      {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Enter your email",
      },
      {
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Enter your password",
      },
    ];

    const signupFields = [
      {
        name: "firstName",
        type: "text",
        label: "First Name",
        placeholder: "Enter your first name",
      },
      {
        name: "lastName",
        type: "text",
        label: "Last Name",
        placeholder: "Enter your last name",
      },
      ...commonFields,
      {
        name: "confirmPassword",
        type: "password",
        label: "Confirm Password",
        placeholder: "Confirm your password",
      },
    ];

    return type === "signup" ? signupFields : commonFields;
  }, [type]);

  const initialValues: AuthFormValues = useMemo(() => {
    return type === "signup"
      ? {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }
      : {
          email: "",
          password: "",
        };
  }, [type]);

  const validationSchema = useMemo(() => {
    const commonSchema = {
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Password is required"),
    };

    const signupSchema = {
      ...commonSchema,
      firstName: Yup.string()
        .min(3, "Must be at least 3 characters")
        .required("First Name is required"),
      lastName: Yup.string()
        .min(3, "Must be at least 3 characters")
        .required("Last Name is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    };

    return Yup.object(type === "signup" ? signupSchema : commonSchema);
  }, [type]);

  const handleSubmit = async (values: AuthFormValues) => {
    try {
      if (type === "signup") {
        const response = await signup(values).unwrap();
        if (response?.token) {
          setToken(response.token);
          dispatch(setlogin({ token: response.token }));
          toast.success("Account created successfully!");
          navigate("/blogs");
        } else {
          toast.error("Error creating account.");
        }
      } else {
        const response = await login(values).unwrap();
        if (response?.token) {
          setToken(response.token);
          dispatch(setlogin({ token: response.token }));
          toast.success("Logged in successfully!");
          navigate("/blogs");
        } else {
          toast.error("Error logging in.");
        }
      }
    } catch (error) {
      toast.error(`Please Try again later !!!`);
      console.log(error);
    }
  };

  return (
    <div className="w-1/2 p-6 flex flex-col items-center justify-center bg-white shadow-md">
      <div className="flex flex-col mb-5 items-center text-md font-medium">
        <h2 className="text-4xl font-bold text-center">
          {type === "signup" ? "Create an Account" : "Welcome Back"}
        </h2>
        <h3>
          {type === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}
          <Link
            className="pl-2 underline text-black hover:text-gray-600"
            to={type === "signup" ? "/login" : "/signup"}
          >
            {type === "signup" ? "Log In" : "Sign Up"}
          </Link>
        </h3>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-96 space-y-4">
          {inputConfig.map(({ name, type, label, placeholder }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {label}
              </label>
              <Field
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                aria-label={label}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
              <ErrorMessage
                name={name}
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
          ))}

          <div className="flex justify-end mt-6">
            <Button
              text={type === "signup" ? "Sign Up" : "Log In"}
              type="submit"
              variant="primary"
              onClickHandler={() => {}}
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
});

export default AuthForm;
