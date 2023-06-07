import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = await client.db('ietutor');

      const users = await db
        .collection('users')
        .find({ email: req.query.email }, { projection: { password: 0 } })
        .limit(1)
        .toArray();

      res.json(users[0]);
    } catch (e) {
      res.status(400).send(e.message);
    }
  } else {
    res.status(400).send('No method provider');
  }
}
