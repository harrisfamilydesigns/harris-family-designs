import { useState, useEffect } from 'react';
import { Button, Upload } from 'antd';
import {
  InboxOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import cv from '@techstark/opencv-js';

const { Dragger } = Upload;

const RemoveBg = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [srcMat, setSrcMat] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);

  // useEffect(() => {
  //   // Load OpenCV.js
  //   const loadOpenCV = () => {
  //     return new Promise((resolve) => {
  //       const script = document.createElement('script');
  //       script.src = 'https://docs.opencv.org/4.x/opencv.js';
  //       script.async = true;
  //       script.onload = () => resolve();
  //       document.body.appendChild(script);
  //     });
  //   };

  //   loadOpenCV().then(() => {
  //     console.log('OpenCV.js is loaded');
  //   })

  //   return () => {
  //     // Cleanup
  //     // cv.delete();
  //   }
  // }, []);

  const uploadProps = {
    name: 'file',
    multiple: false,
    beforeUpload: file => {
      const reader = new FileReader();
      reader.onload = e => {
        setImageUrl(e.target.result);

        // For opencv processing
        const imgElement = document.createElement('img');
        imgElement.src = e.target.result;

        imgElement.onload = () => {
          const src = cv.imread(imgElement); // Read the image into a Mat
          setSrcMat(src);
        };

      };
      reader.readAsDataURL(file);

      return false;
    },
    onChange: info => {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop: e => {
      console.log('Dropped files', e.dataTransfer.files);
    }
  }

  const handleRemoveUpload = () => {
    setImageUrl(null);
    setProcessedImageUrl(null);
    if (srcMat) {
      srcMat.delete();
      setSrcMat(null);
    }
  }

  // TODO: Update to use floodFill to remove background in enclosed areas (https://chatgpt.com/c/6706d294-b85c-800a-ae2a-45ce7963ccca)
  const removeBackground = async () => {
    if (!srcMat) return;

    const dstMat = new cv.Mat(); // Create an empty Mat to hold the result
    const gray = new cv.Mat();
    const binary = new cv.Mat();

    // Convert to grayscale
    cv.cvtColor(srcMat, gray, cv.COLOR_RGBA2GRAY);
    // Apply a binary threshold to separate the logo from the background
    cv.threshold(gray, binary, 200, 255, cv.THRESH_BINARY_INV);

    // Create a mask
    const contours = new cv.MatVector(); // Create a MatVector to hold the contours
    const hierarchy = new cv.Mat(); // Create a Mat to hold the hierarchy
    cv.findContours(binary, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

    // Create a mask to apply to the original image
    const mask = new cv.Mat(srcMat.rows, srcMat.cols, cv.CV_8UC1, new cv.Scalar(0)); // Initialize a mask with zeros

    // Draw the contours on the mask
    for (let i = 0; i < contours.size(); i++) {
        const color = new cv.Scalar(255); // White color for the mask
        cv.drawContours(mask, contours, i, color, cv.FILLED); // Fill the contour in the mask
    }

    // Apply the mask to the original image
    srcMat.copyTo(dstMat, mask); // Use the mask to copy the source image to destination

    // Show the result on the canvas
    const canvas = document.createElement('canvas');
    canvas.width = dstMat.cols;
    canvas.height = dstMat.rows;
    cv.imshow(canvas, dstMat);

    // Convert the canvas content to a Data URL and update processedImageUrl
    const processedUrl = canvas.toDataURL();
    setProcessedImageUrl(processedUrl);

    // Cleanup
    srcMat.delete();
    gray.delete();
    binary.delete();
    hierarchy.delete();
    mask.delete();
    dstMat.delete();
    contours.delete(); // Clean up the contours MatVector
  };

  return (
    <div>
      <h1>Remove Background</h1>
      <p>Remove the background from an image.</p>

      {imageUrl && (
        <div className="mt-3 grid grid-cols-12">
          <div className="col-span-9 flex justify-center">
          <img src={processedImageUrl || imageUrl} alt="Uploaded preview" style={{ maxWidth: '300px', height: 'auto' }} />
          </div>
          <div className="col-span-3 flex flex-col items-end">
            <Button onClick={removeBackground} type="primary" icon={<EditOutlined/>} className="mb-3">
              Remove Background
            </Button>

            <Button onClick={handleRemoveUpload} icon={<DeleteOutlined />} type="default">
              Delete
            </Button>
          </div>
        </div>
      )}

      {!imageUrl && (
        <div className="mt-5">
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Select a file to get started
            </p>
          </Dragger>
        </div>
      )}

    </div>
  );
}

export default RemoveBg;
