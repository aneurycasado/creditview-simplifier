interface ClaudeResponse {
  content: string[];
  error?: string;
}

export const analyzeCreditReport = async (reportText: string): Promise<ClaudeResponse> => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `Analyze this credit report and categorize the information into these categories:
            1. Payment Activity
            2. Utilization
            3. Paying Down Debt & Lowering Balances
            4. New/Recent Activity
            5. Payment History
            
            Format the response as a JSON object with these categories as keys and arrays of relevant findings as values.
            
            Credit Report:
            ${reportText}`
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to analyze credit report');
    }

    const data = await response.json();
    return {
      content: data.content
    };
  } catch (error) {
    console.error('Error analyzing credit report:', error);
    return {
      content: [],
      error: 'Failed to analyze credit report. Please try again.'
    };
  }
};