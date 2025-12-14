import { useState } from "react";

// Keep the same logic that already works on GitHub Pages
const RESUME_URL = new URL(
  "resume.pdf",
  window.location.origin + import.meta.env.BASE_URL
).toString();

const TRACK_URL =
  "https://script.google.com/macros/s/AKfycbwyGhEW3G2uMFKX7_SB_OzGZZdjbGyDXrvje6RUY-gtpX4OgB5A_Sn-BDP7mswRxvo/exec";

export default function ResumeDownload({ theme = "dark" }) {
  const isDark = theme === "dark";

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | saving | error

  async function logAndDownload() {
    if (!email.trim()) return;

    setStatus("saving");

    try {
      await fetch(TRACK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          email: email.trim(),
          userAgent: navigator.userAgent,
          referrer: document.referrer || "direct",
          note: "resume-download",
        }),
      });

      setIsOpen(false);
      setEmail("");
      setStatus("idle");

      const link = document.createElement("a");
      link.href = RESUME_URL;
      link.download = "Yashoda-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      setStatus("error");
    }
  }

  const primaryBtn = isDark
    ? "rounded-xl bg-white px-4 py-2 font-medium text-slate-950 hover:opacity-90"
    : "rounded-xl bg-slate-900 px-4 py-2 font-medium text-white hover:opacity-90";

  const helperText = isDark ? "text-slate-400" : "text-slate-600";

  const modalCard = isDark
    ? "w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 text-slate-100"
    : "w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-lg";

  const closeBtn = isDark
    ? "rounded-lg border border-slate-700 px-3 py-1 text-sm hover:bg-slate-900"
    : "rounded-lg border border-slate-300 px-3 py-1 text-sm hover:bg-slate-100";

  const labelText = isDark ? "text-slate-300" : "text-slate-700";

  const inputClass = isDark
    ? "mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/40 px-3 py-2 text-slate-100 outline-none focus:border-slate-400"
    : "mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-slate-500";

  const errorText = isDark ? "text-red-300" : "text-red-600";

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={primaryBtn}>
        Download Resume
      </button>

      {/* <p className={`mt-4 text-sm ${helperText}`}>
        (We log download counts with email for recruiter follow-ups.)
      </p> */}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className={modalCard}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Get my resume</h2>
                <p className={`mt-1 text-sm ${helperText}`}>
                  Enter your email to download.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  setStatus("idle");
                }}
                className={closeBtn}
              >
                Close
              </button>
            </div>

            <label className={`mt-5 block text-sm ${labelText}`}>
              Email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="recruiter@company.com"
                className={inputClass}
              />
            </label>

            {status === "error" && (
              <p className={`mt-3 text-sm ${errorText}`}>
                Logging failed. Please try again.
              </p>
            )}

            <button
              onClick={logAndDownload}
              disabled={!email.trim() || status === "saving"}
              className={`mt-5 w-full ${primaryBtn} disabled:opacity-40`}
            >
              {status === "saving" ? "Preparing…" : "Download"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
