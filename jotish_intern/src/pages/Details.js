import { useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Details.css";

function Details() {
  const navigate = useNavigate();
  const { id } = useParams();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.log("Camera error:", err);
      });
  }, []);

  const capturePhoto = () => {
    const video = videoRef.current;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/png");

    setPhoto(imageData);
  };

  // Start Drawing
  const startDraw = () => {
    setDrawing(true);
  };

  const endDraw = () => {
    setDrawing(false);
  };

  const draw = (e) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const mergeImages = () => {
    const img = new Image();
    img.src = photo;

    img.onload = () => {
      const mergeCanvas = document.createElement("canvas");
      const ctx = mergeCanvas.getContext("2d");

      mergeCanvas.width = img.width;
      mergeCanvas.height = img.height;

      ctx.drawImage(img, 0, 0);
      ctx.drawImage(canvasRef.current, 0, 0);

      const finalImage = mergeCanvas.toDataURL("image/png");

      localStorage.setItem("auditImage", finalImage);

      navigate("/analytics");
    };
  };

  return (
    <div className="details-container">
      <h2>Employee Verification - {id}</h2>

      {!photo && (
        <div className="camera-section">
          <video ref={videoRef} autoPlay className="video" />
          <br />
          <button onClick={capturePhoto}>Capture Photo</button>
        </div>
      )}

      {photo && (
        <div className="signature-section">
          <div className="image-wrapper">
            <img src={photo} alt="Captured" />

            <canvas
              ref={canvasRef}
              width="400"
              height="300"
              className="signature-canvas"
              onMouseDown={startDraw}
              onMouseUp={endDraw}
              onMouseMove={draw}
            />
          </div>

          <br />
          <button onClick={mergeImages}>Merge Photo + Signature</button>
        </div>
      )}
    </div>
  );
}

export default Details;
