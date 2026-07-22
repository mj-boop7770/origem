export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const categorie = url.searchParams.get('categorie') || 'vendeurs';

  try {
    const { results } = await context.env.DB.prepare(
      "SELECT * FROM actores WHERE categorie = ? AND statut = 'verifie' ORDER BY id DESC"
    ).bind(categorie).all();

    return new Response(JSON.stringify(results), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
          }
