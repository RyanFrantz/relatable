import UploadUserForm from "../../islands/UploadUserForm.tsx";


export default function Upload() {
  return (
    <>
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/users">Users</a>
        </nav>
      </header>
      <main>
        <UploadUserForm />
      </main>
    </>
  );
}
