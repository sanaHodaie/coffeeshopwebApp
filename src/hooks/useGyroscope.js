import { useEffect, useState } from "react";

export const useGyroscope = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showGyroButton, setShowGyroButton] = useState(false);

  useEffect(() => {
    const handleOrientation = (event) => {
      setRotateX(event.gamma || 0);
      setRotateY(event.beta || 0);
    };

    if (typeof DeviceOrientationEvent !== "undefined" && 
        typeof DeviceOrientationEvent.requestPermission === "function") {
      setShowGyroButton(true);
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
      setPermissionGranted(true);
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
            window.addEventListener("deviceorientation", (event) => {
              setRotateX(event.gamma || 0);
              setRotateY(event.beta || 0);
            });
            setPermissionGranted(true);
            setShowGyroButton(false);
          }
        })
        .catch(console.error);
    }
  };

  return { rotateX, rotateY, permissionGranted, showGyroButton, requestPermission };
};