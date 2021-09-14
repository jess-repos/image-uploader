import { useState } from "react";
import ShowImage from "./components/ShowImage";
import Toast from "./components/ui/Toast";
import Upload from "./components/Upload";
function App() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [link, setLink] = useState();

  return (
    <>
      {!fileUploaded ? (
        <Upload setLink={setLink} setFileUploaded={setFileUploaded} />
      ) : (
        <ShowImage
          link={link}
          setLink={setLink}
          setFileUploaded={setFileUploaded}
        />
      )}
      <p className="footer">
        created by <span>J E S S</span> - devChallenges.io
      </p>
      <Toast />
    </>
  );
}

export default App;
