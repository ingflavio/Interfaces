import { useState, useEffect } from "react";
import { Home } from "./Home";
import { Tangram } from "./Tangram";

export const Index = () => {
  const [showTangram, setShowTangram] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTangram(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showTangram ? <Tangram /> : <Home />}
    </>
  );
};