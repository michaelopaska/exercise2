import {PokemonSummary} from './PokemonSummary'
import {PokemonDetail} from './PokemonDetail'

/**
 * This function returns all pokemon, or at least all pokemon that will appear on a specific page.
 * @param pagesize -- number of records we want returned
 * @param pagenum -- which page we are on, starts from 0
 * @param filter -- how we should order the records
 * @returns 
 */
function getAllPokemon(pagesize: number = 50, pagenum: number = 0, filter: string = "id: asc"): PokemonSummary[]{
    let rtnArr: PokemonSummary[] = [];
    
    fetch('https://beta.pokeapi.co/graphql/v1beta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: `
        query samplePokeAPIquery {
            pokemon_v2_pokemon(limit: ${pagesize}, offset: ${(pagenum * pagesize)}, order_by: {${filter}}) {
              name
              id
              pokemon_v2_pokemontypes {
                pokemon_v2_type {
                  name
                }
              }
            }
          }
        `}),
    })
    .then((res) => res.json())
    .then((result) => {
        result.data.pokemon_v2_pokemon.forEach(element => {
            let types: string[] = [];
            element.pokemon_v2_pokemontypes.forEach(type => {
                types.push(type.pokemon_v2_type.name);
            });
            let pm: PokemonSummary = {
                id: element.id,
                name: element.name,
                sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${element.id}`,
                type: types,
            };
            // console.log(pm);
            rtnArr.push(pm);
        });
    });

   
    console.log(rtnArr);
    return rtnArr;
}

function getPokemon(id: number): PokemonDetail{
    let returnPokemon: PokemonDetail = {};
    fetch('https://beta.pokeapi.co/graphql/v1beta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: `
        query samplePokeAPIquery {
            pokemon_v2_pokemon(where: {id: {_eq: ${id}}}) {
              name
              id
              pokemon_v2_pokemonstats {
                base_stat
                pokemon_v2_stat {
                  name
                }
              }
              pokemon_v2_pokemontypes {
                pokemon_v2_type {
                  name
                }
              }
              height
              weight
            }
          }
        `}),
    })
    .then((res) => res.json())
    .then((result) => {
        result.data.pokemon_v2_pokemon.forEach((el) => {
            let types: string[] = [];
            el.pokemon_v2_pokemontypes.forEach(type => {
                types.push(type.pokemon_v2_type.name);
            });
            returnPokemon.name = el.name;
            returnPokemon.id = el.id;
            returnPokemon.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${el.id}`;
            returnPokemon.type = types;
            returnPokemon.height = el.height;
            returnPokemon.weight = el.weight;
            returnPokemon.stats = {};
            el.pokemon_v2_pokemonstats.forEach((stat) => {
                switch(stat.pokemon_v2_stat.name){
                    case 'hp':
                        returnPokemon.stats.hp = stat.base_stat;
                        break;
                    case 'attack':
                        returnPokemon.stats.attack = stat.base_stat;
                        break;
                    case 'special-defense':
                        returnPokemon.stats.specialDefense = stat.base_stat;
                        break;
                    case 'special-attack':
                        returnPokemon.stats.specialAttack = stat.base_stat;
                        break;
                    case 'speed':
                        returnPokemon.stats.speed = stat.base_stat;
                        break;
                }   
            })
            console.log(returnPokemon);
        })
    })
    return returnPokemon;
}


// let testvar = getAllPokemon();

// console.log(testvar);

let testvar = getPokemon(1);
console.log(testvar);