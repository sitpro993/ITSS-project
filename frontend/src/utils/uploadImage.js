export const imageUpload = async (variant) => {
      const formData = new FormData();
      formData.append("file", variant);
      formData.append("upload_preset", 'beecarry');
      formData.append("cloud_name", 'beeyou');

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/beeyou/image/upload",
        {
          method: "POST",
          mode: "cors",
          body: formData,
        }
      );

      const data = await res.json();
      
  return data;
}