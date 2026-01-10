import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import {
  FiArrowLeft,
  FiPhone,
  FiMic,
  FiSmile,
  FiImage,
  FiSend,
  FiX,
} from "react-icons/fi";

const emojis = ["😀", "😂", "😍", "😢", "😡", "👍", "🙏", "🎉", "❤️"];

export default function Support() {
  const navigate = useNavigate();
  const bottomRef = useRef(null);
  const fileRef = useRef(null);

  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [image, setImage] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, text: "Food is not delivered", type: "sent" },
    { id: 2, text: "We are preparing", type: "received" },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* 🎤 VOICE INPUT */
  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Voice not supported");
    const recog = new SpeechRecognition();
    recog.lang = "en-IN";
    recog.onresult = (e) => setMessage(e.results[0][0].transcript);
    recog.start();
  };

  /* 🖼️ IMAGE */
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  /* 🔗 SEND + BACKEND */
  const sendMessage = async () => {
    if (!message && !image) return;

    setMessages((p) => [
      ...p,
      { id: Date.now(), text: message, image, type: "sent" },
    ]);

    const userMsg = message;
    setMessage("");
    setImage(null);

    // Simulate reply
    setTimeout(() => {
      setMessages((p) => [
        ...p,
        { id: Date.now() + 1, text: "Thanks for reaching out! We'll be with you shortly.", type: "received" },
      ]);
    }, 1500);
  };

  return (
    <PageWrapper className="h-screen flex flex-col max-w-[430px] mx-auto bg-white">

      {/* HEADER */}
      <header className="h-14 border-b px-4 flex items-center justify-between">
        <FiArrowLeft onClick={() => navigate(-1)} />
        <h1 className="text-sm font-semibold">Support</h1>
        <FiPhone />
      </header>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${m.type === "sent"
              ? "bg-black text-white ml-auto rounded-tr-sm"
              : "bg-gray-100 text-black rounded-tl-sm"
              }`}
          >
            {m.text}
            {m.image && (
              <img src={m.image} alt="" className="mt-2 rounded-lg w-full" />
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* EMOJI PICKER */}
      {showEmoji && (
        <div className="grid grid-cols-5 gap-2 p-3 border-t">
          {emojis.map((e) => (
            <button
              key={e}
              onClick={() => {
                setMessage((p) => p + e);
                setShowEmoji(false);
              }}
            >
              {e}
            </button>
          ))}
        </div>
      )}

      {/* IMAGE PREVIEW */}
      {image && (
        <div className="px-3 pb-2">
          <div className="relative w-32">
            <img src={image} className="rounded-lg" />
            <FiX
              className="absolute top-1 right-1 bg-white rounded-full"
              onClick={() => setImage(null)}
            />
          </div>
        </div>
      )}

      {/* INPUT BAR */}
      <div className="border-t px-3 py-2 flex items-center gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message..."
          className="flex-1 border rounded-full px-4 py-2 text-sm"
        />

        <FiMic onClick={startVoice} />
        <FiSmile onClick={() => setShowEmoji(!showEmoji)} />
        <FiImage onClick={() => fileRef.current.click()} />
        <FiSend onClick={sendMessage} />

        <input type="file" hidden ref={fileRef} onChange={handleImage} />


      </div>
    </PageWrapper>
  );
}
