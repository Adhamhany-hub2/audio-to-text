// =====================================================================
// Converter — the actual upload + transcribe UI
// =====================================================================
// This is the core of the app. It manages all the converter state:
//   - which file is picked
//   - which language
//   - the resulting transcript
//   - loading + error states
// =====================================================================

import { useState, useRef } from 'react';
import { transcribeFile } from '../speechmatics';

export default function Converter() {
  // State (each useState is one piece of UI state we need to remember)
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState('en');
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Ref to the hidden <input type="file">. Used to "click" it from the drop zone.
  const fileInputRef = useRef(null);

  // ─── Handlers ───────────────────────────────────────

  function handleFileSelect(selectedFile) {
    setError('');
    if (!selectedFile) return;
    if (!/\.(mp3|wav|m4a)$/i.test(selectedFile.name)) {
      setError('Please pick an mp3, wav, or m4a file.');
      return;
    }
    if (selectedFile.size > 50 * 1024 * 1024) {
      setError('File too big. Max 50 MB.');
      return;
    }
    setFile(selectedFile);
    setTranscript('');
  }

  async function handleTranscribe() {
    if (!file) return;
    setLoading(true);
    setError('');
    setTranscript('');
    try {
      const text = await transcribeFile(file, language, (msg) =>
        setProgressText(msg)
      );
      setTranscript(text);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
      setProgressText('');
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleReset() {
    setFile(null);
    setTranscript('');
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  // ─── Render ─────────────────────────────────────────

  return (
    <section id="converter" className="py-20 sm:py-24">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10 reveal">
          <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Try it
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
            Convert your audio now
          </h2>
        </div>

        <div
          className="reveal bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
                     rounded-2xl p-5 sm:p-8 shadow-xl"
        >
          {/* Drop zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFileSelect(e.dataTransfer.files?.[0]);
            }}
            className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition
              ${dragOver
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                : 'border-slate-300 dark:border-slate-700 hover:border-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'}
              ${loading ? 'pointer-events-none opacity-60' : ''}
            `}
          >
            <div className="mx-auto h-12 w-12 rounded-full bg-brand-50 dark:bg-brand-900/40 grid place-items-center mb-3">
              <svg className="h-6 w-6 text-brand-600 dark:text-brand-400"
                   fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            {file ? (
              <>
                <p className="font-medium break-all px-2">{file.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB · click to change
                </p>
              </>
            ) : (
              <>
                <p className="font-medium">Drop an audio file or click to browse</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  mp3, wav, or m4a · up to 50 MB
                </p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".mp3,.wav,.m4a,audio/*"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files?.[0])}
            />
          </div>

          {/* Controls */}
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={loading}
              className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700
                         rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500
                         disabled:opacity-50"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ar">Arabic</option>
              <option value="pt">Portuguese</option>
              <option value="it">Italian</option>
            </select>
            <button
              onClick={handleTranscribe}
              disabled={!file || loading}
              className="px-6 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white
                         font-semibold text-sm transition shadow-lg shadow-brand-500/30
                         disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Working…' : 'Transcribe'}
            </button>
          </div>

          {/* Loading message */}
          {loading && (
            <div className="mt-5 flex items-center gap-3 text-sm
                            bg-slate-100 dark:bg-slate-800 rounded-lg px-4 py-3">
              <svg className="animate-spin h-4 w-4 text-brand-500 shrink-0" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span className="text-slate-600 dark:text-slate-300">{progressText}</span>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mt-5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900
                            px-4 py-3 text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          {/* Result */}
          {transcript && !loading && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Transcript</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="text-xs px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200
                               dark:bg-slate-800 dark:hover:bg-slate-700 transition
                               border border-slate-200 dark:border-slate-700"
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="text-xs px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200
                               dark:bg-slate-800 dark:hover:bg-slate-700 transition
                               border border-slate-200 dark:border-slate-700"
                  >
                    New file
                  </button>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800
                              rounded-lg p-4 max-h-80 overflow-y-auto">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {transcript}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
