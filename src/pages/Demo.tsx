import { useEffect, useRef } from "react";
import Nav from "../components/chrome/Nav";
import Footer from "../components/chrome/Footer";
import SectionHeading from "../components/ui/SectionHeading";
import { site } from "../content/site";

const CHAT_JS = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js";
const CHAT_CSS = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";

/** Loads n8n's official chat widget from its CDN bundle and mounts it inline.
 *  We don't `npm install @n8n/chat` because this project's node_modules
 *  currently fails to build (unrelated native dependency, isolated-vm) —
 *  loading the same package from its CDN sidesteps that entirely. */
export default function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!site.demoChatWebhookUrl) return;
    let cancelled = false;

    // stylesheet (idempotent — skip if already present, e.g. hot reload)
    if (!document.querySelector(`link[href="${CHAT_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CHAT_CSS;
      document.head.appendChild(link);
    }

    import(/* @vite-ignore */ CHAT_JS).then((mod) => {
      if (cancelled || !containerRef.current) return;
      mod.createChat({
        webhookUrl: site.demoChatWebhookUrl,
        target: containerRef.current,
        mode: "fullscreen",
        showWelcomeScreen: false,
        initialMessages: [
          "Hi! I'm a demo of the AI assistant Qubitrix builds for real estate agencies.",
          "Try messaging me like a lead would, ask about a property, and I'll walk you through it.",
        ],
        i18n: {
          en: {
            title: "Real Estate Demo Agent",
            subtitle: "",
            footer: "",
            getStarted: "New conversation",
            inputPlaceholder: "Try: 'Hi, I'm looking to buy a property'",
            closeButtonTooltip: "Close",
          },
        },
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto min-h-screen max-w-3xl px-5 pb-24 pt-32 sm:px-8">
        <SectionHeading
          kicker="Live demo"
          heading="Try our real estate AI agent."
          sub="This is the same kind of system Qubitrix builds for real estate agencies — instant, always-on lead response instead of a claim in an email. Ask about a property and see how it responds."
        />

        {site.demoChatWebhookUrl ? (
          <div
            ref={containerRef}
            className="os-panel demo-chat-embed mt-12 h-[560px] overflow-hidden"
          />
        ) : (
          <div className="os-panel mt-12 p-8 text-center text-sm text-silver-400">
            Demo agent isn't configured yet — set VITE_DEMO_CHAT_WEBHOOK_URL.
          </div>
        )}
      </main>
      <Footer />

      {/* Scope the widget's own CSS variables to just this embed, so it doesn't
          leak into (or clash with) the floating "Qubi" launcher elsewhere on the site.
          Overrides are intentionally redundant (variables AND direct selectors,
          with !important on the parts that were rendering illegibly) because the
          widget's own light-theme defaults were winning in places the variables
          alone didn't reach. */}
      <style>{`
        .demo-chat-embed {
          --chat--color-primary: #7c6bff;
          --chat--color-primary-shade-50: #6a5aeb;
          --chat--color-secondary: #7c6bff;
          --chat--color-secondary-shade-50: #6a5aeb;
          --chat--color-white: #16161d;
          --chat--color-light: #16161d;
          --chat--color-light-shade-50: #1f1f29;
          --chat--color-light-shade-100: #26262f;
          --chat--color-medium: #33333f;
          --chat--color-dark: #e9e9f0;
          --chat--color-disabled: #6b6b78;
          --chat--color-typing: #a9a9b8;
          --chat--spacing: 1rem;
          --chat--border-radius: 1rem;
          --chat--transition-duration: 0.15s;
          --chat--window--width: 100%;
          --chat--window--height: 100%;
          --chat--header--background: #16161d;
          --chat--header--color: #e9e9f0;
          --chat--body--background: #16161d;
          --chat--message--bot--background: #26262f;
          --chat--message--bot--color: #e9e9f0;
          --chat--message--user--background: #7c6bff;
          --chat--message--user--color: #ffffff;
          --chat--toggle--background: #7c6bff;
          --chat--input--border: 1px solid #33333f;
          --chat--textarea--background: #1f1f29;
          --chat--input--text-color: #e9e9f0;
        }
        .demo-chat-embed,
        .demo-chat-embed .chat-window-wrapper,
        .demo-chat-embed .n8n-chat {
          height: 100%;
          width: 100%;
          border-radius: 1rem;
          background: #16161d !important;
        }
        .demo-chat-embed [class*="chat-message-from-user"] {
          background: #7c6bff !important;
          color: #ffffff !important;
        }
        .demo-chat-embed [class*="chat-message-from-bot"] {
          background: #26262f !important;
          color: #e9e9f0 !important;
        }
        .demo-chat-embed [class*="chat-layout"],
        .demo-chat-embed [class*="chat-messages-list"] {
          background: #16161d !important;
        }
        .demo-chat-embed [class*="chat-input"],
        .demo-chat-embed [class*="chat-inputs"],
        .demo-chat-embed textarea,
        .demo-chat-embed input {
          background: #1f1f29 !important;
          color: #e9e9f0 !important;
          border-color: #33333f !important;
        }
        .demo-chat-embed textarea::placeholder,
        .demo-chat-embed input::placeholder {
          color: #8a8a98 !important;
        }
      `}</style>
    </>
  );
}
