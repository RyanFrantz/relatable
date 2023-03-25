import SearchHandleForm from "../islands/SearchHandleForm.tsx";

export default function HandleSearch() {
  return (
    <>
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/users">Users</a>
        </nav>
      </header>
      <main>
        <SearchHandleForm />
      </main>
    </>
  );
}
