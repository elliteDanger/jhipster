export const openFile = (contentType: string, data: string) => () => {
  const fileURL = `data:${contentType};base64,${data}`;
  const win = window.open();
  win.document.write(
    '<iframe src="' +
      fileURL +
      '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
  );
};

const toBase64 = (file: File, cb: Function) => {
  const fileReader: FileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = e => {
    const base64Data = e.target['result'].substr(e.target['result'].indexOf('base64,') + 'base64,'.length);
    cb(base64Data);
  };
};

export const paddingSize = (value: string): number => {
  if (value.endsWith('==')) {
    return 2;
  }
  if (value.endsWith('=')) {
    return 1;
  }
  return 0;
};

export const formatAsBytes = (sizeValue: number): string => sizeValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' bytes';

export const size = (value: string): number => value.length / 4 * 3 - paddingSize(value);

export const byteSize = (base64String: string) => formatAsBytes(size(base64String));

export const setFileData = (event, callback: Function, isImage: boolean) => {
  if (event && event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    if (isImage && !/^image\//.test(file.type)) {
      return;
    }

    toBase64(file, base64Data => {
      callback(file.type, base64Data);
    });
  }
};
