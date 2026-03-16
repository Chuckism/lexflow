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
        placeholder="Describe your legal task here, or try a sample below..."
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

      {/* Workflow Samples */}
      <div style={{ marginTop: '12px', marginBottom: '4px' }}>
        <div style={{ fontSize: '11px', color: '#999', marginBottom: '8px', fontWeight: 600 }}>
          TRY A SAMPLE — OR USE YOUR OWN
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { area: 'Real Estate', text: 'Review a commercial lease agreement for a retail tenant and identify key risk clauses' },
            { area: 'Employment', text: 'Draft an employment separation agreement and identify potential WARN Act issues' },
          ].map((sample, i) => (
            <button
              key={i}
              onClick={() => { setPracticeArea(sample.area); setTask(sample.text) }}
              style={{
                padding: '8px 12px',
                borderRadius: '7px',
                border: '1px solid rgba(0,51,102,0.15)',
                background: 'rgba(0,51,102,0.04)',
                color: '#003366',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
                textAlign: 'left',
                lineHeight: 1.4,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,51,102,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,51,102,0.04)'}
            >
              📋 {sample.text}
            </button>
          ))}
        </div>
      </div>
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
        placeholder="Paste your client meeting transcript, deposition notes, email thread, or any legal document here, or try a sample below..."
        rows={8}
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

      {/* Extractor Samples */}
      <div style={{ marginTop: '12px', marginBottom: '4px' }}>
        <div style={{ fontSize: '11px', color: '#999', marginBottom: '8px', fontWeight: 600 }}>
          TRY A SAMPLE — OR USE YOUR OWN
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            {
              label: 'Real Estate Client Meeting',
              text: `Meeting with client James Hartwell, March 16, 2026. Present: Attorney Sarah Chen, client James Hartwell, and property manager Tom Willis.\n\nJames wants to proceed with purchasing the commercial property at 4821 Commerce Drive, Dallas TX. Agreed purchase price is $2.4 million. James needs to secure financing by April 15 or the deal falls through. Sarah will order the title search by end of week. Tom confirmed there is an existing tenant on a month-to-month lease who needs 60 days notice to vacate. James is concerned about the HVAC system which appears to be original to the 1987 construction. Sarah recommended getting an independent inspection before closing. James agreed. Inspection must be completed before April 1. Sarah will draft the purchase agreement by March 20. James mentioned he has a silent partner named David Kline who needs to sign all documents but is currently traveling in Europe and unreachable until March 25. Closing is targeted for April 30.`,
            },
            {
              label: 'Employment Dispute Intake',
              text: `Initial client intake with Maria Gonzalez, March 16, 2026. Attorney present: David Park.\n\nMaria was terminated from Apex Technologies on March 10 after 8 years of employment. She was given no written reason for termination. HR told her verbally it was due to "restructuring" but her position was posted on LinkedIn three days after her termination. Maria had received a positive performance review in January with a merit raise. She signed a non-compete agreement in 2019 covering a 2-year period within 50 miles. She has emails showing her manager made comments about her age (she is 57) during a team meeting in February. She was offered a severance package of 4 weeks pay but has not signed it yet. David advised her not to sign anything until they review it. Maria wants to understand her options. David will review the non-compete, severance agreement, and gather employment records by March 23.`,
            },
          ].map((sample, i) => (
            <button
              key={i}
              onClick={() => setTranscript(sample.text)}
              style={{
                padding: '8px 12px',
                borderRadius: '7px',
                border: '1px solid rgba(0,51,102,0.15)',
                background: 'rgba(0,51,102,0.04)',
                color: '#003366',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
                textAlign: 'left',
                lineHeight: 1.4,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,51,102,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,51,102,0.04)'}
            >
              📋 {sample.label}
            </button>
          ))}
        </div>
      </div>
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
{/* Instructions */}
<div style={{
  marginTop: '32px',
  padding: '24px 28px',
  borderRadius: '14px',
  background: '#FFFFFF',
  border: '1px solid #E0E0E0',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
}}>
  <div style={{ fontSize: '14px', fontWeight: 700, color: '#003366', marginBottom: '16px' }}>
    🚀 How to Use LexFlow
  </div>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
    <div>
      <div style={{ fontSize: '13px', fontWeight: 700, color: '#333', marginBottom: '6px' }}>
        ⚡ Workflow Generator
      </div>
      <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
        Select a practice area, describe your legal task, and instantly receive a step-by-step AI workflow, ready-to-use prompts for Harvey, CoCounsel, or Microsoft Copilot, a verification checklist, and practice-specific risk flags. Try a sample or enter your own task.
      </div>
    </div>
    <div>
      <div style={{ fontSize: '13px', fontWeight: 700, color: '#333', marginBottom: '6px' }}>
        🔍 Matter Intelligence Extractor
      </div>
      <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
        Paste any client meeting transcript, deposition notes, email thread, or legal document and LexFlow instantly extracts key decisions, action items, critical dates, risk flags, and follow-up questions. Try a sample or paste your own content.
      </div>
    </div>
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