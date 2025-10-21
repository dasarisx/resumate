import request from 'supertest';
import app from '../src/app';
import { User } from '../src/models/user';
import { generateToken } from '../src/utils/jwt';

describe('Resume Endpoints', () => {
  let token: string;
  let userId: string;

  beforeEach(async () => {
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    });
    userId = user._id.toString();
    token = generateToken(userId);
  });

  const testResume = {
    title: 'Software Developer Resume',
    summary: 'Experienced developer...',
    skills: ['JavaScript', 'TypeScript', 'Node.js']
  };

  describe('POST /api/resumes', () => {
    it('should create a new resume', async () => {
      const res = await request(app)
        .post('/api/resumes')
        .set('Authorization', `Bearer ${token}`)
        .send(testResume);

      expect(res.status).toBe(201);
      expect(res.body.title).toBe(testResume.title);
    });
  });

  describe('GET /api/resumes', () => {
    it('should get user resumes', async () => {
      await request(app)
        .post('/api/resumes')
        .set('Authorization', `Bearer ${token}`)
        .send(testResume);

      const res = await request(app)
        .get('/api/resumes')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
});
