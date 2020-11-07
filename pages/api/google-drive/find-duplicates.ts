import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'next-auth/jwt'
import { drive_v3, google } from 'googleapis'

const secret = process.env.NEXTAUTH_JWT_SECRET

type JwtToken = {
    accessToken: string;
}

type File = {
  id?: string;
  name?: string;
  size?: string;
  createdTime?: string;
  modifiedTime?: string;
  parents?: string[];
  ownedByMe?: boolean;
}

async function listFiles(drive: drive_v3.Drive, pageToken: string, files: File[]) {
  const res = await drive.files.list({
    orderBy: 'name',
    pageSize: 1000,
    pageToken,
    // https://developers.google.com/drive/api/v3/search-files#node.js
    q: "trashed != true",
    spaces: 'drive',
    // https://developers.google.com/drive/api/v3/reference/files
    fields: 'nextPageToken, files(id, name, size, createdTime, modifiedTime, parents, ownedByMe)',
  });

  if (res.data.files) {
    files.push(...res.data.files);
  }

  if (res.data.nextPageToken) {
    await listFiles(drive, res.data.nextPageToken, files);
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const jwtToken = (await jwt.getToken({ req, secret, encryption: true })) as JwtToken
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: jwtToken.accessToken });
  
  const drive = google.drive({ version: 'v3', auth });
  const files: File[] = [];
  try {
    await listFiles(drive, '', files);
  } catch (error) {
    res.status(500).json({ error: 'Google Drive API error', details: error.errors })
  }
  res.json(files);
}

