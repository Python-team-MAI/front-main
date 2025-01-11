import NextAuth from 'next-auth'
import { Provider } from 'next-auth/providers'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import VK from 'next-auth/providers/vk'

const providers: Provider[] = [
    Credentials({
        credentials: { password: { label: 'Password', type: 'password' } },
        authorize(c) {
            if (c.password !== 'password') return null
            return {
                id: 'test',
                name: 'Test User',
                email: 'test@example.com',
            }
        },
    }),
    GitHub,
    VK,
    Google,
]

export const providerMap = providers
    .map((provider) => {
        if (typeof provider === 'function') {
            const providerData = provider()
            return { id: providerData.id, name: providerData.name }
        } else {
            return { id: provider.id, name: provider.name }
        }
    })
    .filter((provider) => provider.id !== 'credentials')

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers,
    pages: {
        signIn: '/login',
    },
})

// <div>
//   <script src="https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js"></script>
//   <script type="text/javascript">
//     if ('VKIDSDK' in window) {
//       const VKID = window.VKIDSDK;

//       VKID.Config.init({
//         app: 52910672,
//         redirectUrl: 'https://ya.com',
//         responseMode: VKID.ConfigResponseMode.Callback,
//         source: VKID.ConfigSource.LOWCODE,
//         scope: '', // Заполните нужными доступами по необходимости
//       });

//       const oneTap = new VKID.OneTap();

//       oneTap.render({
//         container: document.currentScript.parentElement,
//         showAlternativeLogin: true
//       })
//       .on(VKID.WidgetEvents.ERROR, vkidOnError)
//       .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload) {
//         const code = payload.code;
//         const deviceId = payload.device_id;

//         VKID.Auth.exchangeCode(code, deviceId)
//           .then(vkidOnSuccess)
//           .catch(vkidOnError);
//       });
    
//       function vkidOnSuccess(data) {
//         // Обработка полученного результата
//       }
    
//       function vkidOnError(error) {
//         // Обработка ошибки
//       }
//     }
//   </script>
// </div>