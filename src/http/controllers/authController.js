/** @format */

const User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

function loginController() {
    var locals_login = {
        title: "Login Page",
        active_login: "active",
        description: "this is the homepage",
    };
    var locals_register = {
        title: "Register Page",
        active_register: "active",
        description: "this is the homepage",
    };
    return {
        login(req, res) {
            res.render("auth/login", { locals: locals_login });
        },
        postLogin(req, res, next) {
            const { password, email } = req.body;
            // Validation request
            if (!password || !email) {
                req.flash("error", "All fields required");
                return res.redirect("/login");
            }
            passport.authenticate("local", (err, user, info) => {
                if (err) {
                    req.flash("error", info.message);
                    return next(err);
                }
                if (!user) {
                    req.flash("error", info.message);
                    return res.redirect("/login");
                }
                req.logIn(user, (err) => {
                    if (err) {
                        req.flash("error", info.message);
                        return next(err);
                    }
                    return res.redirect("/");
                });
            })(req, res, next);
        },
        register(req, res) {
            // console.log(req)
            res.render("auth/register", { locals: locals_register });
        },
        async postRegister(req, res, next) {
            const { username, password, email, age } = req.body;
            // Validation request
            if (!username || !password || !email || !age) {
                messages = {
                    name: username,
                    email: email,
                    age: age,
                    message: "All fields required",
                };
                req.flash("info", messages);
                return res.redirect("register");
            }
            // check if email existz
            User.exists({ email: email }, (err, user) => {
                if (user) {
                    messages = {
                        name: username,
                        email: email,
                        age: age,
                        message: "Email already exists",
                    };
                    req.flash("info", messages);
                    return res.redirect("register");
                }
            });

            //Hasing password
            const hashedPassword = await bcrypt.hash(
                password + process.env.passwordSalt,
                10
            );

            // Create User
            const user = new User({
                name: username,
                email,
                password: hashedPassword,
                age,
            });

            user.save()
                .then((user) => {
                    // login
                    passport.authenticate("local", (err, user, info) => {
                        if (err) {
                            req.flash("error", info.message);
                            return next(err);
                        }
                        if (!user) {
                            req.flash("error", info.message);
                            return res.redirect("/register");
                        }
                        req.logIn(user, (err) => {
                            if (err) {
                                req.flash("error", info.message);
                                return next(err);
                            }
                            return res.redirect("/");
                        });
                    })(req, res, next);
                })
                .catch((err) => {
                    messages = { message: "ERROR, somethign went wrong" };
                    req.flash("info", messages);
                    return res.redirect("register");
                });
            // console.log(req.body)
            // res.render('auth/register',{locals:locals_register})
        },
        logout(req, res) {
            req.logout();
            return res.redirect("/login");
        },
    };
}

module.exports = loginController;
