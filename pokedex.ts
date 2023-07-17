import {Pokemon} from './Pokemon.ts'
import { request, gql, GraphQLClient } from 'graphql-request';

const spriteUrlBase = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

const graphQLClient = new GraphQLClient('https://beta.pokeapi.co/graphql/v1beta', {
    headers: {
        // I don't know if it always needs this, just leaving it here blank
    },
});


async function getAllPokemon(pagesize: number = 50, pagenum: number = 1, filter: string = ""): Promise<Pokemon[]>{
    const query = gql`
    {
        pokemon_v2_pokemon(order_by: {name: asc}) {
            name
            id
        }
    }
    `;
    let rtnArr: Pokemon[] = [];
    
    let response = await graphQLClient.request(query);
    
    return rtnArr;
}

async function getPokemon(id: number): Promise<Pokemon>{
    
}


let testvar = getAllPokemon();

testvar.then((value) =>{
    console.log(value);
})
