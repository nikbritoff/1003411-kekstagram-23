//// Генерация фотокарточек
const createPhoto = (photo) => ({
  id: photo.id,
  url: photo.url,
  description: photo.description,
  likes: photo.likes,
  comments: photo.comments,
});

const generatePhotos = (data) => {
  const photos = [];

  data.forEach((photo) => {
    photos.push(createPhoto(photo));
  });

  return photos;
};

export {generatePhotos, createPhoto};
