export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/submit' && request.method === 'POST') {
      const formData = await request.formData();
      const name = formData.get('guestName');
      const count = formData.get('guestCount');

      await env.RSVP_KV.put(`rsvp_${Date.now()}`, JSON.stringify({ name, count }));

      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return env.ASSETS.fetch(request);
  }
};