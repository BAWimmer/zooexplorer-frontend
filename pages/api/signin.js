// pages/api/signin.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = JSON.parse(req.body);
    const filePath = path.join(process.cwd(), 'credential.json');
    let credentials = [];
    
    // Read the credential file if it exists
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      credentials = JSON.parse(fileData);
    }
    
    // Check if a user with the provided email and password exists
    const user = credentials.find(u => u.email === email && u.password === password);
    if (user) {
      return res.status(200).json({ message: 'Signin successful' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
}
