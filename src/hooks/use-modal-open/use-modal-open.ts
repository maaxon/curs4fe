"use client";

import { useState } from "react";

export const useModalOpen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    handleModalOpen,
    handleModalClose,
  };
};
