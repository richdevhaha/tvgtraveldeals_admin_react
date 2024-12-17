// types/react-images.d.ts
declare module 'react-imagesq' {
    import * as React from 'react';
  
    export interface ModalProps {
      onClose: () => void;
      children: React.ReactNode;
    }
  
    export const Modal: React.ComponentType<ModalProps>;
  
    export interface ModalGatewayProps {
      children: React.ReactNode;
    }
  
    export const ModalGateway: React.ComponentType<ModalGatewayProps>;
  
    export interface CarouselProps {
      currentIndex: number;
      views: { source: string, caption: string, alt: string, loading?: string }[];
      styles?: {
        view?: (base: any, state: any) => any;
        container?: (base: any, state: any) => any;
        headerFullscreen?: (base: any, state: any) => any;
      };
    }
  
    export const Carousel: React.ComponentType<CarouselProps>;
  }
  