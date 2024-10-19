import { FC, memo } from "react";
import { animated, config, useSpring } from "react-spring";
import { AnimatedButton } from "./AnimatedButton";

export const Hero: FC = memo(() => {
  const titleAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.gentle,
    delay: 200,
  });

  const subtitleAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.gentle,
    delay: 400,
  });

  return (
    <section className="text-center mb-24">
      <animated.h1
        style={titleAnimation}
        className="text-5xl md:text-7xl font-bold mb-6"
      >
        Welcome to Thoughts
      </animated.h1>
      <animated.p
        style={subtitleAnimation}
        className="text-xl md:text-2xl mb-12 text-gray-600"
      >
        Where ideas flourish and stories come to life.
      </animated.p>
      <AnimatedButton>Start Reading</AnimatedButton>
    </section>
  );
});
