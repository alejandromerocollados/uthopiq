import { useState, useRef, useEffect } from "react";
import "./chat.css";

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
    {
        text: "¡Hola! Soy Uthopon, el asistente virtual de Uthopiq.\n¿En qué puedo ayudarte?",
        sender: "bot",
    },
    ]);
    const [input, setInput] = useState("");
    const [animateBot, setAnimateBot] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const messagesRef = useRef(null);

    // Auto scroll
    useEffect(() => {
    if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
    }, [messages, isTyping]);

    // Animación robot
    useEffect(() => {
    const interval = setInterval(() => {
        setAnimateBot(true);
        setTimeout(() => setAnimateBot(false), 600);
    }, 8000);

    return () => clearInterval(interval);
    }, []);

    // Bloquear scroll en móvil cuando el chat está abierto
    useEffect(() => {
    if (typeof window === "undefined") return;

    const body = document.body;

    if (open && window.innerWidth <= 768) {
        const prevOverflow = body.style.overflow;
        body.style.overflow = "hidden";

        return () => {
        body.style.overflow = prevOverflow;
        };
    } else {
        body.style.overflow = "";
    }
    }, [open]);

    // Envío de mensaje
    const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    setIsTyping(true);

    setTimeout(() => {
        setIsTyping(false);

        setMessages((prev) => [
        ...prev,
        { text: "Estoy procesando tu mensaje 🤖", sender: "bot" },
        ]);
    }, 1500);
    };

    const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
    <>
        {!open && (
        <div className="chat-launcher">
            <div className="chat-hint">
            <span>¿En qué puedo ayudarte?</span>
            </div>

            <button
            className={`chat-bubble ${animateBot ? "wiggle" : ""}`}
            onClick={handleOpen}
            >
            <img
                src="/images/logo/uthopon.png"
                alt="Uthopiq bot"
                className="chat-icon"
            />
            </button>
        </div>
        )}

        {open && (
        <div className="chat-container">
            {/* Header */}
            <div className="chat-header">
            <div className="chat-header-left">
                <div className="chat-header-avatar">
                <img
                    src="/images/logo/uthopon.png"
                    alt="Uthopon avatar"
                    className="chat-header-avatar-img"
                />
                </div>
                <div className="chat-header-info">
                <div className="chat-header-top">
                    <span className="chat-header-title">Uthopon</span>
                </div>
                <div className="chat-header-status">
                    <span className="status-dot" />
                    <span>Online</span>
                </div>
                </div>
            </div>

            <button className="close-btn" onClick={handleClose}>
                X
            </button>
            </div>

            {/* Mensajes */}
            <div className="chat-body" ref={messagesRef}>
            {messages.map((msg, i) => (
                <p key={i} className={`msg ${msg.sender}`}>
                {msg.text}
                </p>
            ))}

            {isTyping && (
                <div className="msg bot typing-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                </div>
            )}
            </div>

            {/* Footer */}
            <div className="chat-footer">
            <div className="chat-input-area">
                <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                />
                <button className="send-btn" onClick={sendMessage}>
                Enviar
                </button>
            </div>
            <div className="chat-branding">
                Desarrollado por{" "}
                <a
                href="https://uthopiq.com"
                target="_blank"
                rel="noopener noreferrer"
                >
                Uthopiq
                </a>
            </div>
            </div>
        </div>
        )}
    </>
    );
}
