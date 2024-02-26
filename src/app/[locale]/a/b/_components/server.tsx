export async function Server() {
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const json = await res.json()
    return <p>id: {json.id}</p>
}