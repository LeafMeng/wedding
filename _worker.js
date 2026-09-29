export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/submit' && request.method === 'POST') {
      const formData = await request.formData();
      const name = formData.get('guestName');
      const count = formData.get('guestCount');

      // 写入 KV，key 用时间戳保证唯一
      const key = `rsvp_${Date.now()}`;
      await env.RSVP_KV.put(key, JSON.stringify({
        name: name,
        count: count,
        time: new Date().toISOString()
      }));

      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return env.ASSETS.fetch(request);
  }
};