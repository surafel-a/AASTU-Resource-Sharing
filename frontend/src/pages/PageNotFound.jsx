import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  faHome,
  faArrowLeft,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f8fbff] via-white to-[#eef4ff] flex items-center justify-center px-6 py-10">
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center"
      >
        {/* Left content */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              type: "spring",
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-[#1152D4] font-semibold text-sm mb-6"
          >
            <FontAwesomeIcon icon={faCompass} />
            Lost in the platform?
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Oops! <br />
            This page can’t be found.
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
            The page you are looking for might have been removed, renamed, or is
            temporarily unavailable. Don’t worry — let’s get you back on track.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start gap-4">
            <button
              onClick={() => navigate("/")}
              className="group flex items-center gap-3 px-6 py-3 text-base font-semibold text-white bg-[#1152D4] rounded-2xl shadow-lg hover:shadow-blue-200 hover:bg-blue-700 transition-all duration-300 cursor-pointer"
            >
              <FontAwesomeIcon icon={faHome} />
              Go to Home
            </button>

            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-3 px-6 py-3 text-base font-semibold text-gray-700 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300 cursor-pointer"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Go Back
            </button>
          </div>

          {/* Small helper text */}
          <p className="mt-6 text-sm text-gray-400">
            Error Code: 404 — Page Not Found
          </p>
        </div>

        {/* Right illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative flex items-center justify-center"
        >
          {/* Floating card background */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/50" />

          <div className="relative p-6 md:p-10">
            <motion.img
              src="./pagenotfound.png"
              alt="404 illustration"
              className="w-full max-w-xl drop-shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PageNotFound;
