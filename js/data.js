//// Генерация фотокарточек
const createPhoto = (photo) => ({
  id: photo.id,
  url: photo.url,
  description: photo.description,
  likes: photo.likes,
  comments: photo.comments,
});

export {createPhoto};
