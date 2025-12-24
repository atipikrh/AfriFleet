import { useEffect, useState } from 'react';

export const PWAUpdatePrompt = () => {
  const [offlineReady, setOfflineReady] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    // Détecter les mises à jour du service worker
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      setOfflineReady(true);
    });

    // Vérifier les mises à jour disponibles
    const checkUpdates = () => {
      navigator.serviceWorker.ready.then((registration) => {
        registration.update();
        registration.addEventListener('updatefound', () => {
          setNeedRefresh(true);
        });
      });
    };

    checkUpdates();
    const interval = setInterval(checkUpdates, 60000); // Vérifier toutes les minutes

    return () => clearInterval(interval);
  }, []);

  const handleUpdate = async () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  };

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!offlineReady && !needRefresh) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        {offlineReady ? (
          <div>
            <p className="text-sm font-medium text-gray-900 mb-2">
              Application prête hors ligne
            </p>
            <button
              onClick={close}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
            >
              Fermer
            </button>
          </div>
        ) : needRefresh ? (
          <div>
            <p className="text-sm font-medium text-gray-900 mb-2">
              Nouvelle version disponible
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
              >
                Mettre à jour
              </button>
              <button
                onClick={close}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm font-medium"
              >
                Plus tard
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

