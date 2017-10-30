import QrCode from 'qrcode-reader';
import {qrCodeStringToObject} from './utils/qrcode';


self.onmessge = ({data}) => {
  decodeQrCode(data.image, data.resolve);
}

function decodeQrCode(image) {
  let qr = new QrCode();
  qr.callback = function (error, rawResult) {
    log(error)
    if (error) {
      self.postMessage({ error });
      return;
    }
    let result = qrCodeStringToObject(rawResult.result);
    self.postMessage({data: result});
  }
  qr.decode(image);
} 