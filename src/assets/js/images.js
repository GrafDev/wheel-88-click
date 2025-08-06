// Import images
import textWheelImg from '@images/text_wheel.png';
import textWheelCanadaImg from '@images/text_wheel-canada.png';
import modalBgImg from '@images/modal_bg.png';
import modalBgCanadaButtonImg from '@images/modal_bg-canada-button.png';
import modalBgCanadaAutoImg from '@images/modal_bg-canada-auto.png';

// Create image mapping for dynamic loading
const imageMap = {
    'text_wheel.png': textWheelImg,
    'text_wheel-canada.png': textWheelCanadaImg,
    'modal_bg.png': modalBgImg,
    'modal_bg-canada-button.png': modalBgCanadaButtonImg,
    'modal_bg-canada-auto.png': modalBgCanadaAutoImg
};

// Export function to get image path
export function getImagePath(imageName) {
    return imageMap[imageName] || `./src/assets/images/${imageName}`;
}