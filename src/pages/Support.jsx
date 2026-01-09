import { useState, useRef, useEffect } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import { X, Phone, Paperclip, Send, MessageSquare, Headphones } from "lucide-react";

const TICKETS = [
  {
    id: "7878995500",
    date: "30 Dec 2025",
    time: "10:00 pm",
    description: "Need Help Related to adding the New item in menu",
    raisedBy: "Praveen",
    status: "Open",
    update: "We will help you related to the information within 24 hours",
    messages: [
      { id: 'm1', from: 'user', text: 'Food is not delivered', time: '10:02 pm' },
      { id: 'm2', from: 'agent', text: 'Sorry we will guide you', time: '10:04 pm' },
    ],
  },
  {
    id: "7878995480",
    date: "20 Dec 2025",
    time: "09:00 pm",
    description: "Need Help Related to adding the New item in menu",
    raisedBy: "Praveen",
    status: "Resolved",
    update: "We resolved this for you",
    messages: [
      { id: 'm3', from: 'user', text: 'Not getting any information', time: '09:12 pm' },
      { id: 'm4', from: 'agent', text: 'We will let you know', time: '09:15 pm' },
    ],
  },
];

export default function Support() {
  const [activeTab, setActiveTab] = useState("Open");
  const [showModal, setShowModal] = useState(false);
  const [tickets, setTickets] = useState(TICKETS);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [agentTyping, setAgentTyping] = useState(false);

  const messagesRef = useRef(null);

  const genId = (prefix = '') => `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

  const openModal = (ticket = null) => {
    if (!ticket) {
      // create a new ticket placeholder and push to tickets
      const id = genId('t-');
      const newTicket = {
        id,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        description: '',
        raisedBy: 'You',
        status: 'Open',
        update: 'Awaiting your message',
        messages: [],
      };
      setTickets((prev) => [newTicket, ...prev]);
      setCurrentTicket(newTicket);
      setMessages([]);
    } else {
      setCurrentTicket(ticket);
      setMessages(ticket.messages || []);
    }
    setInput("");
    setShowModal(true);
  };

  const closeModal = () => {
    setCurrentTicket(null);
    setMessages([]);
    setShowModal(false);
    setAgentTyping(false);
    setInput("");
  };

  useEffect(() => {
    // scroll to bottom on messages change
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, agentTyping]);

  const saveMessagesToTicket = (ticketId, nextMessages) => {
    setTickets((prev) => prev.map(t => t.id === ticketId ? { ...t, messages: nextMessages, update: nextMessages[nextMessages.length - 1]?.text || t.update } : t));
  };

  const sendMessage = (text) => {
    if (!text?.trim() || !currentTicket) return;
    const msg = { id: genId('m-'), from: 'user', text: text.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const next = [...messages, msg];
    setMessages(next);
    saveMessagesToTicket(currentTicket.id, next);
    setInput('');

    // simulate agent typing and reply
    setAgentTyping(true);
    setTimeout(() => {
      const reply = { id: genId('m-'), from: 'agent', text: 'Thanks for the info — we are looking into this and will update shortly.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      const next2 = [...next, reply];
      setMessages(next2);
      saveMessagesToTicket(currentTicket.id, next2);
      setAgentTyping(false);
    }, 1100 + Math.random() * 800);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <PageWrapper>
      <div className="px-4 sm:px-6 py-6 space-y-6 animate-page">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Support</h1>
          <button
            onClick={() => openModal()}
            className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg 
                       hover:bg-gray-900 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center gap-2"
          >
            <MessageSquare size={16} />
            Raise a Ticket
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-3">
          {["Open", "Resolved"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300
                ${activeTab === tab
                  ? "bg-black text-white shadow-md transform scale-105"
                  : "bg-white text-gray-500 border border-gray-100 hover:bg-gray-50 hover:text-black"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-50/80 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Ticket Id</th>
                <th className="text-left px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Raised By</th>
                <th className="text-left px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Description</th>
                <th className="text-left px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Ticket Created</th>
                <th className="text-left px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Status</th>
                <th className="text-left px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Latest Update</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {tickets.filter(t =>
                activeTab === "Open"
                  ? t.status === "Open"
                  : t.status === "Resolved"
              ).map(ticket => (
                <tr
                  key={ticket.id}
                  onClick={() => openModal(ticket)}
                  className="hover:bg-blue-50/30 cursor-pointer transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-blue-600 font-bold">
                    {ticket.id}
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{ticket.raisedBy}</td>
                  <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{ticket.description || '—'}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="block font-medium text-gray-900">{ticket.date}</span>
                    <span className="text-xs text-gray-400">{ticket.time}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold border
                      ${ticket.status === "Open"
                        ? "bg-yellow-50 text-yellow-700 border-yellow-100"
                        : "bg-green-50 text-green-700 border-green-100"}`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    {ticket.update}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODERN CHAT MODAL */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn p-4">
            <div className="bg-white w-full max-w-[500px] h-[600px] sm:h-[80vh] flex flex-col rounded-3xl shadow-2xl animate-scaleIn overflow-hidden relative">

              {/* HEADER */}
              <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-xl text-gray-900">Support Chat</h2>
                  <p className="text-xs text-gray-500 font-medium mt-1">Ticket ID: {currentTicket?.id}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* TICKET CARD (Context) */}
              <div className="px-6 py-4 bg-white border-b border-gray-50 shadow-sm z-10 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Headphones size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate">{currentTicket?.description || "New Support Request"}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`w-2 h-2 rounded-full ${currentTicket?.status === 'Open' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <p className="text-xs text-gray-500">{currentTicket?.status === 'Open' ? 'Agent Active' : 'Resolved'}</p>
                  </div>
                </div>
                <div className="w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-100 transition-colors cursor-pointer">
                  <Phone size={18} />
                </div>
              </div>

              {/* CHAT AREA */}
              <div ref={messagesRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-white no-scrollbar">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                    <MessageSquare size={64} className="mb-4 text-gray-300" />
                    <p className="text-lg font-bold text-gray-400">No messages yet</p>
                    <p className="text-sm text-gray-400">Type your issue below to start.</p>
                  </div>
                ) : (
                  messages.map((m) => (
                    <div key={m.id} className={`flex gap-3 ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {m.from === 'agent' && (
                        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 mt-1">
                          AG
                        </div>
                      )}

                      <div className={`group relative px-5 py-3.5 rounded-3xl max-w-[75%] 
                        ${m.from === 'user'
                          ? 'bg-black text-white rounded-tr-sm shadow-md'
                          : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                        } active:scale-[0.98] transition-all`}>
                        <p className="text-sm leading-relaxed">{m.text}</p>
                        <span className={`text-[9px] font-medium absolute -bottom-5 ${m.from === 'user' ? 'right-1 text-gray-400' : 'left-1 text-gray-400'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                          {m.time}
                        </span>
                      </div>
                    </div>
                  ))
                )}

                {agentTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 mt-1">
                      AG
                    </div>
                    <div className="bg-gray-100 px-4 py-3 rounded-3xl rounded-tl-sm flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* INPUT AREA */}
              <div className="p-4 bg-white border-t border-gray-100">
                <div className="bg-gray-50 rounded-full px-2 py-2 flex items-center border border-transparent focus-within:border-gray-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-black/5 transition-all">

                  <button className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-400 transition-colors">
                    <Paperclip size={20} />
                  </button>

                  <input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-sm px-2 text-gray-900 placeholder:text-gray-400"
                  />

                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim()}
                    className={`h-10 px-5 rounded-full font-bold text-sm flex items-center gap-2 transition-all
                      ${input.trim()
                        ? 'bg-black text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                  >
                    <span>Send</span>
                    <Send size={14} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </PageWrapper>
  );
}
