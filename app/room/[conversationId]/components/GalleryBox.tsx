import React from "react";
import Image from "next/image";

interface GalleryProps {
  image: any;
}

const GalleryBox: React.FC<GalleryProps> = ({ image }) => {
  return (
    <div>
      {image ? (
        <Image
          src={image}
          height={100}
          width={100}
          className="w-40 h-20 rounded-[10px]"
          alt="Profile picture"
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default GalleryBox;
