import { useState } from "react";

const RESUME_URL = "/resume.pdf";
const TRACK_URL =
  "https://script.google.com/macros/s/AKfycbwyGhEW3G2uMFKX7_SB_OzGZZdjbGyDXrvje6RUY-gtpX4OgB5A_Sn-BDP7mswRxvo/exec";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | saving | error

  async function logAndDownload() {
    if (!email.trim()) return;

    setStatus("saving");

    try {
      await fetch(TRACK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, // Apps Script friendly
        body: JSON.stringify({
          email: email.trim(),
          userAgent: navigator.userAgent,
          referrer: document.referrer || "direct",
          note: "resume-download",
        }),
      });

      // close modal
      setIsOpen(false);
      setEmail("");
      setStatus("idle");

      // trigger download
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
        <h1 className="text-3xl font-semibold">Yashoda Varma</h1>
        <p className="mt-2 text-slate-300">
          Full Stack Developer • Java / Spring Boot • React / Angular
        </p>

        <button
          onClick={() => setIsOpen(true)}
          className="mt-6 rounded-xl bg-white px-4 py-2 font-medium text-slate-950 hover:opacity-90"
        >
          Download Resume
        </button>

        <p className="mt-4 text-sm text-slate-400">
          (We log download counts with email for recruiter follow-ups.)
        </p>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Get my resume</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Enter your email to download.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  setStatus("idle");
                }}
                className="rounded-lg border border-slate-700 px-3 py-1 text-sm hover:bg-slate-900"
              >
                Close
              </button>
            </div>

            <label className="mt-5 block text-sm text-slate-300">
              Email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="recruiter@company.com"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/40 px-3 py-2 text-slate-100 outline-none focus:border-slate-400"
              />
            </label>

            {status === "error" && (
              <p className="mt-3 text-sm text-red-300">
                Logging failed. Please try again.
              </p>
            )}

            <button
              onClick={logAndDownload}
              disabled={!email.trim() || status === "saving"}
              className="mt-5 w-full rounded-xl bg-white px-4 py-2 font-medium text-slate-950 hover:opacity-90 disabled:opacity-40"
            >
              {status === "saving" ? "Preparing…" : "Download"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
