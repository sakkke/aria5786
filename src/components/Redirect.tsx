import { authProvider } from "../authProviderStore";
import { client, pocketbaseRedirectUrl } from "../pocketbaseClient";
import { useEffect, useRef } from "react";

export default function Redirect() {
  const content = useRef<HTMLPreElement>(null!);

  useEffect(() => {
    (async () => {
      const provider = authProvider.get();
      const { searchParams } = new URL(`${window.location}`);

      if (provider === null) {
        content.current.innerText =  'provider is null.';
        return;
      }

      if (provider.state !== searchParams.get('state')) {
        content.current.innerText = "State parameters don't match.";
        return;
      }

      const code = searchParams.get('code');

      if (code === null) {
        content.current.innerText = 'code is null.';
        return;
      }

      try {
        const authData = await client.users.authViaOAuth2(
          provider.name,
          code,
          provider.codeVerifier,
          pocketbaseRedirectUrl
        );

        const json = JSON.stringify(authData, null, 2);
        content.current.innerText = `${json}`;
        window.location.href = '/';
      } catch (e) {
        content.current.innerText = `Failed to exchange code.\n${e}`;
      }
    })();
  }, []);

  return (
    <pre ref={content}>Authenticating...</pre>
  );
}
