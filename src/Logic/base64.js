import React from "react";

// Decode base64 string to image
export function getImage(base64) {
  let img = React.createElement("img", { src: base64 });
  return img.props.src;
}

// Return how many pictures a reportItem has
export function getImageLength(base64) {
  let img = React.createElement("img", { src: base64 });
  if (img.props.src === null) {
    return 0;
  } else {
    return Object.keys(img.props).length;
  }
}

// Convert Image to base 64 and upload;
export const uploadImage = async (e) => {
  const file = e.target.files[0];
  console.log(file);
  const base64 = await convertBase64(file);
  const imageReturn = base64;
  return imageReturn;
};

// Base64 Converter
const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
