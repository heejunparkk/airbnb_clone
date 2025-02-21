import { Redis } from 'ioredis';

// Redis 연결 옵션 추가
const redisOptions = {
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
};

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', redisOptions);

redis.on('error', (error) => {
  console.error('Redis 연결 에러:', error);
  // 프로덕션 환경에서는 에러 모니터링 서비스로 전송
});

redis.on('connect', () => {
  console.log('Redis 연결 성공');
});

export default redis;
