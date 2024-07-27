const { google } = require('googleapis');
const oauth2Client = require("../services/google")

google.options({ auth: oauth2Client });

// const getEmails = async (req, res) => {
//   const { pageToken } = req.query;
//   try {
//     const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

//     // Fetch messages from various categories
//     const fetchMessages = async (labelIds, maxResults) => {
//       const response = await gmail.users.messages.list({
//         userId: 'me',
//         maxResults,
//         pageToken: pageToken || undefined,
//         labelIds,
//       });

//       const messages = response.data.messages || [];
//       const nextPageToken = response.data.nextPageToken || null;

//       const messageDetailsPromises = messages.map(async (message) => {
//         const messageDetails = await gmail.users.messages.get({
//           userId: 'me',
//           id: message.id,
//         });
//         return {
//           ...messageDetails.data,
//           category: labelIds[0], // Assign the category based on the label ID
//         };
//       });

//       const messageDetails = await Promise.all(messageDetailsPromises);
//       return { messageDetails, nextPageToken };
//     };

//     // Fetch messages from each category
//     const inboxEmails = await fetchMessages(['INBOX'], 34);
//     const spamEmails = await fetchMessages(['SPAM'], 33);
//     const trashEmails = await fetchMessages(['TRASH'], 33);
//     const sentEmails = await fetchMessages(['SENT'], 34);
//     const socialEmails = await fetchMessages(['CATEGORY_SOCIAL'], 34);
//     const promotionsEmails = await fetchMessages(['CATEGORY_PROMOTIONS'], 34);
//     const updatesEmails = await fetchMessages(['CATEGORY_UPDATES'], 34);

//     // Combine and sort the emails by date
//     const allEmails = [
//       ...inboxEmails.messageDetails,
//       ...spamEmails.messageDetails,
//       ...trashEmails.messageDetails,
//       ...sentEmails.messageDetails,
//       ...socialEmails.messageDetails,
//       ...promotionsEmails.messageDetails,
//       ...updatesEmails.messageDetails,
//     ];

//     allEmails.sort((a, b) => {
//       const dateA = parseInt(a.internalDate, 10);
//       const dateB = parseInt(b.internalDate, 10);
//       return dateB - dateA; // Sort in descending order
//     });

//     // Limit the number of emails to 100
//     const latestEmails = allEmails.slice(0, 100);

//     // Categorize the emails
//     const categorizedEmails = {
//       inbox: latestEmails.filter(email => email.category === 'INBOX'),
//       spam: latestEmails.filter(email => email.category === 'SPAM'),
//       trash: latestEmails.filter(email => email.category === 'TRASH'),
//       sent: latestEmails.filter(email => email.category === 'SENT'),
//       social: latestEmails.filter(email => email.category === 'CATEGORY_SOCIAL'),
//       promotions: latestEmails.filter(email => email.category === 'CATEGORY_PROMOTIONS'),
//       updates: latestEmails.filter(email => email.category === 'CATEGORY_UPDATES'),
//     };

//     res.json({
//       messages: categorizedEmails,
//       nextPageToken: pageToken,
//     });
//   } catch (error) {
//     console.error('Error fetching emails:', error);
//     res.status(500).json({ error: 'Failed to fetch emails' });
//   }
// };

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

const fetchMessages = async (labelIds, maxResults, pageToken) => {
  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults,
      pageToken: pageToken || undefined,
      labelIds,
    });

    const messages = response.data.messages || [];
    const nextPageToken = response.data.nextPageToken || null;

    const messageDetailsPromises = messages.map(async (message) => {
      try {
        const messageDetails = await gmail.users.messages.get({
          userId: 'me',
          id: message.id,
        });
        return {
          ...messageDetails.data,
          category: labelIds[0], 
        };
      } catch (error) {
        console.error(`Error fetching message details for ID ${message.id}:`, error);
        return null;
      }
    });

    const messageDetails = (await Promise.all(messageDetailsPromises)).filter(Boolean);
    return { messageDetails, nextPageToken };
  } catch (error) {
    console.error(`Error fetching messages for labels ${labelIds}:`, error);
    throw new Error('Failed to fetch messages');
  }
};

const getInboxEmails = async (req, res) => {
  const { pageToken } = req.query;
  try {
    const { messageDetails, nextPageToken } = await fetchMessages(['INBOX'], 34, pageToken);
    res.json({
      messages: messageDetails,
      nextPageToken,
    });
  } catch (error) {
    console.error('Error fetching inbox emails:', error);
    res.status(500).json({ error: 'Failed to fetch inbox emails' });
  }
};

const getSentEmails = async (req, res) => {
  const { pageToken } = req.query;
  try {
    const { messageDetails, nextPageToken } = await fetchMessages(['SENT'], 34, pageToken);
    res.json({
      messages: messageDetails,
      nextPageToken,
    });
  } catch (error) {
    console.error('Error fetching sent emails:', error);
    res.status(500).json({ error: 'Failed to fetch sent emails' });
  }
};

const getDrafts = async (req, res) => {
  const { pageToken } = req.query;
  try {
    const response = await gmail.users.drafts.list({
      userId: 'me',
      maxResults: 34,
      pageToken: pageToken || undefined,
    });

    const drafts = response.data.drafts || [];
    const nextPageToken = response.data.nextPageToken || null;

    const draftDetailsPromises = drafts.map(async (draft) => {
      try {
        const draftDetails = await gmail.users.drafts.get({
          userId: 'me',
          id: draft.id,
        });
        return draftDetails.data;
      } catch (error) {
        console.error(`Error fetching draft details for ID ${draft.id}:`, error);
        return null; // Return null for failed drafts
      }
    });

    const draftDetails = (await Promise.all(draftDetailsPromises)).filter(Boolean);
    res.json({
      messages: draftDetails,
      nextPageToken,
    });
  } catch (error) {
    console.error('Error fetching drafts:', error);
    res.status(500).json({ error: 'Failed to fetch drafts' });
  }
};




const sendEmail = async (req, res) => {
  const { subject, message } = req.body;
  if (!subject || !message) {
    return res.status(400).json({ error: 'Both subject and message are required' });
  }

  try {
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const email = [
      `To: recipient@example.com`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${subject}`,
      '',
      message,
    ].join('\n');

    const encodedEmail = Buffer.from(email)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedEmail,
      },
    });

    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};


module.exports = { getInboxEmails,getSentEmails,getDrafts,sendEmail}