import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'next-auth/jwt'

const secret = process.env.NEXTAUTH_JWT_SECRET

type JwtToken = {
    accessToken: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const jwtToken = (await jwt.getToken({ req, secret, encryption: true })) as JwtToken;
  const auth = new google.auth.OAuth2();
  const result = await auth.revokeToken(jwtToken.accessToken);
  res.json(result)
}