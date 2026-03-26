const CACHE_NAME = 'sindae-bible-v1';

// 설치 시 핵심 파일 캐시
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

// 네트워크 우선, 실패 시 캐시
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

// 앱에서 알림 예약 메시지 수신
self.addEventListener('message', (e) => {
  if (e.data?.type === 'SCHEDULE_NOTIF') {
    const { delay, title, body } = e.data;
    // 기존 타이머 있으면 취소
    if (self._notifTimer) clearTimeout(self._notifTimer);
    self._notifTimer = setTimeout(() => {
      self.registration.showNotification(title, {
        body,
        icon: '/sindae-bible/icon-192.png',
        badge: '/sindae-bible/icon-192.png',
        tag: 'daily-reading',
        renotify: true,
        requireInteraction: false,
        data: { url: '/sindae-bible/' }
      });
      // 다음날 같은 시각 재예약 (24시간 후)
      self._notifTimer = setTimeout(() => {
        self.registration.showNotification(title, {
          body,
          icon: '/sindae-bible/icon-192.png',
          tag: 'daily-reading',
          renotify: true,
          data: { url: '/sindae-bible/' }
        });
      }, 86400000);
    }, delay);
  }
});

// 알림 클릭 시 앱 열기
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cs) => {
      const target = e.notification.data?.url || '/sindae-bible/';
      const existing = cs.find(c => c.url.includes('sindae-bible'));
      if (existing) return existing.focus();
      return clients.openWindow(target);
    })
  );
});
