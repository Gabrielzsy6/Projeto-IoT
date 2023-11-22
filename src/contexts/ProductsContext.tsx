// ProductsContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Card {
  id: number;
  name: string;
  comodo: string;
  tipo: string;
}

interface ProductsContextProps {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>; // Adicionando setCards
  addCard: (card: Card) => void;
  deleteCard: (id: number) => void;
}

interface ProductsProviderProps {
  children: ReactNode;
}

const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
  return context;
};

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [cards, setCards] = useState<Card[]>([]);

  const addCard = (card: Card) => {
    setCards([...cards, card]);
  };

  const deleteCard = (id: number) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  const contextValue: ProductsContextProps = {
    cards,
    addCard,
    setCards,
    deleteCard,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
