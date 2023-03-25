import { connect } from 'https://esm.sh/*@planetscale/database@1.4.0';

// Planetscale config.
// Env vars are expected to be defined in the Deno Deploy project.
const pConfig = {
  host: Deno.env.get('DB_HOST') || '',
  username: Deno.env.get('DB_USER') || '',
  password: Deno.env.get('DB_PASS') || ''
};

const conn = connect(pConfig);

// Given a handle, return the related user.
// THINK: Should we allow for a case where multiple people have the same
// handle?
const getUserByHandle = async (handle: string) => {
  const stmt = `SELECT user.id, user.name FROM user
    INNER JOIN handles ON handles.user_id = user.id
    WHERE handle = :handle LIMIT 1`
  const result = await conn.execute(stmt, {handle: handle});
  const user = result.rows[0] || {};
  return user;
}

export default getUserByHandle;
