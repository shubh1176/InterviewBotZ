/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://interviewbotz_owner:ozmx8tuXRji2@ep-quiet-wildflower-a1qtjo7g.ap-southeast-1.aws.neon.tech/interviewbotz?sslmode=require',
    }
  };
  