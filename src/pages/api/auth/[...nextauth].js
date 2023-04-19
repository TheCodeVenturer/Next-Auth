import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../../lib/mongodb"
import connectDb from "../../../../lib/mongoose"
import CredentialsProvider from "next-auth/providers/credentials"
import user from "../../../../models/user"
import { compare } from "bcrypt"
export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GitHub_Client_Id,
      clientSecret: process.env.GitHub_Client_Secret,
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials,req){
        const {email,password} = credentials
        await connectDb()
        const foundUser = await user.findOne({email})
        if(foundUser)
        {
          const matched = await compare(password,foundUser.password)
          if(matched)return foundUser
          else return null
        }
        else
          return null
      }
    }),
  ],
  pages:{
    signIn:"/login",
  },
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session:{
    strategy:"jwt",
  },
  jwt:{
    secret:process.env.JWT_SECRET
  },
})