/* eslint-disable no-unused-vars */
export interface ImageProps {
  id: number;
  height: number;
  width: number;
  imagePath: string;
  public_id?: string;
  format: string;
}

export interface SharedModalProps {
  index: number;
  images?: ImageProps[];
  currentPhoto?: ImageProps;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}

export interface Menu {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
};

export interface Brand {
  id: number;
  name: string;
  href: string;
  image: string;
  imageLight?: string;
};

export interface Feature {
  id: number;
  icon: JSX.Element;
  title: string;
  paragraph: string;
};

export interface GalleryImageProps {
  image: ImageProps;
  index: number;
  onClick: () => void;
}

export interface AlbumGalleryProps {
  images: ImageProps[];
}

export interface ImageDataResponse {
  data: ImageProps;
  loading: boolean;
  error: any;
}