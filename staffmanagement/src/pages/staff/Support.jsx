import { useState, useRef, useEffect } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiPhone, FiMic, FiSmile, FiImage, FiSend } from "react-icons/fi";

export default function Support() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, text: "Food is not delivered", sender: "user" },
    { id: 2, text: "Hmmm", sender: "support" },
    { id: 3, text: "We are preparing", sender: "support" },
    { id: 4, text: "Deliverers with in 10 mins", sender: "support" },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim() === "") return;

    // Add user message
    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: "support", // Based on image, right side is "support" (replies) but traditionally the user IS the one typing. 
      // WAIT. "Food is not devliverd" (Left/Black) -> This implies the CUSTOMER is on the left?
      // Usually "I" am on the right.
      // If "We are preparing" is on the right, and this is the STAFF app.
      // Then the STAFF (We) is on the Right.
      // And the CUSTOMER is on the Left.
      // So if I am the Staff, I am sending messages that appear on the Right.
      // So 'sender: "support"' is correct for the current user.
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate generic image upload
      const newMessage = {
        id: Date.now(),
        text: `Sent an image: ${file.name}`,
        sender: "support",
        isImage: true
      };
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  return (
    <PageWrapper className="pb-24 bg-white min-h-screen max-w-[430px] mx-auto">
      {/* HEADER */}
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="">
            <FiChevronLeft size={28} className="text-black" />
          </button>
          <h1 className="text-xl font-bold text-black">Support</h1>
        </div>
        <button className="p-1">
          <FiPhone size={24} className="text-black" />
        </button>
      </div>

      {/* MESSAGES */}
      <div className="px-4 py-4 space-y-3 pb-32">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.sender === "support" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 text-sm font-medium rounded-2xl ${msg.sender === "support"
                ? "bg-[#E5E7EB] text-black rounded-tr-sm" // Right side
                : "bg-black text-white rounded-tl-sm" // Left side
                }`}
            >
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA */}
      <div className="fixed bottom-[70px] left-1/2 -translate-x-1/2 w-full max-w-[420px] px-4 z-20">
        <div className="bg-white border border-gray-200 rounded-2xl flex items-center px-3 py-2 shadow-sm gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message..."
            className="flex-1 bg-transparent outline-none text-sm text-black placeholder-gray-400"
          />

          <button className="text-gray-500 hover:text-black transition-colors">
            <FiMic size={20} />
          </button>
          <button className="text-gray-500 hover:text-black transition-colors">
            <FiSmile size={20} />
          </button>
          <button onClick={handleFileClick} className="text-gray-500 hover:text-black transition-colors">
            <FiImage size={20} />
          </button>
        </div>
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {/* Spacer for layout */}
      <div className="h-4"></div>
    </PageWrapper>
  );
}
