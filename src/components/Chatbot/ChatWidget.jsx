import { useState, useRef, useEffect } from "react";
import "./chat.css";

const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

const DEFAULT_MESSAGES = [
  {
    text: "¡Hola! Soy Uthopon, el asistente virtual de Uthopiq.\n¿En qué puedo ayudarte?",
    sender: "bot",
  },
];

const isExpired = (timestamp) => {
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;
  return now - timestamp > ONE_DAY;
};

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [animateBot, setAnimateBot] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const messagesRef = useRef(null);

    const [chatId] = useState(() => {
    if (typeof window === "undefined") return "uthopon";

    const storedId = localStorage.getItem("uthoponChatId");
    const storedTimestamp = localStorage.getItem("uthoponChatTimestamp");

    if (storedId && storedTimestamp && !isExpired(Number(storedTimestamp))) {
        return storedId;
    }

    const newId =
        "uthopon_" +
        (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));

    localStorage.setItem("uthoponChatId", newId);
    localStorage.setItem("uthoponChatTimestamp", Date.now());

    return newId;
    });

    const splitBotMessage = (text, maxLen = 220) => {
    if (!text) return [];
    const normalized = text.replace(/\r/g, "").trim();
    const paragraphs = normalized.split(/\n{2,}/);
    const chunks = [];

    paragraphs.forEach((block) => {
        let remaining = block.trim();
        while (remaining.length > maxLen) {
        const slice = remaining.slice(0, maxLen);
        const cutAt =
            slice.lastIndexOf(". ") > 40
            ? slice.lastIndexOf(". ") + 1
            : slice.lastIndexOf("? ") > 40
            ? slice.lastIndexOf("? ") + 1
            : slice.lastIndexOf("! ") > 40
            ? slice.lastIndexOf("! ") + 1
            : slice.lastIndexOf(" ");
        const endIndex = cutAt > 0 ? cutAt : maxLen;
        const part = remaining.slice(0, endIndex).trim();
        if (part) chunks.push(part);
        remaining = remaining.slice(endIndex).trim();
        }
        if (remaining) chunks.push(remaining);
    });

    return chunks;
    };

    const scheduleBotReply = (fullText) => {
    const chunks = splitBotMessage(fullText);
    if (chunks.length === 0) {
        setIsTyping(false);
        return;
    }

    let accumulatedDelay = 0;

    chunks.forEach((chunk, index) => {
        const delayForThisChunk = Math.min(3000, 900 + chunk.length * 18);
        accumulatedDelay += delayForThisChunk;

        setTimeout(() => {
        setMessages((prev) => [
            ...prev,
            {
            text: chunk,
            sender: "bot",
            },
        ]);

        if (index === chunks.length - 1) {
            setIsTyping(false);
        }
        }, accumulatedDelay);
    });
    };

    useEffect(() => {
    if (typeof window === "undefined") return;

    const timestamp = localStorage.getItem("uthoponChatTimestamp");

    if (!timestamp || isExpired(Number(timestamp))) {
        setMessages(DEFAULT_MESSAGES);
        return;
    }

    const key = `uthoponMessages_${chatId}`;
    const stored = localStorage.getItem(key);

    if (stored) {
        try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
            return;
        }
        } catch {}
    }

    setMessages(DEFAULT_MESSAGES);
    }, [chatId]);

    useEffect(() => {
    if (typeof window === "undefined") return;

    const key = `uthoponMessages_${chatId}`;

    if (messages.length > 0) {
        localStorage.setItem(key, JSON.stringify(messages));
        localStorage.setItem("uthoponChatTimestamp", Date.now());
    }
    }, [messages, chatId]);

    useEffect(() => {
    if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
    }, [messages, isTyping]);

    useEffect(() => {
    const interval = setInterval(() => {
        setAnimateBot(true);
        setTimeout(() => setAnimateBot(false), 600);
    }, 8000);

    return () => clearInterval(interval);
    }, []);

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

    const sendMessage = async () => {
    if (!input.trim() || !WEBHOOK_URL) return;

    const userText = input;
    const newMsg = { text: userText, sender: "user" };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setIsTyping(true);

    try {
        const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chatId,
            message: userText,
            route: "general",
        }),
        });

        const data = await res.json().catch(() => ({}));
        const replyText =
        data?.reply ||
        data?.output ||
        "Ahora mismo no puedo responder, inténtalo de nuevo en unos segundos 🤖";

        scheduleBotReply(replyText);
    } catch (error) {
        console.error("Error al llamar a n8n:", error);
        setIsTyping(false);
        setMessages((prev) => [
        ...prev,
        {
            text:
            "Ha ocurrido un error hablando con el asistente. Vuelve a intentarlo en un momento 🙏",
            sender: "bot",
        },
        ]);
    }
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