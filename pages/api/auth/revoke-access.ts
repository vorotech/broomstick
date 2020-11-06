import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'next-auth/jwt'

const secret = process.env.NEXTAUTH_JWT_SECRET

type JwtToken = {
    accessToken: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = (await jwt.getToken({ req, secret, encryption: true })) as JwtToken
  const response = await fetch(`https://oauth2.googleapis.com/revoke?token=${token.accessToken}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  const result = await response.json()
  res.json(result)
}