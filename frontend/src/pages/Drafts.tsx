import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Layout from "../components/Layout";
import EmailList from "../components/auth/EmailList";

interface EmailHeader {
  name: string;
  value: string;
}

interface EmailPayload {
  headers: EmailHeader[];
  body: {
    data?: string;
  };
}

interface Email {
  id: string;
  payload: EmailPayload;
  internalDate: string;
  snippet: string;
}

interface MessageWrapper {
  id: string;
  message: Email;
}

export default function Drafts() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get<{ messages: MessageWrapper[] }>('http://localhost:5000/api/emails/drafts', {
          withCredentials: true,
        });

        // Extract the email data from the message object of each draft
        const emails = response.data.messages.map(wrapper => wrapper.message);
        setEmails(emails || []);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchEmails();
  }, [navigate]);

  return (
    <Layout>
      <EmailList emails={emails} loading={loading} error={error}  fromField="To"/>
    </Layout>
  );
}
