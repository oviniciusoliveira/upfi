import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bgColor="pGray.900"
        overflow="hidden"
        maxW="900px"
        width="fit-content"
        m={[3, 4, 5, 6]}
      >
        <ModalBody p="0">
          <Image src={imgUrl} maxH="600px" />
        </ModalBody>
        <ModalFooter justifyContent="flex-start" p="2">
          <Link href={imgUrl} isExternal fontSize="sm">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
