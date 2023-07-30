import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const ErrorPage = () => {
  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });
  const shake = useSpring({
    transform: "translate3d(0, 0, 0)",
    from: { transform: "translate3d(-10px, 0, 0)" },
    config: { tension: 300, friction: 10 },
  });

  return (
    <animated.div style={fade} className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-indigo-500 rounded-full">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-bold text-center">404 - Page Not Found</h1>
        <p className="mt-2 text-center text-gray-600">Oops! The page you are looking for could not be found.</p>
        <Link
          to="/"
          className="mt-6 inline-block px-4 py-2 text-lg font-semibold text-white bg-indigo-500 rounded hover:bg-indigo-600 transition-colors duration-300"
        >
          Go back to Home
        </Link>
      </div>
      <animated.div
        style={shake}
        className="absolute bottom-0 right-0 mb-8 mr-8 w-10 h-10 bg-indigo-500 rounded-full"
      ></animated.div>
    </animated.div>
  );
};

export default ErrorPage;
