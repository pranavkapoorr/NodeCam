
import "babel-polyfill";
export class Webcam {
    /**
     * @param {HTMLVideoElement} webcamElement A HTMLVideoElement representing the webcam feed.
     */
    constructor(webcamElement) {
      this.webcamElement = webcamElement;
    }
  
    /**
     * Adjusts the video size so we can make a centered square crop without
     * including whitespace.
     * @param {number} width The real width of the video element.
     * @param {number} height The real height of the video element.
     */
    adjustVideoSize(width, height) {
      const aspectRatio = width / height;
      if (width >= height) {
        this.webcamElement.width = aspectRatio * this.webcamElement.height;
      } else if (width < height) {
        this.webcamElement.height = this.webcamElement.width / aspectRatio;
      }
    }
  
    async setup() {
      return new Promise((resolve, reject) => {
        const navigatorAny = navigator;
        navigator.getUserMedia = navigator.getUserMedia ||
            navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
            navigatorAny.msGetUserMedia;
        if (navigator.getUserMedia) {
          navigator.getUserMedia(
              {video: true},
              stream => {
                this.webcamElement.srcObject = stream;
                this.webcamElement.addEventListener('loadeddata', async () => {
                  this.adjustVideoSize(
                      this.webcamElement.videoWidth,
                      this.webcamElement.videoHeight);
                  resolve();
                }, false);
              },
              error => {
                reject();
              });
        } else {
          reject();
        }
      });
    }
  }