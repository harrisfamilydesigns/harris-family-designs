import { useState, useEffect } from 'react';
import { Button, Upload } from 'antd';
import {
  InboxOutlined,
  DeleteOutlined,
  EditOutlined,
  DownloadOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import cv from '@techstark/opencv-js';

const { Dragger } = Upload;

const RemoveBg = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [srcMat, setSrcMat] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);

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

  const removeBackgroundSimple = async () => {
    if (!srcMat) return;

    // Assume pixel at (0, 0) is the background color
    const bgColor = srcMat.ucharPtr(0, 0);

    // Change all pixels with the background color to transparent
    for (let i = 0; i < srcMat.rows; i++) {
      for (let j = 0; j < srcMat.cols; j++) {
        const pixel = srcMat.ucharPtr(i, j);
        if (pixel[0] === bgColor[0] && pixel[1] === bgColor[1] && pixel[2] === bgColor[2]) {
          pixel[3] = 0;
        }
      }
    }

    // Show the result on a canvas
    const canvas = document.createElement('canvas');
    canvas.width = srcMat.cols;
    canvas.height = srcMat.rows;
    cv.imshow(canvas, srcMat);

    // Convert the canvas content to a Data URL and update processedImageUrl
    const processedUrl = canvas.toDataURL();
    setProcessedImageUrl(processedUrl);
  }

  const handleDownload = () => {
    if (!processedImageUrl) return;

    const link = document.createElement('a');
    link.href = processedImageUrl;
    link.download = 'processed-image.png';
    link.click();
  }

  return (
    <div>
      <h1>Make background transparent</h1>
      <p>Upload an image and click on "Remove Background" to make the background transparent.</p>

      {imageUrl && (
        <div className="mt-3 grid grid-cols-12">
          <div className="col-span-12 md:col-span-8 flex justify-center">
            <div
              className="border border-gray-300 p-1"
              // checkerboard background
              style={{
                backgroundImage: 'linear-gradient(45deg, #eaeaea 25%, transparent 25%, transparent 75%, #eaeaea 75%, #eaeaea 100%), linear-gradient(45deg, #eaeaea 25%, transparent 25%, transparent 75%, #eaeaea 75%, #eaeaea 100%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 10px 10px',
              }}
            >
              <img src={processedImageUrl || imageUrl} alt="Uploaded preview" style={{ maxWidth: '300px', height: 'auto' }} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 grid grid-rows-2 mt-3 md:mt-0 flex flex-col">
            <div>
              <Button
                type="primary"
                className="mb-3 w-full"
                icon={<EditOutlined/>}
                disabled={!!processedImageUrl}
                onClick={removeBackgroundSimple}>
                Remove Background
              </Button>

              <Button
                type="primary"
                className="mb-3 w-full"
                icon={<DownloadOutlined />}
                disabled={!processedImageUrl}
                onClick={handleDownload}>
                Download
              </Button>
            </div>

            <div className="md:flex md:flex-col md:justify-end">
              <Button
                type="default"
                className="mb-3 w-full"
                icon={<UndoOutlined />}
                disabled={!processedImageUrl}
                onClick={() => setProcessedImageUrl(null)}>
                Undo
              </Button>

              <Button
                type="default"
                className="w-full"
                icon={<DeleteOutlined />}
                onClick={handleRemoveUpload}>
                Delete
              </Button>
            </div>
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
