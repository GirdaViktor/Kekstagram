const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const uploadFile = document.querySelector('#upload-file');

uploadFile.addEventListener('change', () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }
});
