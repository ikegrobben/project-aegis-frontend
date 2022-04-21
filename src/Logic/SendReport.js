export const sendForm = async (data, image) => {
  delete data["upload-image"];
  data.image = image;
  const jsonData = JSON.stringify(data);
  console.log(jsonData);
  return jsonData;
};
