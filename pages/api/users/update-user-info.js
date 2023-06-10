import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db('ietutor');

      const users = await db.collection('users').updateOne(
        { email: req.body.email },
        {
          $set: {
            address: req.body.address,
            phone: req.body.phone,
            bio: req.body.bio,
            picture: req.body.picture,
            publicId: req.body.publicId,
          },
        }
      );

      res.json(users);
    } catch (e) {
      console.error(e);
    }
  }
}
