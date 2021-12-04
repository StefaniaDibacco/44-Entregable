import { Router } from 'express';
import passport, { isLoggedIn } from '../middleware/auth';
import UserRouter from './user';

const router = Router();

router.get('/login', (req, res) => {
  res.render('partials/login');
});

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/api/datos',
    failureRedirect: '/api/fail',
  })
);

router.get('/fail', (req, res) => {
  res.render('partials/login-error', {});
});

router.get('/logout', async (req, res) => {
  req.logout();
  res.redirect('/api/login');
});

router.use('/user', isLoggedIn, UserRouter);

type Photos = {
  value: string;
};

type Emails = {
  value: string;
};

// eslint-disable-next-line no-undef
interface User extends Express.User {
  contador?: number;
  displayName?: string;
  photos?: Photos[];
  emails?: Emails[];
}

router.get('/datos', (req, res) => {
  let foto = 'noPhoto';
  let email = 'noEmail';

  if (req.isAuthenticated()) {
    const userData: User = req.user;
    // reinicio contador
    if (!userData.contador) userData.contador = 0;
    userData.contador++;

    if (userData.photos) foto = userData.photos[0].value;

    if (userData.emails) email = userData.emails[0].value;

    res.render('partials/datos', {
      nombre: userData.displayName,
      contador: userData.contador,
      foto,
      email,
    });
  } else {
    res.redirect('/api/login');
  }
});

export default router;
