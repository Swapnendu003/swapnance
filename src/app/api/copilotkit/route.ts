import {
    CopilotRuntime,
    OpenAIAdapter,
    copilotRuntimeNextJSAppRouterEndpoint,
  } from '@copilotkit/runtime';
  import OpenAI from 'openai';
  import { NextRequest } from 'next/server';
   
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const llmAdapter = new OpenAIAdapter({ 
    openai,
    model: "gpt-3.5-turbo"
  });
   
  const runtime = new CopilotRuntime();
   
  export const POST = async (req: NextRequest) => {
    const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
      runtime,
      serviceAdapter: llmAdapter,
      endpoint: '/api/copilotkit',
    });
   
    return handleRequest(req);
  };