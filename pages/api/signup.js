// pages/api/signup.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = JSON.parse(req.body);
    const filePath = path.join(process.cwd(), 'credential.json');
    let credentials = [];

    // Load existing credentials if file exists
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      credentials = JSON.parse(fileData);
    }

    // Check if the email already exists
    if (credentials.find(u => u.email === email)) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Append the new user
    credentials.push({ email, password });
    fs.writeFileSync(filePath, JSON.stringify(credentials, null, 2));
    return res.status(201).json({ message: 'Signup successful' });
  } else {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
}
