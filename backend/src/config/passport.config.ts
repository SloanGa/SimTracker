import app from "../app";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { dataMapper } from "../data/dataMapper";
import bcrypt from "bcrypt";

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
      try {
        const user = await dataMapper.findUserPerEmail(email);
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
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser((user: Express.User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await dataMapper.findUserPerId(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
