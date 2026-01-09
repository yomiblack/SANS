"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function Portal({ children }) {
  const [portalNode, setPortalNode] = useState(null);

  useEffect(() => {
    setPortalNode(document.body);
  }, []);

  if (!portalNode) return null;

  return createPortal(children, portalNode);
}
