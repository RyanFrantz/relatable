// Expect a userHandle object as a prop and return a table row.
export default function UserHandleRow({userHandle}) {
  return (
  <tr key={userHandle.handle}>
    <td>{userHandle.handle} </td>
    <td>{userHandle.handleType}</td>
  </tr>
  );
}
