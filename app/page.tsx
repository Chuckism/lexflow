'use client'

import { useState } from 'react'

const PRACTICE_AREAS = [
  'Real Estate',
  'Litigation',
  'Corporate & Contracts',
  'Employment',
  'Intellectual Property',
]

export default function Home() {
  const [mode, setMode] = useState<'workflow' | 'extractor'>('workflow')
  const [practiceArea, setPracticeArea] = useState('Real Estate')
  const [task, setTask] = useState('')
  const [transcript, setTranscript] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (mode === 'workflow' && !task.trim()) return
    if (mode === 'extractor' && !transcript.trim()) return
    setLoading(true)
    setResult('')
    try {
      const res = await fetch('/api/lexflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, practiceArea, task, transcript }),
      })
      const data = await res.json()
      setResult(data.result || data.error)
    } catch (e) {
      setResult('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#f8f9fa',
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>

      {/* Header */}
      <div style={{
        background: '#003366',
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px',
          }}>⚖️</div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              LexFlow
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '1px' }}>
              AI-Powered Legal Workflow Assistant
            </div>
          </div>
        </div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
          Powered by Claude AI
        </div>
      </div>

      {/* Hero */}
      <div style={{
        background: '#003366',
        padding: '32px 40px 48px',
        borderBottom: '4px solid #C9A84C',
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            From Legal Task to AI Workflow in Seconds
          </div>
          <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
            Generate practice-area specific AI workflows and prompts, or extract structured intelligence from client transcripts and documents.
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Mode Toggle */}
        <div style={{
          display: 'flex',
          background: '#FFFFFF',
          borderRadius: '12px',
          padding: '6px',
          marginBottom: '32px',
          border: '1px solid #E0E0E0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}>
          {([
            { id: 'workflow', label: '⚡ Workflow Generator', desc: 'Get AI workflows and prompts for any legal task' },
            { id: 'extractor', label: '🔍 Matter Intelligence Extractor', desc: 'Extract decisions, actions, and risks from transcripts' },
          ] as const).map(m => (
            <button
              key={m.id}
              onClick={() => { setMode(m.id); setResult('') }}
              style={{
                flex: 1,
                padding: '14px 20px',
                borderRadius: '8px',
                border: 'none',
                background: mode === m.id ? '#003366' : 'transparent',
                color: mode === m.id ? '#FFFFFF' : '#666',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 700 }}>{m.label}</div>
              <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '2px' }}>{m.desc}</div>
            </button>
          ))}
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* Input Panel */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '14px',
            padding: '28px',
            border: '1px solid #E0E0E0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#003366', marginBottom: '20px' }}>
              {mode === 'workflow' ? '⚡ Generate Workflow' : '🔍 Extract Intelligence'}
            </div>

            {mode === 'workflow' && (
              <>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>
                  Practice Area
                </label>
                <select
                  value={practiceArea}
                  onChange={e => setPracticeArea(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #E0E0E0',
                    fontSize: '14px',
                    color: '#333',
                    fontFamily: 'inherit',
                    marginBottom: '16px',
                    outline: 'none',
                    background: '#FAFAFA',
                  }}
                >
                  {PRACTICE_AREAS.map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>

                <label style={{ fontSize: '11px', fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>
                  Describe Your Task
                </label>
                <textarea
                  value={task}
                  onChange={e => setTask(e.target.value)}
                  placeholder="e.g. Review a commercial lease agreement for a retail tenant and identify key risk clauses..."
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid #E0E0E0',
                    fontSize: '14px',
                    color: '#333',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    outline: 'none',
                    lineHeight: 1.6,
                    background: '#FAFAFA',
                  }}
                />
              </>
            )}

            {mode === 'extractor' && (
              <>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>
                  Paste Transcript or Document
                </label>
                <textarea
                  value={transcript}
                  onChange={e => setTranscript(e.target.value)}
                  placeholder="Paste your client meeting transcript, deposition notes, email thread, or any legal document here..."
                  rows={10}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid #E0E0E0',
                    fontSize: '14px',
                    color: '#333',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    outline: 'none',
                    lineHeight: 1.6,
                    background: '#FAFAFA',
                  }}
                />
              </>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || (mode === 'workflow' ? !task.trim() : !transcript.trim())}
              style={{
                width: '100%',
                marginTop: '16px',
                padding: '14px',
                borderRadius: '9px',
                border: 'none',
                background: loading || (mode === 'workflow' ? !task.trim() : !transcript.trim())
                  ? '#E0E0E0'
                  : '#003366',
                color: loading || (mode === 'workflow' ? !task.trim() : !transcript.trim())
                  ? '#999'
                  : '#FFFFFF',
                fontSize: '14px',
                fontWeight: 700,
                cursor: loading || (mode === 'workflow' ? !task.trim() : !transcript.trim())
                  ? 'not-allowed'
                  : 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
              }}
            >
              {loading ? '⏳ Processing...' : mode === 'workflow' ? '⚡ Generate Workflow' : '🔍 Extract Intelligence'}
            </button>
          </div>

          {/* Output Panel */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '14px',
            padding: '28px',
            border: '1px solid #E0E0E0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            minHeight: '400px',
          }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#003366', marginBottom: '20px' }}>
              📋 Results
            </div>

            {!result && !loading && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '300px',
                gap: '12px',
                opacity: 0.4,
                textAlign: 'center',
              }}>
                <span style={{ fontSize: '40px' }}>⚖️</span>
                <span style={{ fontSize: '13px', color: '#666', lineHeight: 1.6, maxWidth: '240px' }}>
                  {mode === 'workflow'
                    ? 'Select a practice area, describe your task, and generate your AI workflow.'
                    : 'Paste a transcript or document to extract structured legal intelligence.'}
                </span>
              </div>
            )}

            {loading && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '300px',
                gap: '16px',
              }}>
                <div style={{
                  width: '40px', height: '40px',
                  border: '3px solid rgba(0,51,102,0.2)',
                  borderTopColor: '#003366',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                <span style={{ fontSize: '13px', color: '#666' }}>
                  {mode === 'workflow' ? 'Generating your workflow...' : 'Extracting intelligence...'}
                </span>
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              </div>
            )}

            {result && !loading && (
              <div style={{
                fontSize: '13px',
                color: '#333',
                lineHeight: 1.8,
                whiteSpace: 'pre-wrap',
                overflowY: 'auto',
                maxHeight: '520px',
              }}>
                {result.split('\n').map((line, i) => {
                  if (line.startsWith('## ')) {
                    return (
                      <div key={i} style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#003366',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginTop: '20px',
                        marginBottom: '8px',
                        paddingBottom: '4px',
                        borderBottom: '2px solid #C9A84C',
                      }}>
                        {line.replace('## ', '')}
                      </div>
                    )
                  }
                  return <div key={i}>{line}</div>
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '40px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#999',
          paddingBottom: '40px',
        }}>
          LexFlow is an AI assistant tool. All outputs should be reviewed by a licensed attorney before use.
          <br />
          Built by <a href="https://linkedin.com/in/chucknealis" style={{ color: '#003366', fontWeight: 600 }}>Chuck Nealis</a> · AI Whisperer · L&D & Change Management Professional
        </div>
      </div>
    </main>
  )
}