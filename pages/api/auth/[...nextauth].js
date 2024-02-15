import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../util/mongo"
import User from "../../../models/User";
import dbConnect from "../../../util/dbConnect";
import brcypt from "bcryptjs"
dbConnect();

export default NextAuth({
    // adapter: MongoDBAdapter(clientPromise),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,

        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            // login ekranindaki giris yapilan bilgiler tutulur
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              // login 
              const email = credentials.email;
              const password = credentials.password;
              // User modelinin icerisinden findOne ile mail bulunacak
              const user = await User.findOne({ email: email});
              if (!user){
                throw new Error("henüz kayıt olmadın")
              }
              if(user){
                return signInUser({user, password})
              }
        
              
            }
          })
    ],
    pages:{
        signIn:"/auth/login",
    },
    database: process.env.MONGODB_URI,
    secret: "secret",
})

const signInUser = async({ user, password}) => {
  const isMatch = await brcypt.compare(password, user.password)
  if(!isMatch){
    throw new Error("yanlış parola");
  }
  return user;
}