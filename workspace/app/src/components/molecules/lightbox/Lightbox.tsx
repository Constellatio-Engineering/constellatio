import { CloseIcon } from "@/components/Icons/Close";
import { useSizeObserver } from "@/hooks/useSizeObserver";
import { type ModalOpened as LightboxModalOpened, useLightboxModalStore } from "@/stores/lightbox.store";

import { Modal } from "@mantine/core";
import Image from "next/image";
import { type FunctionComponent, useRef } from "react";

import * as styles from "./Lightbox.styles";

type Wrapper = {
  readonly height: number;
  readonly width: number;
};

type ImageWrapperProps = {
  readonly image: LightboxModalOpened["image"];
};

type LightboxImageProps = ImageWrapperProps & {
  readonly wrapper: Wrapper;
};

type FallbackLightboxImageProps = {
  readonly image: {
    alt: string;
    url: string;
  };
};

const FallbackLightboxImage: FunctionComponent<FallbackLightboxImageProps> = ({ image }) =>
{
  return (
    <img // eslint-disable-line @next/next/no-img-element
      onClick={e => e.stopPropagation()}
      css={styles.fallbackImage}
      loading={"eager"}
      src={image.url}
      alt={image.alt}
    />
  );
};

const LightboxImage: FunctionComponent<LightboxImageProps> = ({ image, wrapper }) =>
{
  if(!image.width || !image.height)
  {
    return (
      <FallbackLightboxImage image={image}/>
    );
  }

  const imageAspectRatio = image.width / image.height;
  const wrapperAspectRatio = wrapper.width / wrapper.height;

  let renderedImageWidth: number | string;
  let renderedImageHeight: number | string;

  if(wrapperAspectRatio >= imageAspectRatio)
  {
    renderedImageWidth = "auto";
    renderedImageHeight = wrapper.height;
  }
  else
  {
    renderedImageWidth = wrapper.width;
    renderedImageHeight = "auto";
  }

  return (
    <Image
      width={image.width}
      height={image.height}
      onClick={e => e.stopPropagation()}
      css={styles.image}
      style={{
        height: renderedImageHeight,
        width: renderedImageWidth
      }}
      priority
      src={image.url}
      alt={image.alt}
    />
  );
};

const ImageWrapper: FunctionComponent<ImageWrapperProps> = ({ image }) =>
{
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const { height, width } = useSizeObserver(imageWrapperRef);

  return (
    <div css={styles.imageWrapper} ref={imageWrapperRef}>
      {(width && height) && (
        <LightboxImage
          image={image}
          wrapper={{ height, width }}
        />
      )}
    </div>
  );
};

const Lightbox: FunctionComponent = () =>
{
  const { closeModal, modalState } = useLightboxModalStore();
  const currentImage = modalState.isOpened ? modalState.image : modalState.lastImage;

  return (
    <Modal.Root
      size={"100vw"}
      lockScroll={false} // false needed because otherwise zooming is not possible
      keepMounted={true}
      padding={0}
      transitionProps={{ duration: 300 }}
      opened={modalState.isOpened}
      onClose={closeModal}>
      <Modal.Overlay css={styles.overlay}>
        <div css={styles.closeButtonWrapper}>
          <CloseIcon size={30}/>
        </div>
      </Modal.Overlay>
      <Modal.Content
        css={styles.content}
        onClick={closeModal}>
        <Modal.Body css={styles.body}>
          {currentImage && (
            <ImageWrapper image={currentImage}/>
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default Lightbox;
