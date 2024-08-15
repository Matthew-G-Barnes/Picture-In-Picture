const videoElement = document.getElementById('video');
const button = document.getElementById('button');

//makes sure meta data is installed
function waitForMetadata(videoElement) {
    return new Promise((resolve) => {
        // If metadata is already loaded
        if (videoElement.readyState >= 1) {
            resolve();
        } else {
            // Otherwise, wait for the 'loadedmetadata' event
            videoElement.addEventListener('loadedmetadata', resolve, { once: true });
        }
    });
}

//Prompt to select media stream, pass to video element, them play
async function selectMediaStream() {
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch (error) {
        //catch Error Here
        console.log('you done fucked up', error);
    }
}

button.addEventListener('click', async () => {
    
    // disable button
    button.disabled = true;
    //asks to select window
    await selectMediaStream();
    //wait for meta data to download
    await waitForMetadata(videoElement);
    let attempts = 0;
    //Start picture in picture
    await videoElement.requestPictureInPicture();
    //reset Button
    button.disabled = false;
    attempts = 0
});
