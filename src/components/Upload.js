import React, { useState } from "react";
import Card from "./ui/Card";
import CircularProgress from "@material-ui/core/CircularProgress";

import imageIcon from "../assets/image.svg";
import "./Upload.css";
import Button from "./ui/Button";
import axios from "axios";
import { toast } from "react-toastify";

const isImage = (icon) => {
  const ext = [".jpg", ".jpeg", ".bmp", ".gif", ".png", ".svg"];
  return ext.some((el) => icon.endsWith(el));
};

export default function Upload({ setLink, setFileUploaded }) {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState();
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState();

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let imageFile = e.dataTransfer.files[0];
    if (!isImage(imageFile.name)) return toast.error("File must be an image!");
    handleFileChange(imageFile);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggedOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggedOver(false);
  };
  const handleFileChange = (file) => {
    // console.log(file);
    if (!isImage(file.name)) return toast.error("File must be an image!");
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
  const handleUpload = async () => {
    console.log(image.name);
    if (!isImage(image.name)) return toast.error("File must be an image!");
    setUploading(true);
    try {
      const form = new FormData();
      // uploading file needs 3 arguments
      form.append("imageFile", image); //, image.name

      const response = await axios.post(
        process.env.REACT_APP_UPLOADER_API,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      let data = response.data;

      if (data.error) return toast.error("Failed to upload image");

      setLink(data);
      setPreviewUrl();
      setImage();
      setUploading(false);
      setFileUploaded(true);
    } catch (err) {
      setUploading(false);
      toast.error("Failed to upload image!");
      console.log("image not sent -- ", err);
    }
  };
  const handleRemoveImage = () => {
    setImage();
    setPreviewUrl();
  };

  const displayImage = previewUrl ? (
    <img src={previewUrl} className="upload-preview" alt="" />
  ) : (
    <>
      <img src={imageIcon} className="upload-placeholder" alt="" />
      <p>Drag & Drop your image here</p>
    </>
  );

  return (
    <Card className="upload">
      <h3>Upload your image</h3>
      <p>File should be Jpeg, Png...</p>
      <div
        className={`upload-area ${isDraggedOver && "drag-over"}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {image && (
          <i className="fas fa-times-circle" onClick={handleRemoveImage}></i>
        )}
        {displayImage}
      </div>
      <p>Or</p>
      <input
        type="file"
        id="upload-img"
        name="image"
        onChange={(e) => handleFileChange(e.target.files[0])}
      />
      <label htmlFor="upload-img">Choose a file</label>
      {!uploading ? (
        <Button
          onClick={handleUpload}
          fullWidth
          disabled={image ? false : true}
        >
          Upload
        </Button>
      ) : (
        <Button disabled fullWidth>
          Uploading. Please wait... <CircularProgress size="1rem" />
        </Button>
      )}
    </Card>
  );
}
