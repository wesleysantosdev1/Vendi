import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import * as Updates from 'expo-updates';

// Comportamento de atualização OTA (EAS Update) por canal:
//
// - preview: ao abrir o app e sempre que ele volta pro primeiro plano, checa se
//   tem update novo; se tiver, baixa e recarrega na hora. É o canal de teste no
//   celular do dono do app, então ver a mudança em segundos vale mais do que não
//   interromper o uso.
// - production: o expo-updates já checa ao abrir e aplica na PRÓXIMA abertura
//   (config no AndroidManifest). Aqui só adiantamos o download quando o app
//   volta pro primeiro plano, sem recarregar — nunca derruba a tela de um
//   usuário real no meio de uma venda.
//
// Desligado em dev (Metro) e em builds sem expo-updates habilitado.
// Mudanças nativas (lib nova, permissão) não chegam por OTA: a runtime version
// por fingerprint impede que um update incompatível seja entregue — precisa de
// build novo.

const PREVIEW_CHANNEL = 'preview';

export function useOtaUpdates() {
  const isChecking = useRef(false);

  useEffect(() => {
    if (__DEV__ || !Updates.isEnabled) {
      return;
    }

    const reloadImmediately = Updates.channel === PREVIEW_CHANNEL;

    const checkForUpdate = async () => {
      if (isChecking.current) {
        return;
      }
      isChecking.current = true;
      try {
        const result = await Updates.checkForUpdateAsync();
        if (!result.isAvailable) {
          return;
        }
        await Updates.fetchUpdateAsync();
        if (reloadImmediately) {
          await Updates.reloadAsync();
        }
      } catch (error) {
        // Sem internet ou servidor de updates fora: o app segue na versão atual.
        // Não é ação do usuário, então não mostra Alert — só registra.
        console.log('Falha ao checar atualização OTA', error);
      } finally {
        isChecking.current = false;
      }
    };

    checkForUpdate();

    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') {
        checkForUpdate();
      }
    });

    return () => subscription.remove();
  }, []);
}
