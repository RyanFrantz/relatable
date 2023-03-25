// Planetscale config.
const dbConfig = {
  host: Deno.env.get('DB_HOST') || '',
  username: Deno.env.get('DB_USER') || '',
  password: Deno.env.get('DB_PASS') || ''
};

export default dbConfig;
