import { Handlers } from "$fresh/server.ts";
import getUserByHandle from '../../../util/getUserByHandle.ts';

export const handler: Handlers = {
  // Given a handle, look up the related user.
  // /api/handle/foo, /api/handle/fancy%pants
  async GET(req) {
    const url = new URL(req.url);
    // Expect URL-escaped strings.
    const re = /\/api\/handle\/(?<handle>\S+)/;
    const match = url.pathname.match(re);
    if (!match) {
      return new Response(
        JSON.stringify({message: 'Invalid handle'}),
        {
          status: 400
        }
      );
    }
    const handle = match.groups.handle;
    const user = await getUserByHandle(handle);

    // Sane default.
    let [responseCode, msg] = [
      404,
      {message: `No user found for handle ${handle}`}
    ];

    if (Object.keys(user).length > 0) {
      responseCode = 200;
      // {"id":6,"name":"Thibaud Reedman"}
      msg = user;
    }
    return new Response(
      JSON.stringify(msg), {
        status: responseCode
      }
    );
  },
};

