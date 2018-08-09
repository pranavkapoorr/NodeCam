import "babel-polyfill";
import {Webcam} from "./webcam";

const webcam = new Webcam(document.getElementById('webcam'));

async function init() {
    try {
      await webcam.setup();
      document.getElementById('no-webcam').style.display = 'none';
    } catch (e) {
      document.getElementById('no-webcam').style.display = 'block';
    }
}
init();