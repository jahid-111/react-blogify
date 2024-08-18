import { useEffect } from "react";
import { createPortal } from "react-dom";

const PortalModal = ({ children }) => {
  const mountElement = document.getElementById("portal-root");
  const elementDiv = document.createElement("div");

  useEffect(() => {
    mountElement.appendChild(elementDiv);
    return () => mountElement.removeChild(elementDiv);
  }, [elementDiv, mountElement]);

  return createPortal(children, elementDiv);
};

export default PortalModal;
