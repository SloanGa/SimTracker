import app from "../app";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { Users } from "../models/Users";

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await Users.findOne({ where: { email: email } });
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          done(null, user);
        } else {
          done(null, false, { message: "Email ou mot de passe incorrect" });
        }
      } else {
        done(null, false, { message: "Email ou mot de passe incorrect" });
      }
    },
  ),
);

passport.serializeUser((user: Express.User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await Users.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
