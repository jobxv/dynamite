import { ChevronLeft, ChevronRight } from "./Icons";

interface ScrollButtonsProps {
  scrollLeft: () => void;
  scrollRight: () => void;
  disableLeft?: boolean;
  disableRight?: boolean;
  className?: string;
  small?: boolean;
}

const ScrollButtons: React.FC<ScrollButtonsProps> = ({
  scrollLeft,
  scrollRight,
  disableLeft,
  disableRight,
  className,
  small,
}) => {
  return (
    <div className={`${className}`}>
      <button
        onClick={scrollLeft}
        className={`pointer-events-auto rounded-full bg-white shadow-all-round hover:bg-[#0e0e0e17] cursor-pointer ${
          small ? "p-1.5" : " p-3 "
        } ${disableLeft ? " opacity-50 cursor-not-allowed " : " opacity-100 "}`}
        disabled={disableLeft}
      >
        <ChevronLeft className={small ? `size-4.5` : "size-6"} />
      </button>
      <button
        onClick={scrollRight}
        className={`pointer-events-auto rounded-full bg-white shadow-all-round hover:bg-[#0e0e0e17] cursor-pointer ${
          small ? "p-1.5" : " p-3 "
        } ${disableLeft ? " opacity-50 cursor-not-allowed " : " opacity-100 "}`}
        disabled={disableRight}
      >
        <ChevronRight className={small ? `size-4.5` : "size-6"} />
      </button>
    </div>
  );
};

export default ScrollButtons;
