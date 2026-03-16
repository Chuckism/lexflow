import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { mode, practiceArea, task, transcript } = await req.json()

    const prompt = mode === 'workflow'
      ? `You are LexFlow, an AI legal workflow assistant. Generate a detailed AI workflow for a ${practiceArea} attorney who needs to: ${task}

Return your response in this exact format:

## WORKFLOW STEPS
[Numbered step-by-step workflow]

## AI PROMPTS
[Ready-to-use prompts for Harvey/CoCounsel/Microsoft Copilot]

## VERIFICATION CHECKLIST
[What the attorney must manually verify]

## RISK FLAGS
[Specific risks to watch for in ${practiceArea} matters]`

      : `You are LexFlow, an AI legal matter intelligence extractor. Analyze this transcript or document and extract structured intelligence.

TRANSCRIPT/DOCUMENT:
${transcript}

Return your response in this exact format:

## KEY DECISIONS
[Decisions made in this matter]

## ACTION ITEMS
[Specific action items with responsible party if mentioned]

## CRITICAL FACTS & DATES
[Important facts, deadlines, and dates]

## RISK FLAGS
[Potential risks or issues identified]

## FOLLOW-UP QUESTIONS
[Questions that need answers to move forward]`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = message.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response type')

    return NextResponse.json({ result: content.text })
  } catch (error) {
    console.error('LexFlow API error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}