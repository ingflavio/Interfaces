import { useState, useEffect } from "react";
import { Home } from "./Home";
import { Tangram } from "./Tangram";

export const Index = () => {
  const [showTangram, setShowTangram] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTangram(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showTangram ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#dadada",
            zIndex: 50,
          }}
        >
          <Tangram />
        </div>
      ) : (
        <Home />
      )}
    </>
  );
};
