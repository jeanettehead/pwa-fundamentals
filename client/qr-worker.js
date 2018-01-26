import QrCode from 'qrcode-reader';
import {qrCodeStringToObject} from './utils/qrcode';

const log = console.info.bind(console);
log('helloooo')

self.onmessage = evt => {
  log(evt)
  let imageBuffer = evt.data;
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
  qr.decode(imageBuffer);
}