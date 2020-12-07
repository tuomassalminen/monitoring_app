import { send } from '../deps.js';

const errorMiddleware = async(context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
}

const requestTimingMiddleware = async({ request, session }, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  let userId = 'anonymous'
  if (await session && await session.get('authenticated')) {
    userId = (await session.get('user')).id
  }
  console.log(`${request.method} ${request.url.pathname} - ${ms} ms User: ${userId}`);
}

const serveStaticFilesMiddleware = async(context, next) => {
  if (context.request.url.pathname.startsWith('/static')) {
    const path = context.request.url.pathname.substring(7)
  
    await send(context, path, {
      root: `${Deno.cwd()}/static`
    })
  
  } else {
    await next();
  }
}

const checkAuthenticationMiddleware = async({request, response, session}, next) => {
  // I do this so i can test report forms easier
  if (Deno.env.get('TEST_ENVIRONMENT')) {
    await next()
    return
  }
  if (request.url.pathname.startsWith('/behavior')) {
    if (session && await session.get('authenticated')) {
      await next();
    } else {
      response.redirect('/auth/login');
    }
  } else {
    await next();
  }
}

export { 
  errorMiddleware, 
  requestTimingMiddleware, 
  serveStaticFilesMiddleware,
  checkAuthenticationMiddleware 
};