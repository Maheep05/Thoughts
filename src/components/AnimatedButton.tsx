import { FC, useState } from "react";
import { animated, config, useSpring } from "react-spring";

interface AnimatedButtonProps {
  children: React.ReactNode;
}
export const AnimatedButton: FC<AnimatedButtonProps> = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const springProps = useSpring({
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    config: config.wobbly,
  });

  return (
    <animated.button
      style={springProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-black text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition duration-300"
    >
      {children}
    </animated.button>
  );
};
