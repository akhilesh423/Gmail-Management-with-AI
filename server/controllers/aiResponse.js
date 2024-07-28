const { GoogleGenerativeAI } = require('@google/generative-ai');
const { geminiApiKey } = require("../config/config");

const aiResponse = async (req, res) => {
  const apiKey = geminiApiKey;
  if (!apiKey) {
    throw new Error('API key for Google Generative AI is missing. Please set GEMINI_API_KEY in your .env file.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const { subject, emailBody } = req.body;

  if (!subject || !emailBody) {
    return res.status(400).json({ error: 'Subject and email body are required' });
  }

  // Custom prompt for generating email content
  const emailPrompt = `Write a professional email with the following subject: "${subject}" and the following details: "${emailBody}"\n\nEmail Format:\n\nSubject: ${subject}\n\nDear [Recipient],\n\n[AI-generated email body]\n\nBest regards,\n[Your Name]`;

  try {
    const result = await model.generateContent(emailPrompt);
    const response = await result.response;
    const text = await response.text();
    res.json({ text });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
}

module.exports = aiResponse;
