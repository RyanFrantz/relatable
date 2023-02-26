import { Handlers } from "$fresh/server.ts";
import { connect } from 'https://esm.sh/*@planetscale/database@1.4.0';

// Insert a single user handle.
// curl -v -X POST localhost:5000/api/handle \
//   -d '{}'

// Planetscale config.
// Env vars are expected to be defined in the Deno Deploy project.
const pConfig = {
  host: Deno.env.get('DB_HOST') || '',
  username: Deno.env.get('DB_USER') || '',
  password: Deno.env.get('DB_PASS') || ''
};

const conn = connect(pConfig);

interface Handle {
  userId: number;
  handle: string;
  handleType: string;
}

// TODO: Test that user_id exists before inesrting handle!
// Inserts a user handle into the database.
// Returns a number representing the HTTP response and a helpful string message.
const insertHandle = async (handle: Handle): [number, string] => {
  // The combination of user_id, handle, and handleType is unique.
  // Do nothing when a handle already exists.
  const stmt = `
    INSERT INTO handles (user_id, handle, handleType)
    VALUES(:userId, :handle, handleType)
    ON DUPLICATE KEY UPDATE id=id
  `;

  const results = await conn.execute(stmt, handle);
  if (results.insertId) {
    // Created
    return [201, `Created handle ${handle.handle} for user ID ${handle.userId}!`];
  } else {
    // Conflict
    return [409, `Handle ${handle.handle} already exists for user ID ${handle.userId}.`];
  }
};

export const handler: Handlers = {
  GET(req) {
    return new Response('N/A');
  },
  async POST(req) {
    let body;
    try {
      // TODO: Validate the body structure meets our expectation.
      body = await req.json();
    } catch (err) {
      console.log('Error: ', err.message);
      return new Response('Invalid input!', { status: 400 });
    }
    // TODO: De-taint input.
    const [responseCode, msg] = await insertHandle(body);
    return new Response(
      JSON.stringify({message: msg}), {
        status: responseCode
      }
    );
  }
};

