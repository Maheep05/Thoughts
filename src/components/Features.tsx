import { FC, memo, useState } from "react";
import { FiBookOpen, FiEdit, FiUsers } from "react-icons/fi";
import { useSpring, animated, config } from "react-spring";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const Features: FC = memo(() => (
  <section className="grid md:grid-cols-3 gap-12 mb-24">
    <FeatureCard
      icon={<FiBookOpen className="w-12 h-12" />}
      title="Discover Stories"
      description="Explore a vast collection of articles on various topics."
    />
    <FeatureCard
      icon={<FiEdit className="w-12 h-12" />}
      title="Write & Share"
      description="Share your thoughts and ideas with a global audience."
    />
    <FeatureCard
      icon={<FiUsers className="w-12 h-12" />}
      title="Connect"
      description="Engage with writers and readers from around the world."
    />
  </section>
));

const FeatureCard: FC<FeatureCardProps> = memo(
  ({ icon, title, description }) => {
    const [isHovered, setIsHovered] = useState(false);
    const springProps = useSpring({
      transform: isHovered ? "translateY(-5px)" : "translateY(0px)",
      config: config.wobbly,
    });

    return (
      <animated.div
        style={springProps}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-gray-100 rounded-lg p-6 text-center"
      >
        <div className="flex justify-center mb-4 text-gray-800">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </animated.div>
    );
  }
);
