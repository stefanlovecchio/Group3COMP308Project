const { GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        test: {
            type: GraphQLString,
            resolve() {
                return "This is a placeholder query.";
            }
        }
    }
});
const AuthMutation = new GraphQLObjectType({
    name: 'AuthMutation',
    fields: {
        signup: {
            type: GraphQLString,
            args: {
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                accountType: { type: GraphQLString },
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString }
            },
            async resolve(_, { username, email, password, accountType, firstName, lastName }) {
                try {
                    //validate inputs
                    if (!username || !email || !password || !accountType || !firstName || !lastName) {
                        throw new Error('All fields are required.');
                    }
                    //hash password
                    const hashedPassword = await bcrypt.hash(password, 10);
                    //create & save user
                    const user = new User({ username, email, accountType, firstName, lastName, password: hashedPassword });
                    await user.save();
                    
                    return "User registered successfully!";
                } catch (error) {
                    c
                    throw new Error (`Signup failed: ${error.message}`);
                }
            }
        },
        login: {
            type: GraphQLString,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(_, { email, password }) {
                const user = await User.findOne({ email });
                if (!user) throw new Error("User not found");

                const isValid = await bcrypt.compare(password, user.password);
                if (!isValid) throw new Error("Invalid credentials");

                console.log("JWT_SECRET for signing:", process.env.JWT_SECRET); 
                return jwt.sign({ user: user, userId: user.id, accountType: user.accountType }, process.env.JWT_SECRET, { expiresIn: '1h' });
            }
        },
        logout: {
            type: GraphQLString,
            args: {
                token: { type: GraphQLString } 
            },
            async resolve(_, { token }) {
                if (!token) throw new Error("Token is missing");
        
                try {
                    console.log("Token received:", token); 
        
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    console.log("Decoded token:", decoded); 
        
                    const user = await User.findById(decoded.userId);
                    if (!user) throw new Error("User not found");
        
                    return `${user.username} logged out successfully!`;
                } catch (error) {
                    console.error("Token verification failed:", error.message);
                    throw new Error("Invalid token");
                }
            }
        }               
        
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: AuthMutation
});
