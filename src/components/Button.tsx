import { FC, memo, ReactElement } from "react";
import clsx from "clsx";

type Variant = "ghost" | "destructive" | "primary";
type btnType = "submit" | "button";
interface ButtonProps {
  text?: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  variant?: Variant;
  type: btnType;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = memo(
  ({
    text,
    onClickHandler,
    startIcon,
    endIcon,
    variant = "primary",
    disabled = false,
    type,
  }) => {
    const buttonClass = clsx(
      "flex flex-row gap-2 items-center justify-center rounded-md  px-4 py-2 font-medium transition-colors",
      {
        "bg-black  text-white w-36 hover:bg-gray-700": variant === "primary",
        "bg-transparent text-gray-700 hover:bg-gray-100": variant === "ghost",
        "bg-red-600 text-white hover:bg-red-700": variant === "destructive",
        "opacity-50 cursor-not-allowed": disabled,
      }
    );

    return (
      <button
        className={buttonClass}
        onClick={onClickHandler}
        disabled={disabled}
        type={type}
      >
        {startIcon && startIcon}
        {text}
        {endIcon && endIcon}
      </button>
    );
  }
);

export default Button;
