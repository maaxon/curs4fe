import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { PORTAL_ERROR_MSG } from "./config";
import { ContainerOptions, PortalProps } from "./types";

export const Portal = ({ id, children }: PortalProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (id) {
      const portalContainer = document.getElementById(id);

      if (!portalContainer) {
        throw new Error(PORTAL_ERROR_MSG);
      }

      setContainer(portalContainer);
    }
  }, [id]);

  return container ? createPortal(children, container) : null;
};

export const createContainer = (options: ContainerOptions): void => {
  if (document.getElementById(options.id)) {
    return;
  }

  const { id, mountNode = document.body } = options;

  const portalContainer = document.createElement("div");
  portalContainer.setAttribute("id", id);
  mountNode.appendChild(portalContainer);
};
