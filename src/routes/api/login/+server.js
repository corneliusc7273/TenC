import { PASSWORD_HASH } from "$env/static/private";
export async function POST ({request, cookies}) {
    const {password} = await request.json();

    const isValid = await Bun.password.verify(
        password,
        PASSWORD_HASH
    )

    if (isValid) {
        cookies.set('treasurer_session', 'authenticated', {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24
        })

        return Response.json({success: true})
    } else {
        return Response.json({ error: 'Incorrect password' }, { status: 401 });
    }
}