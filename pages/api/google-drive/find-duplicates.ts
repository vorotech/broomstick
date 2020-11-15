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
  md5Checksum?: string;
  createdTime?: string;
  modifiedTime?: string;
  parents?: string[];
  ownedByMe?: boolean;
  quotaBytesUsed?: string;
}

type FileInfo = {
  id: string;
  fullPath: string;
  file: File;
}

/**
 * Get all files stored with Google Drive excluding trashed 
 * @param drive Google Drive client
 * @param pageToken Next page token or undefined
 * @param files List of files sorted by size
 */
async function listFiles(drive: drive_v3.Drive, pageToken: string, files: File[]) {
  const res = await drive.files.list({
    orderBy: 'quotaBytesUsed',
    pageSize: 1000,
    pageToken,
    // https://developers.google.com/drive/api/v3/search-files#node.js
    q: "trashed != true",
    spaces: 'drive',
    // https://developers.google.com/drive/api/v3/reference/files
    fields: 'nextPageToken, files(id, name, size, md5Checksum, createdTime, modifiedTime, parents, ownedByMe, quotaBytesUsed)',
  });

  if (res.data.files) {
    files.push(...res.data.files);
  }

  if (res.data.nextPageToken) {
    await listFiles(drive, res.data.nextPageToken, files);
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const jwtToken = (await jwt.getToken({ req, secret, encryption: true })) as JwtToken;
  if(!jwtToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: jwtToken.accessToken });

  const drive = google.drive({ version: 'v3', auth });
  const files: File[] = [];
  
  // List files sorted by size
  try {
    await listFiles(drive, '', files);
  } catch (error) {
    res.status(500).json({ error: 'Google Drive API error', details: error.errors })
  }

  // Group files by md5 checksum
  const groups = files.reduce(
    (m, e) => m.set(e.md5Checksum, [...m.get(e.md5Checksum) || [], e]),
    new Map<string, File[]>()
  );

  // Filter groups with more than one item
  const filteredGroups = Array.from(groups.values()).filter((group: File[]) => group.length > 1 && group[0].quotaBytesUsed !== "0");
  

  // Restore file paths
  // TODO:

  res.json(filteredGroups);
}

