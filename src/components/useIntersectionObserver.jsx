import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver(ref, options, forward) {
  const [element, setElement] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const wasInteresctorTrue = useRef(false);
  const observer = useRef(null);
  const cleanOb = () => {
    if (observer.current) {
      observer.current.disconnect();
    }
  };

  useEffect(() => {
    setElement(ref.current);
  }, [ref]);

  useEffect(() => {
    if (isIntersecting && !wasInteresctorTrue.current) {
      wasInteresctorTrue.current = true;
    }

    if (wasInteresctorTrue.current) {
      return;
    }

    if (!element) return;
    cleanOb();
    const ob = (observer.current = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        if (!forward) {
          setIsIntersecting(isElementIntersecting);
        } else if (forward && !isIntersecting && isElementIntersecting) {
          setIsIntersecting(isElementIntersecting);
          cleanOb();
        }
      },
      { ...options }
    ));
    ob.observe(element);
    return () => {
      cleanOb();
    };
  }, [element, options]);

  return isIntersecting;
}
