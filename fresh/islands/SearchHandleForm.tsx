import { useState } from "preact/hooks";
import { encodeUrl } from "https://deno.land/x/encodeurl/mod.ts";

export default function SearchHandleForm() {
  const [handle, setHandle] = useState();
  const [user, setUser] = useState();
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    // Prevent form submission. Useful to do things on the same page.
    e.preventDefault();
    setError(undefined); // Clear past errors.
    setHandle(undefined);
    const searchInput = document.getElementById('handle-search-input');
    const handle = encodeUrl(searchInput.value);
    setHandle(handle);
    const resp = await fetch(`/api/handle/${handle}`, {
    });
    const respBody = await resp.json();
    if (resp.ok) {
      setUser(respBody);
    } else {
      setError(respBody);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <p>
        
      </p>
      <input id="handle-search-input" type="search"/>
      <input id="submit-handle-search" type="submit"/>
    </form>
    {error ?
     (
     <div>
      {error.message}
     </div>
     ) : (
     <div></div>
     )
    }
    {user ?
      (
      <div>
      Handle {handle} is related to user {user.name}
      </div>
      ) : (
      <div></div>
      )
    }
    </>
  );
}
