import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGoBack from "../hooks/useGoBack";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const GoBackButton = () => {
  const goBack = useGoBack();

  return (
    <div
      onClick={() => goBack()}
      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FFD700]  to-[#FFFF00] text-[#4E342E] text- rounded-full cursor-pointer mb-5"
    >
      <FontAwesomeIcon icon={faArrowLeft} />
      <p className="text-lg font-bold capitalize">Go back</p>
    </div>
  );
};

export default GoBackButton;
