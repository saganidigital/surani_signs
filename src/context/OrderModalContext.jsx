import React, { createContext, useContext, useState } from 'react';

const OrderModalContext = createContext();

export function OrderModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openOrderModal = (data = null) => {
    setModalData(data);
    setIsOpen(true);
  };

  const closeOrderModal = () => {
    setIsOpen(false);
  };

  return (
    <OrderModalContext.Provider value={{ isOpen, openOrderModal, closeOrderModal, modalData }}>
      {children}
    </OrderModalContext.Provider>
  );
}

export function useOrderModal() {
  const context = useContext(OrderModalContext);
  if (!context) {
    throw new Error('useOrderModal must be used within an OrderModalProvider');
  }
  return context;
}
