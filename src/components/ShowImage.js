import React from "react";
import "./ShowImage.css";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Card from "./ui/Card";
import { toast } from "react-toastify";
export default function ShowImage({ link, setLink, setFileUploaded }) {
  const resethandler = () => {
    setLink();
    setFileUploaded(false);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    toast("Link copied to clipboard!");
  };
  return (
    <Card className="show-image">
      <div className="back">
        <Button onClick={resethandler}>
          <i className="fas fa-plus-square"></i>
        </Button>
      </div>
      <i className="fas fa-check-circle"></i>
      <h3>Uploaded Successfully!</h3>
      <img src={link} alt="" />
      <div className="control">
        <Input value={link} fullWidth />
        <Button onClick={handleCopy}>Copy Link</Button>
      </div>
    </Card>
  );
}
