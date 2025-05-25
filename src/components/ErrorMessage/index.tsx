import { useLayoutEffect, useState } from "react";
import {createContainer, Portal} from "@components/portal";

import { ERROR_MESSAGE_DURATION } from "./config.ts";
import { ErrorMessageContainer, ErrorMessageWrapper } from "./styled.ts";



interface ErrorMessageProps {
  error?: string | null;
}

const ERROR_CONTAINER_ID = "error-container";

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  useLayoutEffect(() => {
    createContainer({ id: ERROR_CONTAINER_ID });
  }, []);

  const [active, setActive] = useState(false);

  useLayoutEffect(() => {
    if (error) {
      setActive(true);
      const handler = setTimeout(() => setActive(false), ERROR_MESSAGE_DURATION);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [error]);

  if (active && error) {
    return (
      <Portal id={ERROR_CONTAINER_ID}>
        <ErrorMessageContainer>
          <ErrorMessageWrapper>{error}</ErrorMessageWrapper>
        </ErrorMessageContainer>
      </Portal>
    );
  }
};
