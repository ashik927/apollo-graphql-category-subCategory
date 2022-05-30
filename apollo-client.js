import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://devapiv2.walcart.com/graphql",
    cache: new InMemoryCache(),
});

export default client;