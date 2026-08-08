const Reveal = (props) => <motion.div {...props} />;
Reveal.defaultProps = {
  delay: 0,
  y: 24,
};
export default Reveal;

import { motion } from "motion/react";
import React, { useEffect, useRef } from "react";

const useInView = ({ threshold = 0.5 }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    let observer;
    if (ref.current) {
      observer = new IntersectionObserver(([entry]) =>
        entry.intersectionRatio > threshold ? setInView(true) : setInView(false)
      );
      observer.observe(ref.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [threshold]);

  return ref;
};

export default useInView;