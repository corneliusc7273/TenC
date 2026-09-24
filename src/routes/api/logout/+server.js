export function POST({cookies}) {
    cookies.delete("treasurer_session", {path: '/'})
    return Response.json({success: true})
}