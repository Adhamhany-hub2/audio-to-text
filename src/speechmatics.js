// =====================================================================
// SPEECHMATICS API HELPERS
// =====================================================================
// This file talks to the Speechmatics API.
//
// The flow has 3 steps:
//   1. UPLOAD the audio file → get back a job ID
//   2. POLL the job ID every few seconds → wait until it says "done"
//   3. FETCH the transcript text
//
// Docs: https://docs.speechmatics.com/jobsapi
// =====================================================================

const API_URL = 'https://asr.api.speechmatics.com/v2';

// Vite injects environment variables prefixed with VITE_ into import.meta.env.
// We read the API key from the .env file (so it's not hard-coded here).
const API_KEY = import.meta.env.VITE_SPEECHMATICS_API_KEY;

// Helper — every request needs the API key in an Authorization header.
function authHeader() {
  return { Authorization: `Bearer ${API_KEY}` };
}

// ---------------------------------------------------------------------
// Step 1: Submit the audio file to Speechmatics
// ---------------------------------------------------------------------
// Returns the job ID we'll use to check progress.
export async function submitJob(file, language = 'en') {
  if (!API_KEY) {
    throw new Error('No API key found. Did you set VITE_SPEECHMATICS_API_KEY in .env?');
  }

  // Speechmatics expects a multipart/form-data upload with two fields:
  //   - data_file: the actual audio file
  //   - config:    a JSON string telling them what we want
  const formData = new FormData();
  formData.append('data_file', file);
  formData.append(
    'config',
    JSON.stringify({
      type: 'transcription',
      transcription_config: {
        language,
        operating_point: 'enhanced', // better accuracy than "standard"
      },
    })
  );

  const response = await fetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers: authHeader(),
    body: formData,
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Upload failed (${response.status}): ${errText}`);
  }

  const data = await response.json();
  return data.id; // the job ID
}

// ---------------------------------------------------------------------
// Step 2: Check status of a job
// ---------------------------------------------------------------------
// Returns one of: 'running' | 'done' | 'rejected'
export async function getJobStatus(jobId) {
  const response = await fetch(`${API_URL}/jobs/${jobId}`, {
    headers: authHeader(),
  });
  if (!response.ok) throw new Error(`Status check failed: ${response.status}`);
  const data = await response.json();
  return data.job.status;
}

// ---------------------------------------------------------------------
// Step 3: Fetch the final transcript as plain text
// ---------------------------------------------------------------------
export async function getTranscript(jobId) {
  const response = await fetch(`${API_URL}/jobs/${jobId}/transcript?format=txt`, {
    headers: authHeader(),
  });
  if (!response.ok) throw new Error(`Transcript fetch failed: ${response.status}`);
  return response.text();
}

// ---------------------------------------------------------------------
// Convenience helper — runs the whole flow.
//
// Why this exists: rather than the React component repeatedly calling
// getJobStatus() in a loop, we hide that complexity here. The component
// just calls one function and gets the final transcript.
//
// onProgress is optional — call it to update the UI ("checking…", etc.)
// ---------------------------------------------------------------------
export async function transcribeFile(file, language, onProgress) {
  onProgress?.('Uploading audio…');
  const jobId = await submitJob(file, language);

  onProgress?.('Transcribing… this can take up to a minute');

  // Poll every 4 seconds until the job is done (or rejected/timeout)
  const POLL_INTERVAL = 4000;
  const MAX_WAIT = 5 * 60 * 1000; // 5 minutes
  const startTime = Date.now();

  while (true) {
    // Wait BEFORE the first check — Speechmatics needs a moment to start
    await new Promise((r) => setTimeout(r, POLL_INTERVAL));

    const status = await getJobStatus(jobId);

    if (status === 'done') break;
    if (status === 'rejected') throw new Error('Speechmatics rejected the job');
    if (Date.now() - startTime > MAX_WAIT) throw new Error('Timed out waiting');
  }

  onProgress?.('Fetching transcript…');
  const text = await getTranscript(jobId);
  return text;
}
