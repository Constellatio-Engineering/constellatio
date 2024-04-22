import { useSizeObserver } from "@/hooks/useSizeObserver";
import { type ModalOpened as LightboxModalOpened, useLightboxModalStore } from "@/stores/lightbox.store";

import { Modal } from "@mantine/core";
import Image from "next/image";
import React, { type FunctionComponent, useEffect, useRef } from "react";

import * as styles from "./Lightbox.styles";

type LightboxContentProps = {
  readonly image: LightboxModalOpened["image"];
  readonly wrapper: {
    readonly height: number;
    readonly width: number;
  };
};

const LightboxContent: FunctionComponent<LightboxContentProps> = ({ image, wrapper }) =>
{
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

  useEffect(() =>
  {
    console.log("mounted");
    return () => console.log("unmounted");
  }, []);

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
      alt="Placeholder"
    />
  );
};

const Lightbox: FunctionComponent = () =>
{
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const { closeModal, modalState, openModal } = useLightboxModalStore();
  const { height: wrapperHeight, width: wrapperWidth } = useSizeObserver(imageWrapperRef);
  const currentImage = modalState.isOpened ? modalState.image : modalState.lastImage;

  console.log("imageWrapperRef", imageWrapperRef);
  console.log("wrapperHeight", wrapperHeight);
  console.log("wrapperWidth", wrapperWidth);

  return (
    <>
      <button
        type={"button"}
        onClick={() => openModal({
          height: 347,
          url: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=2260&h=750&dpr=2",
          width: 520
        })}
        style={{ padding: 100 }}>
        Open Lightbox
      </button>
      <Modal.Root
        size={"100vw"}
        lockScroll={true}
        keepMounted={true}
        padding={0}
        opened={modalState.isOpened}
        onClose={closeModal}>
        <Modal.Overlay css={styles.overlay}/>
        <Modal.Content
          css={styles.content}
          onClick={closeModal}>
          <Modal.Body css={styles.body}>
            <div css={styles.imageWrapper} ref={imageWrapperRef}>
              {(currentImage && wrapperHeight && wrapperWidth) && (
                <LightboxContent
                  image={currentImage}
                  wrapper={{
                    height: wrapperHeight,
                    width: wrapperWidth
                  }}
                />
              )}
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default Lightbox;
