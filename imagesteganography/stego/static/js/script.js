var HidingImage = null;
var FrontImage1 = null;
var FrontImage2 = null;
var HiddenImage = null;
var OutputImage1 = null;
var OutputImage2 = null;
var ImageWithSecret1 = null;
var ImageWithSecret2 = null;
var SecretImage = null;
var CanvasHide = document.getElementById("CanHide");
var CanvasFront1 = document.getElementById("CanFront1");
var CanvasFront2 = document.getElementById("CanFront2");
var CanvasOutput1 = document.getElementById("CanOutput1");
var CanvasOutput2 = document.getElementById("CanOutput2");
var CanvasWithSecret1 = document.getElementById("CanWithSecret1");
var CanvasWithSecret2 = document.getElementById("CanWithSecret2");
var CanvasExtract = document.getElementById("CanExtract");
var HidingText = document.getElementById("HidingText");
var ExtractedText = document.getElementById("ExtractedText");
var ControlSide = 0;
var ControlSideName = 'height';
var length = 0, lengthMax = 0, extrlength = 0;
var maxSize = '';
var left = 0;
var L = 0, extrL = 0;
var HidingImageWidth = 0, HidingImageHeight = 0;
var FrontImage1Width = 0, FrontImage1Height = 0;
var FrontImage2Width = 0, FrontImage2Height = 0;
var HiddenImageWidth = 0, HiddenImageHeight = 0;
var SecretImageWidth = 0, SecretImageHeight = 0;
var Arr = [], extrArr = [];

function getName() {
  var greeting;
  var person = prompt("Please, enter your name:", "");
  if (person === null || person === "") {
    greeting = "Hi, incognito...";
  } else {
    greeting = "Hi, " + person + "! It's so good to see you!";
  }
  document.getElementById("PersonalGreeting").innerHTML = greeting;
}

function loadHidingImage() {
  var imgFile = document.getElementById("HidingFile");
  HidingImage = new SimpleImage(imgFile);
  HidingImage.drawTo(CanvasHide);
  setTimeout(getSize, 1000, HidingImage);
}
function loadFrontImage1() {
  var imgFile = document.getElementById("FrontFile1");
  FrontImage1 = new SimpleImage(imgFile);
  FrontImage1.drawTo(CanvasFront1);
  setTimeout(getSize, 1000, FrontImage1);
  setTimeout(getControlSide, 1000);
  document.getElementById("SizeOfOutputImage1").innerHTML = null;
}
function loadFrontImage2() {
  var imgFile = document.getElementById("FrontFile2");
  if (imgFile.value) {
    FrontImage2 = new SimpleImage(imgFile);
    FrontImage2.drawTo(CanvasFront2);
    setTimeout(getSize, 1000, FrontImage2);
    document.getElementById("SizeOfOutputImage2").innerHTML = null;
    CanvasFront2.style.display = "block";
  } else {
    CanvasFront2.style.display = "none";
  }
}

function getSize(img) {
  switch(img) {
    case HidingImage:
      HidingImageWidth = img.getWidth();
      HidingImageHeight = img.getHeight();
      document.getElementById("SizeOfHidingImage").innerHTML = 'Size: ' + HidingImageWidth + '×' + HidingImageHeight;
      break;
    case FrontImage1:
      FrontImage1Width = img.getWidth();
      FrontImage1Height = img.getHeight();
      document.getElementById("SizeOfFrontImage1").innerHTML = 'Size: ' + FrontImage1Width + '×' + FrontImage1Height;
      break;
    case FrontImage2:
      FrontImage2Width = img.getWidth();
      FrontImage2Height = img.getHeight();
      document.getElementById("SizeOfFrontImage2").innerHTML = 'Size: ' + FrontImage2Width + '×' + FrontImage2Height;
      lengthMax = FrontImage2Width*FrontImage2Height;
      HidingText.maxLength = lengthMax;
      if (length > lengthMax) {
        alert('You have reached the maximum number of characters!');
        HidingText.value = HidingText.value.substr(0, lengthMax);
        length = lengthMax;
        document.getElementById("SizeOfText").innerHTML = length;
      }
      if (length !== 0) {lengthMax = lengthMax - defL();}
      left = lengthMax - length;
      maxSize = '(max.: ' + lengthMax;
      document.getElementById("MaxSizeOfText").innerHTML = maxSize;
      document.getElementById("chLeft").innerHTML = '; left: ' + left + ')';
      break;
    case ImageWithSecret1:
      SecretImageWidth = img.getWidth();
      SecretImageHeight = img.getHeight();
      document.getElementById("SizeOfImageWithSecret1").innerHTML = 'Size: ' + SecretImageWidth + '×' + SecretImageHeight;
      break;
    case ImageWithSecret2:
      ImageWithSecret2Width = img.getWidth();
      ImageWithSecret2Height = img.getHeight();
      document.getElementById("SizeOfImageWithSecret2").innerHTML = 'Size: ' + ImageWithSecret2Width + '×' + ImageWithSecret2Height;
      break;
  }
}

function koef(img) {
  return img.getWidth()/img.getHeight();
}
function getControlSide() {
  if (HidingImage.getWidth() >= HidingImage.getHeight()) {
    ControlSide = FrontImage1.getWidth();
    ControlSideName = 'width';
  }
  else {
    ControlSide = FrontImage1.getHeight();
  }
}

function lessenHidingImage() {
  HiddenImage = new SimpleImage(FrontImage1Width,FrontImage1Height);
  if (ControlSideName == 'width') {
    HidingImage.setSize(ControlSide,Math.round(ControlSide/koef(HidingImage)));
    HiddenImageWidth = HidingImage.getWidth();
    HiddenImageHeight = HidingImage.getHeight();
    var difHeight = Math.floor((FrontImage1Height - HiddenImageHeight)/2);
    for (var x = 0; x < FrontImage1Width; x++) {
      for (var y = difHeight; y <= HiddenImageHeight-1+difHeight; y++) {
        HiddenImage.setPixel(x,y,HidingImage.getPixel(x,y-difHeight));
      }
    }
  }
  else {
    HidingImage.setSize(Math.round(ControlSide*koef(HidingImage)),ControlSide);
    HiddenImageWidth = HidingImage.getWidth();
    HiddenImageHeight = HidingImage.getHeight();
    var difWidth = Math.floor((FrontImage1Width - HiddenImageWidth)/2);
    for (var x = difWidth; x <= HiddenImageWidth-1+difWidth; x++) {
      for (var y = 0; y < FrontImage1Height; y++) {
        HiddenImage.setPixel(x,y,HidingImage.getPixel(x-difWidth,y));
      }
    }
  }
}

function frameHidingImage() {
  var difWidth = Math.floor((FrontImage1Width - HidingImageWidth)/2);
  var difHeight = Math.floor((FrontImage1Height - HidingImageHeight)/2);
  HiddenImage = new SimpleImage(FrontImage1Width,FrontImage1Height);
  for (var x = difWidth; x <= HidingImageWidth-1+difWidth; x++) {
    for (var y = difHeight; y <= HidingImageHeight-1+difHeight; y++) {
      HiddenImage.setPixel(x,y,HidingImage.getPixel(x-difWidth,y-difHeight));
    }
  }
}

function Clear4Bits(ColorValue) {
  return Math.floor(ColorValue/16)*16;
}
function Chop2Hide(img) {
  var image = img;
  var newRed, newGreen, newBlue;
  for (var x = 0; x < FrontImage1Width; x++) {
    for (var y = 0; y < FrontImage1Height; y++) {
      newRed = Clear4Bits(img.getRed(x,y));
      newGreen = Clear4Bits(img.getGreen(x,y));
      newBlue = Clear4Bits(img.getBlue(x,y));
      image.setRed(x,y,newRed);
      image.setGreen(x,y,newGreen);
      image.setBlue(x,y,newBlue);
    }
  }
  return image;
}
function Shift(img) {
  var image = img;
  var newRed, newGreen, newBlue;
  for (var x = 0; x < img.getWidth(); x++) {
    for (var y = 0; y < img.getHeight(); y++) {
      newRed = img.getRed(x,y) / 16;
      newGreen = img.getGreen(x,y) / 16;
      newBlue = img.getBlue(x,y) / 16;
      image.setRed(x,y,newRed);
      image.setGreen(x,y,newGreen);
      image.setBlue(x,y,newBlue);
    }
  }
  return image;
}

function HideImage() {
  if (HidingImage === null && FrontImage1 != null) {
    alert('Hiding Image not loaded!');
    return;
  }
  if (HidingImage != null && FrontImage1 === null) {
    alert('Front Image not loaded!');
    return;
  }
  if (HidingImage === null && FrontImage1 === null) {
    alert('Images not loaded!');
    return;
  }
  Clear('CanOutput1');
  ControlSideName = 'height';
  if (HidingImageWidth > FrontImage1Width || HidingImageHeight > FrontImage1Height) {
    lessenHidingImage();
  }
  else {
    frameHidingImage();
  }
  OutputImage1 = new SimpleImage(FrontImage1Width, FrontImage1Height);
  var ImageHide = Shift(HiddenImage);
  var ImageShow = Chop2Hide(FrontImage1);
  var red, green, blue;
  for (var x = 0; x < FrontImage1Width; x++) {
    for (var y = 0; y < FrontImage1Height; y++) {
      red = ImageHide.getRed(x,y) + ImageShow.getRed(x,y);
      green = ImageHide.getGreen(x,y) + ImageShow.getGreen(x,y);
      blue = ImageHide.getBlue(x,y) + ImageShow.getBlue(x,y);
      OutputImage1.setRed(x,y,red);
      OutputImage1.setGreen(x,y,green);
      OutputImage1.setBlue(x,y,blue);
    }
  }
  OutputImage1.drawTo(CanvasOutput1);
  document.getElementById("SizeOfOutputImage1").innerHTML = 'Size: ' + OutputImage1.getWidth() + '×' + OutputImage1.getHeight();
}

var messageBox = document.search.HidingText;
var printBlock = document.getElementById("SizeOfText");
function chCount() {
  document.getElementById("SizeOfOutputImage2").innerHTML = null;
  var characters = HidingText.value.split('');
  length = characters.length;
  if (length == 0 && FrontImage2 != null) {
    lengthMax = FrontImage2Width*FrontImage2Height;
    maxSize = ' (max.: ' + lengthMax;
    document.getElementById("MaxSizeOfText").innerHTML = maxSize;
    L = 0;
    left = lengthMax;
  }
  if (defL() != L && length > 0 && FrontImage2 != null) {
    if (defL() > L) {lengthMax = lengthMax - L - 1;}
    else {lengthMax += L;}
    maxSize = ' (max.: ' + lengthMax;
    document.getElementById("MaxSizeOfText").innerHTML = maxSize;
    HidingText.maxLength = lengthMax;
    L = defL();
  }
  if (lengthMax != 0 && length >= lengthMax && FrontImage2 != null) {
    alert('You have reached the maximum number of characters!');
  }
  if (FrontImage2 != null) {
    left = lengthMax - length;
    document.getElementById("chLeft").innerHTML = '; left: ' + left + ')';
  }
  if (FrontImage2 === null) {
    document.getElementById("MaxSizeOfText").innerHTML = null;
    document.getElementById("chLeft").innerHTML = null;
  }
  document.getElementById("SizeOfText").innerHTML = length;
  
}
messageBox.addEventListener("keyup", chCount);

function getCharCode(n) {
  return HidingText.value.charCodeAt(n-1);
}

function defL() {
  return Math.floor(Math.log(length)/(12*Math.log(2)))+1;
}

function createArray() {
  var length0 = length;
  for (var j = 3*L-1; j >= 0; j--) {
    Arr[j] = length0 % 16;
    length0 = Math.floor(length0 / 16);
  }
}

function HideText() {
  if (HidingText.value == '' && FrontImage2 != null) {
    alert('Text not input!');
    return;
  }
  if (HidingText.value != '' && FrontImage2 === null) {
    alert('Front Image not loaded!');
    return;
  }
  if (HidingText.value == '' && FrontImage2 === null) {
    alert('Text not input and Front Image not loaded!');
    return;
  }
  Clear('CanOutput2');
  OutputImage2 = new SimpleImage(FrontImage2Width, FrontImage2Height);
  for (var x = 0; x < FrontImage2Width; x++) {
    for (var y = 0; y < FrontImage2Height; y++) {
      newRed = Clear4Bits(FrontImage2.getRed(x,y));
      newGreen = Clear4Bits(FrontImage2.getGreen(x,y));
      newBlue = Clear4Bits(FrontImage2.getBlue(x,y));
      OutputImage2.setRed(x,y,newRed);
      OutputImage2.setGreen(x,y,newGreen);
      OutputImage2.setBlue(x,y,newBlue);
    }
  }
  var red, green, blue;
  L = defL();
  var L0 = L;
  createArray();
  var chNumber = 0, chNumber1 = 0, chNumber2 = 0, chNumber3 = 0;
  var i = 1;
  for (var x = 0; x < FrontImage2Width; x++) {
    for (var y = 0; y < FrontImage2Height; y++) {
      if (i > 1 + L + length) {break;}
      red = OutputImage2.getRed(x,y);
      green = OutputImage2.getGreen(x,y);
      blue = OutputImage2.getBlue(x,y);
      if (i == 1) {
        var L1 = Math.floor(L0 / 256);
        var L2 = Math.floor(L0 / 16) % 16;
        var L3 = L0 % 16;
        red += L1;
        green += L2;
        blue += L3;
      }
      else if (i <= 1 + L) {
        red += Arr[3*i-6];
        green += Arr[3*i-5];
        blue += Arr[3*i-4];
      }
      else {
        chNumber = getCharCode(i-1-L);
        chNumber1 = Math.floor(chNumber / 256);
        chNumber2 = Math.floor(chNumber / 16) % 16;
        chNumber3 = chNumber % 16;
        red += chNumber1;
        green += chNumber2;
        blue += chNumber3;
      }
      OutputImage2.setRed(x,y,red);
      OutputImage2.setGreen(x,y,green);
      OutputImage2.setBlue(x,y,blue);
      i += 1;
    }
  }
  OutputImage2.drawTo(CanvasOutput2);
  document.getElementById("SizeOfOutputImage2").innerHTML = 'Size: ' + FrontImage2Width + '×' + FrontImage2Height;
}


function loadImageWithSecret1() {
  document.getElementById("SizeOfSecretImage").innerHTML = null;
  var imgFile = document.getElementById("FileWithSecret1");
  ImageWithSecret1 = new SimpleImage(imgFile);
  ImageWithSecret1.drawTo(CanvasWithSecret1);
  setTimeout(getSize, 1000, ImageWithSecret1);
}
function loadImageWithSecret2() {
  ExtractedText.value = '';
  var imgFile = document.getElementById("FileWithSecret2");
  ImageWithSecret2 = new SimpleImage(imgFile);
  ImageWithSecret2.drawTo(CanvasWithSecret2);
  setTimeout(getSize, 1000, ImageWithSecret2);
}

function ExtractImage() {
  if (ImageWithSecret1 === null) {
    alert('Image not loaded!');
    return;
  }
  Clear('CanExtract');
  SecretImage = new SimpleImage(SecretImageWidth, SecretImageHeight);
  var red, blue, green;
  for (var x = 0; x < SecretImageWidth; x++) {
    for (var y = 0; y < SecretImageHeight; y++) {
      red = ImageWithSecret1.getRed(x,y);
      green = ImageWithSecret1.getGreen(x,y);
      blue = ImageWithSecret1.getBlue(x,y);
      red = (red % 16) * 16;
      green = (green % 16) * 16;
      blue = (blue % 16) * 16;
      SecretImage.setRed(x,y,red);
      SecretImage.setGreen(x,y,green);
      SecretImage.setBlue(x,y,blue);
    }
  }
  SecretImage.drawTo(CanvasExtract);
  document.getElementById("SizeOfSecretImage").innerHTML = 'Size: ' + SecretImageWidth + '×' + SecretImageHeight;
}

function getL() {
  var extrL1 = ImageWithSecret2.getRed(0,0);
  var extrL2 = ImageWithSecret2.getGreen(0,0);
  var extrL3 = ImageWithSecret2.getBlue(0,0);
  extrL1 = (extrL1 % 16) * 256;
  extrL2 = (extrL2 % 16) * 16;
  extrL3 = extrL3 % 16;
  return extrL1 + extrL2 + extrL3;
}
function getLength() {
  var d = 1;
  for (var j = 3*extrL-1; j >=0; j--) {
    extrlength += extrArr[j]*d;
    d *= 16;
  }
}

function ExtractText() {
  ExtractedText.value = '';
  extrlength = 0;
  if (ImageWithSecret2 === null) {
    alert('Image not loaded!');
    return;
  }
  extrL = getL();
  var red, green, blue;
  var extrchNumber = 0, extrchNumber1 = 0, extrchNumber2 = 0, extrchNumber3 = 0;
  var extrChar;
  var i = 0;
  for (var x = 0; x < ImageWithSecret2Width; x++) {
    for (var y = 0; y < ImageWithSecret2Height; y++) {
      if (i == 0) {i += 1;}
      else if (i <= extrL) {
        red = ImageWithSecret2.getRed(x,y);
        green = ImageWithSecret2.getGreen(x,y);
        blue = ImageWithSecret2.getBlue(x,y);
        extrArr[3*i-3] = red % 16;
        extrArr[3*i-2] = green % 16;
        extrArr[3*i-1] = blue % 16;
        if (i == extrL) {getLength();}
        i += 1;
      }
      else if (i <= extrL + 1 + extrlength) {
        red = ImageWithSecret2.getRed(x,y);
        green = ImageWithSecret2.getGreen(x,y);
        blue = ImageWithSecret2.getBlue(x,y);
        extrchNumber1 = (red % 16) * 256;
        extrchNumber2 = (green % 16) * 16;
        extrchNumber3 = blue % 16;
        extrchNumber = extrchNumber1 + extrchNumber2 + extrchNumber3;
        extrChar = String.fromCharCode(extrchNumber);
        ExtractedText.value += extrChar;
        i += 1;
      }
      else {break;}
    }
    if (extrlength != 0) {
      if (i > extrL + 1 + extrlength) {
        document.getElementById("SizeOfExtractedText").innerHTML = 'Size: ' + extrlength + ' symbols';
        break;
      }
    }
  }
}


function Clear(can) {
  var canvas = document.getElementById(can);
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
  canvas.style.backgroundColor = "white";
}
function Reset1() {
  Clear('CanHide');
  Clear('CanFront1');
  Clear('CanOutput1');
  HidingImage = null;
  FrontImage1 = null;
  HiddenImage = null;
  OutputImage1 = null;
  HidingFile.value = null;
  FrontFile1.value = null;
  ControlSideName = 'height';
  document.getElementById("SizeOfHidingImage").innerHTML = 'Size: ____×____';
  document.getElementById("SizeOfFrontImage1").innerHTML = 'Size: ____×____';
  document.getElementById("SizeOfOutputImage1").innerHTML = null;
}
function Reset2() {
  HidingText.value = '';
  lengthMax = 0;
  maxSize = '';
  L = 0;
  Clear('CanFront2');
  Clear('CanOutput2');
  FrontImage2 = null;
  OutputImage2 = null;
  FrontFile2.value = null;
  document.getElementById("SizeOfText").innerHTML = '____';
  document.getElementById("MaxSizeOfText").innerHTML = null;
  document.getElementById("chLeft").innerHTML = null;
  document.getElementById("SizeOfFrontImage2").innerHTML = 'Size: ____×____';
  document.getElementById("SizeOfOutputImage2").innerHTML = null;
}
function Reset3() {
  Clear('CanWithSecret1');
  Clear('CanExtract');
  ImageWithSecret1 = null;
  SecretImage = null;
  FileWithSecret1.value = null;
  document.getElementById("SizeOfImageWithSecret1").innerHTML = 'Size: ____×____';
  document.getElementById("SizeOfSecretImage").innerHTML = null;
}
function Reset4() {
  Clear('CanWithSecret2');
  ExtractedText.value = '';
  extrlength = 0;
  ImageWithSecret2 = null;
  FileWithSecret2.value = null;
  document.getElementById("SizeOfImageWithSecret2").innerHTML = 'Size: ____×____';
  document.getElementById("SizeOfExtractedText").innerHTML = null;
}
function downloadImage() {
  const canvas = document.getElementById("CanOutput2");
  if (canvas.style.display === "none") {
    alert("Please hide text in an image first!");
    return;
  }
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "encoded-image.png";
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function downloadImages() {
  const canvas = document.getElementById("CanOutput1");
  if (canvas.style.display === "none") {
    alert("Please hide text in an image first!");
    return;
  }
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "encoded-image.png";
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}