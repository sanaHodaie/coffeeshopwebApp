import { useState, useEffect } from "react";
import "./FloatingCoffeeBeans.css";

export default function FloatingCoffeeBeans() {
  const [beans, setBeans] = useState([]);
  const [showGyroButton, setShowGyroButton] = useState(false);

  useEffect(() => {
    const handleOrientation = (event) => {
      // دیگه نیازی به ژیروسکوپ نداریم
    };

    if (typeof DeviceOrientationEvent !== "undefined" && 
        typeof DeviceOrientationEvent.requestPermission === "function") {
      setShowGyroButton(true);
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const requestPermission = () => {
    if (typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
        .then(response => {
          if (response === "granted") {
            setShowGyroButton(false);
          }
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    const beans = [];
    for (let i = 0; i < 20; i++) {
      beans.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * -50, // شروع از بالای صفحه (منفی)
        size: 20 + Math.random() * 30,
        rotation: Math.random() * 360,
        delay: Math.random() * 10,
        duration: 6 + Math.random() * 6,
        opacity: 0.4 + Math.random() * 0.4,
        speed: 4 + Math.random() * 6,
      });
    }
    setBeans(beans);
  }, []);

  return (
    <>
      {showGyroButton && (
        <button onClick={requestPermission} className="gyro-button">
          📱 فعال‌سازی حرکت دانه‌ها
        </button>
      )}
      <div className="beans-container">
        {beans.map((bean) => (
          <div
            key={bean.id}
            className="coffee-bean falling-bean"
            style={{
              left: `${bean.x}%`,
              top: `${bean.y}%`,
              width: bean.size,
              height: bean.size,
              transform: `rotate(${bean.rotation}deg)`,
              opacity: bean.opacity,
              animation: `fallDown ${bean.duration}s linear infinite`,
              animationDelay: `${bean.delay}s`,
            }}
          >
            <div className="bean-inner">
              <div className="bean-gradient"></div>
              <div className="bean-shadow"></div>
              <div className="bean-highlight"></div>
              <div className="bean-crease"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}