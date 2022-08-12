import { authProvider } from '../authProviderStore';
import { client, pocketbaseRedirectUrl } from '../pocketbaseClient';
import { useEffect, useRef, useState } from 'react';

function handleLogin(provider: any) {
  authProvider.set(provider);
}

function handleLogout() {
  authProvider.set(null);
  client.authStore.clear();
}

export default function Auth() {
  const [providers, setProviders] = useState<Array<any>>([]);
  const [status, setStatus] = useState(false);
  const list = useRef<HTMLUListElement>(null);

  async function loadLinks() {
    const authMethods = await client.users.listAuthMethods();

    for (const provider of authMethods.authProviders) {
      setProviders([...providers, provider]);
    }
  }

  useEffect(() => {
    setStatus(client.authStore.isValid);
    loadLinks();
  }, []);

  return (
    <ul ref={list}>
      {status ? (
        <li>
          <a
            href=""
            onClick={handleLogout}
          >Logout</a>
        </li>
      ) : providers.length === 0 ? (
        <li>No OAuth2 providers.</li>
      ) : providers.map(provider => (
        <li key={provider.name}>
          <a
            href={`${provider.authUrl}${pocketbaseRedirectUrl}`}
            onClick={() => void handleLogin(provider)}
          >Login with {provider.name}</a>
        </li>
      ))}
    </ul>
  );
}
