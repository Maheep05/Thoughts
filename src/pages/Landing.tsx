import { useState, FC } from "react";
import { useSpring, animated, config } from "react-spring";
import { FiMenu, FiX } from "react-icons/fi";
import { Features } from "../components/Features";
import { AnimatedButton } from "../components/AnimatedButton";
import { Hero } from "../components/Hero";
import { useSelector } from "react-redux";
import { RootState } from "../services/redux/store";

const Landing: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const menuAnimation = useSpring({
    opacity: isMenuOpen ? 1 : 0,
    transform: isMenuOpen ? "translateY(0%)" : "translateY(-100%)",
    config: config.gentle,
  });

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-bold">Thoughts</div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <NavItem href="/" text="Home" />
              <NavItem href="#" text="About" />
              <NavItem href="/login" text="Write" />
              {isAuthenticated ? (
                <NavItem href="/blogs" text="Blogs" />
              ) : (
                <NavItem href="/login" text="Sign In" />
              )}
            </ul>
          </nav>
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <animated.nav
          style={menuAnimation}
          className="md:hidden bg-gray-100 p-4"
        >
          <ul className="space-y-2">
            <NavItem href="#" text="Home" />
            <NavItem href="#" text="About" />
            <NavItem href="/login" text="Write" />
            <NavItem href="/login" text="Sign In" />
          </ul>
        </animated.nav>
      )}

      <main className="container mx-auto px-4 py-16">
        <Hero />
        <Features />
        <FeaturedArticles />
        <CTA />
      </main>

      <Footer />
    </div>
  );
};

const NavItem: FC<{ href: string; text: string }> = ({ href, text }) => (
  <li>
    <a
      href={href}
      className="text-black opacity-70 hover:opacity-100 transition duration-300"
    >
      {text}
    </a>
  </li>
);

const FeaturedArticles: FC = () => (
  <section className="mb-24">
    <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
    <div className="grid md:grid-cols-2 gap-8">
      <ArticleCard
        title="The Future of AI in Everyday Life"
        author="Jane Doe"
        date="May 15, 2023"
        readTime="5 min read"
      />
      <ArticleCard
        title="10 Tips for Productive Remote Work"
        author="John Smith"
        date="May 14, 2023"
        readTime="7 min read"
      />
    </div>
  </section>
);

const ArticleCard: FC<{
  title: string;
  author: string;
  date: string;
  readTime: string;
}> = ({ title, author, date, readTime }) => {
  const [isHovered, setIsHovered] = useState(false);
  const springProps = useSpring({
    transform: isHovered ? "scale(1.03)" : "scale(1)",
    config: config.wobbly,
  });

  return (
    <animated.div
      style={springProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-gray-100 rounded-lg p-6"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{author}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{date}</span>
        <span>{readTime}</span>
      </div>
    </animated.div>
  );
};

const CTA: FC = () => (
  <section className="text-center mb-24">
    <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
    <p className="text-xl mb-8 text-gray-600">
      Start writing and sharing your thoughts today.
    </p>
    <AnimatedButton>Sign Up Now</AnimatedButton>
  </section>
);

const Footer: FC = () => (
  <footer className="bg-gray-100 py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="text-2xl font-bold mb-4 md:mb-0">Thoughts</div>
        <nav>
          <ul className="flex space-x-6">
            <NavItem href="#" text="About" />
            <NavItem href="#" text="Terms" />
            <NavItem href="#" text="Privacy" />
            <NavItem href="#" text="Contact" />
          </ul>
        </nav>
      </div>
      <div className="text-center text-gray-600">
        &copy; 2023 Thoughts. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Landing;
