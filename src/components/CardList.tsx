/* eslint-disable react/jsx-no-bind */
import { Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

export interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  function handleViewImage(url: string): void {
    setSelectedImageUrl(url);
    onOpen();
  }

  return (
    <>
      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap="40px">
        {cards.map(card => (
          <GridItem key={card.id}>
            <Card data={card} viewImage={handleViewImage} />
          </GridItem>
        ))}
      </Grid>

      <ModalViewImage
        imgUrl={selectedImageUrl}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
