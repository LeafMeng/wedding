export async function onRequestPost(context) {
  const { request, env } = context;
  const formData = await request.formData();
  
  const name = formData.get('guestName');
  const blessing = formData.get('guestBlessing');
  
  // 这里用 Cloudflare 的 Send Email 绑定发邮件
  // 或者先简单存到 KV 里，你回头查
  await env.RSVP_KV.put(`rsvp_${Date.now()}`, JSON.stringify({ name, blessing }));
  
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}