import { deletePhoto } from '../cloudinary';
import { getImagesByEvent } from './imageData';

const deleteCldImages = (id) => new Promise((resolve, reject) => {
  getImagesByEvent(id).then((imagesArr) => {
    console.warn(imagesArr);
    const deletePhotos = imagesArr.map((image) => deletePhoto(image));
    Promise.all(deletePhotos)
      .then(resolve)
      .catch(reject);
  });
});

export default deleteCldImages;
