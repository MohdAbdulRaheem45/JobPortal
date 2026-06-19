const BACKEND_BASE_URL = 'http://localhost:8080'

// backend stores paths like "uploads\resumes\abc.pdf" (Windows-style) or
// "uploads/resumes/abc.pdf" depending on OS — normalize before building the URL
export function getResumeUrl(resumePath) {
  if (!resumePath) return null
  const normalized = resumePath.replace(/\\/g, '/').replace(/^\/+/, '')
  return `${BACKEND_BASE_URL}/${normalized}`
}
