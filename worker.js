export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/submit' && request.method === 'POST') {
      const formData = await request.formData();
      const name = formData.get('guestName');
      const message = formData.get('guestMsg');

      await env.RSVP_KV.put(`rsvp_${Date.now()}`, JSON.stringify({ name, message }));

      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return env.ASSETS.fetch(request);
  }
};